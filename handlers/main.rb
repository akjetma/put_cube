get "/" do
  erb :index, :layout => :'layouts/main'
end

get "/put_cube" do
  pass if request.websocket?
  erb :put_cube, :layout => :'layouts/put_cube'
end

get "/put_cube" do
  request.websocket do |ws|
    
    ws.onopen do
      settings.sockets << ws
      
      EM.next_tick do
        cubes = Cube.all.collect(&:json)
        cubes.each{ |cube| ws.send(cube) }
      end
    end
    
    ws.onmessage do |msg|
      print msg + "\n"
      Cube.new_from_raw(msg)
      
      EM.next_tick do
        settings.sockets.each{ |s| s.send(msg) }
      end
    end
    
    ws.onclose do
      settings.sockets.delete(ws)
    end

  end
end
