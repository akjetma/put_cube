require 'json'
require 'rest-client'
require 'sinatra'
require 'sinatra-websocket'


Dir["#{ File.dirname(__FILE__) }/handlers/*.rb"].each { |file| require file }
Dir["#{ File.dirname(__FILE__) }/helpers/*.rb"].each { |file| require file }
Dir["#{ File.dirname(__FILE__) }/lib/*.rb"].each { |file| require file }

set :server, 'thin'
set :sockets, []
set :cubes, []

helpers MainHelper, CubeHelper
