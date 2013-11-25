before do
  @css = ['/lib/bootstrap']
  @js = ['/lib/jquery', '/lib/bootstrap']
  @title = "Heeyyy"
end

before "/oscillate" do
  @title = "Oscillate"
end

before "/video" do
  @title = "Video"
end

before "/put_cube" do
  @js << '/lib/three'
  @js << '/put_cube/controls'
  @title = "Put Cube"
end