module CubeHelper
  def store_cube(msg)
    settings.cubes << msg
    settings.cubes = settings.cubes.last(50)
  end
end