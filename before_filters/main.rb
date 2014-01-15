before do
  @css = ['lib/bootstrap']
  @js = ['lib/jquery', 'lib/bootstrap']
end

before "/canvas" do
  @title = "Canvas"
end

before "/oscillate" do
  @title = "Oscillate"
end

before "/put_cube" do
  @js << 'lib/three'
  @js << 'put_cube/controls'
  @title = "Put Cube"
end

before "/video" do
  @title = "Video"
end