require 'sinatra'

Dir["#{ File.dirname(__FILE__) }/handlers/*.rb"].each { |file| require file }
Dir["#{ File.dirname(__FILE__) }/helpers/*.rb"].each { |file| require file }

set :erb, :layout => :'layouts/main'
helpers MainHelper
