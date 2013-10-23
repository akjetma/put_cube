class Cube
  include MongoMapper::Document
  key :x, Float
  key :y, Float
  key :z, Float
  key :json, String
  timestamps!

  def self.new_from_raw(json)
    cube = Cube.new
    cube.json = json

    coordinates = JSON.parse(json)
    cube.x = coordinates['x']
    cube.y = coordinates['y']
    cube.z = coordinates['z']

    cube.save!
  end
end