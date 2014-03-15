before do
  @css = ['main']
  @js = ['lib/jquery']
end

before "/canvas" do
  @title = "Canvas"
end

before "/oscillate" do
  @title = "Oscillate"
end

before "/put_cube" do
  @js << 'lib/three_r60'
  @js << 'put_cube/controls'
  @title = "Put Cube"
end

before "/video" do
  @title = "Video"
end