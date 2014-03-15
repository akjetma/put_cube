module OscillateHelper
  def frequency(key_index)
    (2 ** ((key_index - 49) / 12.0)) * 440
  end

  def key_name(key_index)
    %w(A A# B C C# D D# E F F# G G#)[(key_index - 1) % 12]
  end

  def key_color(key_index)
    [0, 2, 3, 5, 7, 8, 10].include?((key_index - 1) % 12) ? "btn-default" : "btn-primary"
  end
end