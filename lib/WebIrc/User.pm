package WebIrc::User;

=head1 NAME

WebIrc::User - Mojolicious controller for user data

=cut

use Mojo::Base 'WebIrc::Client';
use WebIrc::Core::Util qw/ as_id /;
use constant DEBUG => $ENV{WIRC_DEBUG} ? 1 : 0;

=head1 METHODS

=head2 auth

Check authentication and login

=cut

sub auth {
  my $self = shift;
  return 1 if $self->session('login');
  $self->redirect_to('/');
  return 0;
}

=head2 login_or_register

Will either call L</login> or L</register> based on form input.

=cut

sub login_or_register {
  my $self = shift;

  $self->stash(template => 'index', form => '');

  if($self->req->method eq 'POST') {
    if(defined $self->param('email') or $self->stash('register_page')) {
      $self->stash(form => 'register');
      $self->register;
    }
    else {
      $self->stash(form => 'login');
      $self->login;
    }
  }
}

=head2 login

Authenticate local user

=cut

sub login {
  my $self = shift->render_later;
  my $login = $self->param('login');

  $self->app->core->login(
    {
      login => $login,
      password => scalar $self->param('password'),
    },
    sub {
      my ($core, $error) = @_;

      if($error) {
        $self->render(message => 'Invalid username/password.', status => 401);
        return;
      }

      $self->session(login => $login);

      # this is super ugly
      require WebIrc::Client;
      bless $self, 'WebIrc::Client';
      $self->route;
    },
  );
}

=head2 register

See L</login>.

=cut

sub register {
  my $self = shift->render_later;
  my $wanted_login = $self->param('login');
  my $admin = 0;

  if ($self->session('login')) {
    $self->logf(debug => '[reg] Already logged in') if DEBUG;
    $self->redirect_to('view');
    return;
  }

  Mojo::IOLoop->delay(
    sub {
      my $delay = shift;
      $self->redis->sismember('users', $wanted_login, $delay->begin);
      $self->redis->scard('users', $delay->begin);
    },
    sub {    # Check invitation unless first user, or make admin.
      my ($delay, $exists, $secret_required) = @_;
      my $digest;

      $admin = $secret_required ? 0 : 1;

      if($exists) {
        $self->stash->{errors}{login} = "Username ($wanted_login) is taken.";
        $self->logf(debug => '[reg] Failed %s', $self->stash('errors')) if DEBUG;
        $self->render(status => 400);
        return;
      }
      if($self->_got_invalid_register_params($secret_required)) {
        $self->logf(debug => '[reg] Failed %s', $self->stash('errors')) if DEBUG;
        $self->render(status => 400);
        return;
      }

      $digest = $self->_digest($self->param('password'));

      $self->logf(debug => '[reg] New user login=%s', $wanted_login) if DEBUG;
      $self->session(login => $wanted_login);
      $self->redis->hmset("user:$wanted_login", digest => $digest, email => scalar $self->param('email'), $delay->begin);
      $self->redis->sadd('users', $wanted_login, $delay->begin);
    },
    sub {
      my ($delay, @saved) = @_;
      $self->redirect_to('settings');
    }
  );
}

sub _digest {
    crypt $_[1], join '', ('.', '/', 0 .. 9, 'A' .. 'Z', 'a' .. 'z')[rand 64, rand 64];
}

sub _got_invalid_register_params {
  my ($self, $secret_required) = @_;
  my $errors    = $self->stash('errors');
  my $email     = $self->param('email') || '';
  my @passwords = $self->param('password');

  if ($secret_required) {
    my $secret = $self->param('invite') || 'some-weird-secret-which-should-never-be-generated';
    $self->logf(debug => '[reg] Validating invite code %s', $secret) if DEBUG;
    if ($secret ne crypt($email . $self->app->secret, $secret) && $secret ne 'OPEN SESAME') {
      $self->logf(debug => '[reg] Invalid invite code.') if DEBUG;
      $errors->{invite} = 'You need a valid invite code to register.';
    }
  }

  if (($self->param('login') || '') !~ m/^[\w]{3,15}$/) {
    $errors->{login} = 'Username must consist of letters and numbers and be 3-15 characters long';
  }
  if (!$self->param('email') || $self->param('email') !~ m/.\@./) {
    $errors->{email} = 'Invalid email.';
  }

  if ((grep {$_} @passwords) != 2 or $passwords[0] ne $passwords[1]) {
    $errors->{password} = 'You need to enter the same password twice.';
  }
  elsif (length($passwords[0]) < 6) {
    $errors->{password} = 'The password must be at least 6 characters long';
  }

  return keys %$errors;
}

=head2 logout

Will delete data from session.

=cut

sub logout {
  my $self = shift;
  $self->session(login => undef);
  $self->redirect_to('/');
}

=head2 settings

Used to retrieve connection information.

=cut

