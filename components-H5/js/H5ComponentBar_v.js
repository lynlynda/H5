var H5ComponentBar_v = function(name, cfg) {

  var component = new H5ComponentBase(name, cfg);

  $.each(cfg.data, function(index, item) {
    var line = $('<div class="line ">')
    var name = $('<div class="name line_v">')
    var bgcss = '';
    if (item[2]) {
      bgcss = 'style="background-color:' + item[2] + '"';
    }

    var rate = $('<div class="rate line_v"><div class="bg " ' + bgcss + '></div></div>')
    var per = $('<div class="per line_v">')
    var width = item[1] * 100 + '%';
    // line.height(item[1] * 400)
    rate.height(item[1] * 200)
      //rate.find('.bg').css('height', '100%')
    per.text(width)
    name.text(item[0])
    line.append(name).append(rate).append(per);
    component.append(line)


  })

  return component
}