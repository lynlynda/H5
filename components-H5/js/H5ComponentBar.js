var H5ComponentBar = function(name, cfg) {

  var component = new H5ComponentBase(name, cfg);

  $.each(cfg.data, function(index, item) {
    var line = $('<div class="line">')
    var name = $('<div class="name">')
    var bgcss = '';
    if (item[2]) {
      bgcss = 'style="background-color:' + item[2] + '"';
    }
    var rate = $('<div class="rate"><div class="bg "' + bgcss + '></div></div>')
    var per = $('<div class="per">')
    var width = item[1] * 100 + '%';

    rate.width(width)
    per.text(width)
    name.text(item[0])
    line.append(name).append(rate).append(per);
    component.append(line)


  })

  return component
}