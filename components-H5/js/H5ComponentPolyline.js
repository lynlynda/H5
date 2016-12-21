var H5ComponentPolyline = function(name, cfg) {

  var component = new H5ComponentBase(name, cfg);

  //绘制网格线
  var w = cfg.width;
  var h = cfg.height;
  var canvas = document.createElement('canvas')
  var context = canvas.getContext('2d')
  canvas.width = context.width = w
  canvas.height = context.height = h
  component.append(canvas)
    //水平网格线
  var step = 10
  context.beginPath();
  context.lineWidth = 1;
  context.strokeStyle = "#AAA";
  for (var i = 0; i < step + 1; i++) {
    var y = (h / step) * i
    context.moveTo(0, y)
    context.lineTo(w, y)

  }
  //垂直网格
  step = cfg.data.length + 1
  var text_w = w / step >> 0
  for (var i = 0; i < step + 1; i++) {
    var x = (w / step) * i
    context.moveTo(x, 0)
    context.lineTo(x, h)

    //项目名称
    if (cfg.data[i]) {
      var text = $('<div class="text"></div>')
      text.text(cfg.data[i][0])
      text.width(text_w / 2).css('left', x / 2 + text_w / 4)
      component.append(text)

    }

  }
  context.stroke()

  //另起一个画布
  var canvas = document.createElement('canvas')
  var context = canvas.getContext('2d')
  canvas.width = context.width = w
  canvas.height = context.height = h
  component.append(canvas)



  var draw = function(per) {
    context.clearRect(0, 0, w, h)
      //绘制折线

    context.beginPath();
    context.lineWidth = 3;
    context.strokeStyle = "pink";
    var x = 0;
    var y = 0;
    //小圆点
    var step = cfg.data.length + 1
    var row_width = w / (cfg.data.length + 1)
    for (var i = 0; i < cfg.data.length; i++) {
      var item = cfg.data[i]
      x = row_width * (i + 1)
      y = h - (item[1] * h * per)
      context.moveTo(x, y)
      context.arc(x, y, 5, 0, 2 * Math.PI)


    }
    //连线
    context.moveTo(row_width, h - (cfg.data[0][1] * h * per))
    for (var i = 0; i < cfg.data.length; i++) {
      var item = cfg.data[i]
      x = row_width * (i + 1)
      y = h - (item[1] * h * per)
      context.lineTo(x, y)

    }
    context.stroke()
      //阴影
    context.lineTo(x, h)
    context.lineTo(row_width, h)
    context.fillStyle = 'rgba(255,118,118,0.2)';
    context.fill()
      //百分数
    for (var i = 0; i < cfg.data.length; i++) {
      var item = cfg.data[i]
      x = row_width * (i + 1)
      y = h - (item[1] * h * per)
      context.fillStyle = item[2] ? item[2] : '#595959'
      context.fillText(((item[1] * 100) >> 0) + '%', x - 10, y - 12)


    }



  }

  component.on('onLoad', function() {
    var s = 0;
    for (var i = 0; i < 100; i++) {
      setTimeout(function() {
        s += 0.01;
        draw(s);
      }, i * 10 + 500)
    }


  });
  component.on('onLeave', function() {
    var s = 1;
    for (var i = 0; i < 100; i++) {
      setTimeout(function() {
        s -= 0.01;
        draw(s);
      }, i * 10)
    }


  });
  return component
}