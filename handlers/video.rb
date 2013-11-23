get "/video" do
  erb :'/demos/video', :layout => :'layouts/main', :locals => {:title => "video"}
end