sub settings {
  my $self = shift->render_later;
  my $hostname = WebIrc::Core::Util::hostname();
  my $login = $self->session('login');
  my $host = $self->stash('host') || 0;
  my $with_layout = $self->req->is_xhr ? 0 : 1;
  my @conversation;

  $self->stash(
    host => $host,
    body_class => 'settings',
    conversation => \@conversation,
    nick => $login,
    target => 'settings',
  );

  Mojo::IOLoop->delay(
    sub {
      my($delay) = @_;
      $self->redis->smembers("user:$login:connections", $_[0]->begin);
    },
    sub {
      my($delay, $hosts) = @_;
      my $cb = $delay->begin;

      return $self->$cb() unless @$hosts;
      return $self->redis->execute(
        (map { [hgetall => "user:$login:connection:$_"] } @$hosts),
        $cb,
      );
    },
    sub {
      my($delay, @connections) = @_;

      $self->logf(debug => '[settings] connection data %s', \@connections) if DEBUG;

      for my $conn (@connections) {
        $conn->{event} = 'connection';
        $conn->{lookup} = $conn->{host};
        $conn->{channels} = [ split ' ', $conn->{channels} ];
        push @conversation, $conn;
      }

      if(@conversation) {
        $self->redis->hgetall("user:$login", $delay->begin);
        $self->redis->get("avatar:$login\@$hostname", $delay->begin);
      }
      else {
        push @conversation, { event => 'welcome' };
      }

      push @conversation, $self->app->config('default_connection');
      $conversation[-1]{event} = 'connection';
      $conversation[-1]{lookup} = '';
      $delay->begin->();
    },
    sub {
      my($delay, $user, $avatar) = @_;

      if($with_layout) {
        $self->conversation_list($delay->begin);
        $self->notification_list($delay->begin);
      }

      if($user) {
        unshift @conversation, {
          event => 'user',
          avatar => $avatar,
          email => $user->{email},
          login => $login,
          hostname => $hostname,
        };
      }

      $delay->begin->();
    },
    sub {
      my($delay, @res) = @_;

      return $self->render('client/view') if $with_layout;
      return $self->render('client/conversation', layout => undef);
    },
  );
}

=head2 add_connection

Add a new connection.

=cut

sub add_connection {
  my $self = shift->render_later;
  my $login = $self->session('login');

  Mojo::IOLoop->delay(
    sub {
      my($delay) = @_;
      $self->app->core->add_connection(
        $self->session('login'),
        {
          host     => $self->param('host') || '',
          nick     => $self->param('nick') || '',
          channels => join(' ', $self->param('channels')),
          user     => $login,
        },
        $delay->begin,
      );
    },
    sub {
      my ($delay, $errors, $conn) = @_;
      $self->stash(errors => $errors) if $errors;
      return $self->settings if $errors;
      return $self->redirect_to('settings');
    },
  );
}

=head2 edit_connection

Change a connection.

=cut

sub edit_connection {
  my $self = shift->render_later;

  Mojo::IOLoop->delay(
    sub {
      my ($delay) = @_;
      $self->app->core->update_connection(
        $self->session('login'),
        {
          host     => $self->req->body_params->param('host') || '',
          lookup   => $self->stash('host') || '',
          nick     => $self->param('nick') || '',
          channels => join(' ', $self->param('channels')),
          user     => $self->session('login'),
        },
        $delay->begin,
      );
    },
    sub {
      my($delay, $errors, $changed) = @_;
      $self->stash(errors => $errors) if $errors;
      return $self->settings if $errors;
      return $self->redirect_to('settings');
    }
  );
}

=head2 delete_connection

Delete a connection.

=cut

sub delete_connection {
  my $self = shift->render_later;
  my $login  = $self->session('login');

  Mojo::IOLoop->delay(
    sub {
      my ($delay) = @_;
      $self->app->core->delete_connection($login, $self->stash('host'), $delay->begin);
    },
    sub {
      my ($delay, $error) = @_;
      return $self->render_not_found if $error;
      return $self->redirect_to('settings');
    }
  );
}

=head2 edit_user

Change user profile.

=cut

sub edit_user {
  my $self = shift->render_later;
  my $login = $self->session('login');
  my $hostname = WebIrc::Core::Util::hostname();
  my $avatar = $self->param('avatar');
  my %settings;

  $settings{email} = $self->param('email') if defined $self->param('email');

  Mojo::IOLoop->delay(
    sub {
      my $delay = shift;
      $self->redis->hmset("user:$login", %settings, $delay->begin);
      $self->redis->set("avatar:$login\@$hostname", $avatar, $delay->begin) if defined $avatar;
      $delay->begin->();
    },
    sub {
      my($delay, @saved) = @_;
      return $self->render(json => {}) if $self->req->is_xhr;
      return $self->redirect_to('settings');
    }
  );
}

=head1 COPYRIGHT

See L<WebIrc>.

=head1 AUTHOR

Jan Henning Thorsen

Marcus Ramberg

=cut

1;
