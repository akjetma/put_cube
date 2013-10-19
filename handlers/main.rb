get "/" do
  erb :index, :layout => :'layouts/main'
end

get "/put_cube" do
  erb :put_cube, :layout => :'layouts/put_cube'
end

get "/websocket" do
  
  request.websocket do |ws|
    
    ws.onopen do
      settings.sockets << ws
    end

    ws.onmessage do |msg|
      p msg
      EM.next_tick do
        settings.sockets.each{ |s| s.send(msg) }
      end
    end

    ws.onclose do
      settings.sockets.delete(ws)
    end
  end
end

get "/denied" do
  erb :'elements/header', :layout => :'layouts/main', :locals => { :text => "UGLY. GORILLAS. UGLY. GO. AWAY." }
end