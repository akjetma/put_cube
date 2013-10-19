module MainHelper
  def include_css(*names)
    names.collect { |name| "<link href='/css/#{ name }.css' rel='stylesheet' type='text/css'>" }.join("\n")
  end

  def include_js(*names)
    names.collect { |name| "<script src='/js/#{ name }.js'></script>" }.join("\n")
  end
end
