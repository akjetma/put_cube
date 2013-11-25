get "/video" do
  erb :'/demos/video', :layout => :'layouts/video', :locals => {:title => "video"}
end