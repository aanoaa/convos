use Test::More;
use Test::Mojo;
use Mojo::IRC;
use Convos::Core::Connection;

use_ok Convos::Proxy;
my $proxy = Convos::Proxy->new();
isa_ok($proxy, 'Mojo::IOLoop::Server', 'Is a IOLoop::Server');
my $port = Convos::Proxy->generate_port;
$proxy->listen(port => $port);

proxy->start;

done_testing;

1;
