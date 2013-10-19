get "/" do
  erb :index, :layout => :'layouts/main'
end

get "/put_cube" do
  erb :put_cube, :layout => :'layouts/put_cube'
end
