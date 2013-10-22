class Orchestrate
  @base_url = "https://#{ ENV['ORCHESTRATE_API_KEY'] }@api.orchestrate.io/v0"
 
# -----key/value-----
  def self.put(collection, key, value={})
    url = "#{ @base_url }/#{ collection }/#{ key }"
    response = RestClient.put(url, value.to_json, :content_type => 'application/json')
  end
 
  def self.get(collection, key)
    url = "#{ @base_url }/#{ collection }/#{ key }"
    response = RestClient.get(url, :accept => 'application/json')
    return JSON.parse(response)
  end
 
# -----search-----
  def self.search(collection, query)
    url = "#{ @base_url }/#{ collection }/?query=#{ query }"
    response = RestClient.get(url, :accept => 'application/json')
    return JSON.parse(response)
  end
 
# -----graph-----
  def self.new_relation(src_collection, src_key, relation, tgt_collection, tgt_key)
    url = "#{ @base_url }/#{ src_collection }/#{ src_key }/relation/#{ relation }/#{ tgt_collection }/#{ tgt_key }"
    response = RestClient.put(url, nil.to_json, :content_type => 'application/json')
  end
 
  def self.get_relation(collection, key, *relations)
    traversal = relations.join("/")
    url = "#{ @base_url }/#{ collection }/#{ key }/relations/#{ traversal }"
    response = RestClient.get(url, :accept => 'application/json')
    return JSON.parse(response)
  end
 
# -----events-----
  def self.new_event(collection, key, type, data, timestamp=nil)
    url = "#{ @base_url }/#{ collection }/#{ key }/events/#{ type }?timestamp=#{ time_stamp }"
    response = RestClient.put(url, value.to_json, :content_type => 'application/json')
  end
 
  def self.get_events(collection, key, type, t_start=nil, t_end=nil)
    url = "#{ @base_url }/#{ collection }/#{ key }/events/#{ type }?start=#{ t_start }&end=#{ t_end }"
    response = RestClient.get(url, :accept => 'application/json')
    return JSON.parse(response)
  end
 
end