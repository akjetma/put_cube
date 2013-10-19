before "/websocket" do
  if !request.websocket?
    redirect "/denied"
  end
end 