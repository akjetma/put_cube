module OscillateHelper
  
  def frequency(key_index)
    ( 2 ** ( ( key_index - 49 ) / 12.0 ) ) * 440
  end

  def key_name(key_index) #key_index
    case ( ( key_index - 1 ) % 12 )
    when 0
      "A" 
    when 1
      "A#"
    when 2
      "B"
    when 3
      "C"
    when 4
      "C#"
    when 5
      "D"
    when 6
      "D#"
    when 7
      "E"
    when 8
      "F"
    when 9
      "F#"
    when 10
      "G"
    when 11
      "G#"
    end
  end

  def key_color(key_index)
    [0, 2, 3, 5, 7, 8, 10].include?( ( key_index - 1 ) % 12) ? "btn-default" : "btn-primary"
  end

end