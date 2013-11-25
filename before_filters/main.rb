before do
  @css = ['/lib/bootstrap']
  @js = ['/lib/jquery', '/lib/bootstrap']
  @title = "Heeyyy"
end

before "/oscillate" do
  @title = "Oscillate"
end

before "/put_cube" do
  @css = ['put_cube']
  @js = ['/lib/three', '/put_cube/controls']
  @title = "Put Cube"
end

before "/video" do
  @css << 'video'
  @title = "Video"
end