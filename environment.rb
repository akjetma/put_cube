require 'json'
require 'rest-client'
require 'sinatra'
require 'sinatra-websocket'
require 'mongo_mapper'

Dir["#{ File.dirname(__FILE__) }/handlers/*.rb"].each { |file| require file }
Dir["#{ File.dirname(__FILE__) }/helpers/*.rb"].each { |file| require file }
Dir["#{ File.dirname(__FILE__) }/models/*.rb"].each { |file| require file }

configure :production do
  MongoMapper.setup({ 'production' => { 'uri' => ENV['MONGOHQ_URL'] } }, 'production')
end

configure :development do 
  MongoMapper.connection = Mongo::MongoClient.new("localhost", 27017, :pool_size => 25, :pool_timeout => 60)
  MongoMapper.database = 'cubes'
end  

set :server, 'thin'
set :sockets, []

helpers LayoutHelper, OscillateHelper
