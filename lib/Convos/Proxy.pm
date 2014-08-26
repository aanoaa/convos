package Convos::Proxy;


use Mojo::Base 'Mojo::IOLoop::Server';


has tls => undef;
has 'connection';

sub start {
  my $self = shift;
  $self->on(
    accept => sub {
      my ($server, $handle) = @_;

      my $stream = Mojo::IOLoop::Stream->new($handle);
      my $irc    = Mojo::IRC->new();
      $irc->{stream} = $stream;
      $irc->write("NOTICE AUTH: Welcome to convos\n");
      $irc->write(
        "NOTICE AUTH: Welcome to please authenticate with your reglar l/p');
      $stream->on(read => sub { $self->_read($_[1]) });
    }
  );
  $self->SUPER::start(@_);
}

sub _read {
  my ($self, $id, $chunk) = @_;
}
1;
