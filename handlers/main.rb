get "/" do
  erb :index, :layout => :'layouts/main', :locals => { :title => "Heeyyyyy" }
end