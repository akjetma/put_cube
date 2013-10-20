require 'sinatra'
require 'sinatra-websocket'

Dir["#{ File.dirname(__FILE__) }/filters/*.rb"].each { |file| require file }
Dir["#{ File.dirname(__FILE__) }/handlers/*.rb"].each { |file| require file }
Dir["#{ File.dirname(__FILE__) }/helpers/*.rb"].each { |file| require file }

configure :production do
  require 'newrelic_rpm'
end

set :server, 'thin'
set :sockets, []

helpers MainHelper
