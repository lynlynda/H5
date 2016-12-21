var H5ComponentRadar = function(name, cfg) {

  var component = new H5ComponentBase(name, cfg);


  var w = cfg.width;
  var h = cfg.height;
  var canvas = document.createElement('canvas')
  var context = canvas.getContext('2d')
  canvas.width = context.width = w
  canvas.height = context.height = h
  component.append(canvas)

  var r = w / 2
  var step = cfg.data.length

  //网格线
  var isBlue = false
  for (var s = 10; s > 0; s--) {
    context.beginPath()
    for (var i = 0; i < step; i++) {
      var rad = (2 * Math.PI / 360) * (360 / step) * i
      var x = r + Math.sin(rad) * r * (s / 10)
      var y = r + Math.cos(rad) * r * (s / 10)

      context.lineTo(x, y)

    }
    context.closePath()
    context.fillStyle = (isBlue = !isBlue) ? "#99c0ff" : "#f1f9ff"
    context.fill()
  }



  //伞骨
  for (var i = 0; i < step; i++) {
    var rad = (2 * Math.PI / 360) * (360 / step) * i
    var x = r + Math.sin(rad) * r
    var y = r + Math.cos(rad) * r

    context.moveTo(r, r)
    context.lineTo(x, y)

    var text = $('<div class="text"></div>')
    text.text(cfg.data[i][0])
    text.css('transition', 'all 1s ' + i * .5 + 's')
    component.append(text)

    if (x > w / 2) {
      text.css('left', x / 2 + 5)

    } else {
      text.css('right', (w - x) / 2 + 5)

    }
    if (y > h / 2) {
      text.css('top', y / 2 + 5)

    } else {
      text.css('bottom', (h - y) / 2 + 5)

    }
    if (cfg.data[i][2]) {
      text.css('color', cfg.data[i][2])
    }
    text.css('opacity', 0)
      // context.fillStyle = '#000'
      // context.fillText(cfg.data[i][0], x - 20, y + 10)



  }
  context.strokeStyle = '#e0e0e0'
  context.stroke()



  //另起一个画布
  var canvas = document.createElement('canvas')
  var context = canvas.getContext('2d')
  canvas.width = context.width = w
  canvas.height = context.height = h
  component.append(canvas)



  var draw = function(per) {
      if (per >= 1) {
        component.find('.text').css('opacity', 1) //入场动画
      }
      if (per <= 1) {
        component.find('.text').css('opacity', 0) //退场动画
      }
      context.clearRect(0, 0, w, h)
        // context.beginPath()
        //折线
      for (var i = 0; i < step; i++) {
        var rate = cfg.data[i][1] * per
        var rad = (2 * Math.PI / 360) * (360 / step) * i
        var x = r + Math.sin(rad) * r * rate
        var y = r + Math.cos(rad) * r * rate

        context.lineTo(x, y)
          // context.arc(x, y, 5, 0, 2 * Math.PI)
      }
      context.closePath()
      context.strokeStyle = "#f00"
      context.stroke()
        // context.fillStyle = '#0f0'
        // context.fill()

      //点点
      for (var i = 0; i < step; i++) {
        var rate = cfg.data[i][1] * per
        var rad = (2 * Math.PI / 360) * (360 / step) * i
        var x = r + Math.sin(rad) * r * rate
        var y = r + Math.cos(rad) * r * rate
        context.beginPath()
        context.arc(x, y, 5, 0, 2 * Math.PI)
        context.fillStyle = '#ff7676'
        context.fill()
        context.closePath()
      }



    }
    // draw(0.5)

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