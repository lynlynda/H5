var H5ComponentPie = function(name, cfg) {

  var component = new H5ComponentBase(name, cfg);


  var w = cfg.width;
  var h = cfg.height;
  var canvas = document.createElement('canvas')
  var context = canvas.getContext('2d')
  canvas.width = context.width = w
  canvas.height = context.height = h
  $(canvas).css('z-index', 1)
  component.append(canvas)
    //底盘
  var r = w / 2
  context.beginPath()
  context.fillStyle = '#eee'
  context.strokeStyle = '#eee'
  context.lineWidth = 1
  context.arc(r, r, r, 0, 2 * Math.PI)
  context.fill()
  context.stroke()



  // 数据层
  var colors = ['red', 'orange', 'maroon', 'pink', 'gray']
  var sAngle = 1.5 * Math.PI
  var eAngle = 0;
  var aAngle = Math.PI * 2

  var canvas = document.createElement('canvas')
  var context = canvas.getContext('2d')
  canvas.width = context.width = w
  canvas.height = context.height = h
  $(canvas).css('z-index', 2)
  component.append(canvas)


  var step = cfg.data.length
  for (var i = 0; i < step; i++) {
    var item = cfg.data[i]
    var color = item[2] || (item[2] = colors.pop())
    eAngle = sAngle + aAngle * item[1]
    context.beginPath()
    context.fillStyle = color
    context.strokeStyle = color
    context.lineWidth = 1
    context.moveTo(r, r)
    context.arc(r, r, r, sAngle, eAngle)
    context.fill()
    context.stroke()
    sAngle = eAngle

    //加入项目文本和百分比
    var text = $('<div class="text"></div>')
    text.text(cfg.data[i][0])
    var per = $('<div class="per"></div>')
    per.text(cfg.data[i][1] * 100 + '%')
    text.append(per)
    var x = r + Math.sin(.5 * Math.PI - sAngle) * r
    var y = r + Math.cos(.5 * Math.PI - sAngle) * r
      // text.css('left', 300)
      // text.css('top', 600)
      // console.log(x + '====' + w)
    if (x > w / 2) {
      text.css('left', x / 2)
    } else {
      text.css('right', (w - x) / 2)
    }
    if (y > h / 2) {
      text.css('top', y / 2)

    } else {
      text.css('bottom', (h - y) / 2)
    }
    if (cfg.data[i][2]) {
      text.css('color', cfg.data[i][2])

    }
    text.css('opacity', 0)
    component.append(text)
  }
  //蒙版层

  var canvas = document.createElement('canvas')
  var context = canvas.getContext('2d')
  canvas.width = context.width = w
  canvas.height = context.height = h
  $(canvas).css('z-index', 3)
  component.append(canvas)
  context.fillStyle = '#eee'
  context.strokeStyle = '#eee'
  context.lineWidth = 1



  var draw = function(per) {
      context.clearRect(0, 0, w, h)


      context.beginPath()
      context.moveTo(r, r)
      if (per <= 0) {
        context.arc(r, r, r, 0, 2 * Math.PI)
        component.find('.text').css('opacity', 0)

      } else {
        context.arc(r, r, r, sAngle, sAngle + 2 * Math.PI * per, true)

      }
      context.fill()
      context.stroke()
      if (per >= 1) {
        component.find('.text').css('opacity', 1)
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