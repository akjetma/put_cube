get "/" do
  erb :index, :layout => :'layouts/main'
end

get "/put_cube" do
  pass unless request.websocket?
    
  request.websocket do |ws|
    ws.onopen do
      settings.sockets << ws
      EM.next_tick do
        settings.cubes.each{ |cube| ws.send(cube) }
      end
    end
    
    ws.onmessage do |msg|
      print msg + "\n"
      store_cube(msg)
      EM.next_tick do
        settings.sockets.each{ |s| s.send(msg) }
      end
    end
    
    ws.onclose do
      settings.sockets.delete(ws)
    end
  end

end

get "/put_cube" do
  erb :put_cube, :layout => :'layouts/put_cube'
end