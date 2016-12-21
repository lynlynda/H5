var H5 = function() {
  this.id = ('h5_' + Math.random()).replace('.', '_');
  this.page = [];
  this.el = $('<div class= "h5" id="' + this.id + '"></div>').hide();
  $('body').append(this.el)


  this.addPage = function(name, text) {
    var page = $('<div class="h5_page section"></div>')
    if (name != undefined) {
      page.addClass('h5_page_' + name)
    }
    if (text != undefined) {
      page.text(text)
    }
    this.el.append(page)
    this.page.push(page)
    this.whenAddPage()
    return this
  }

  this.addComponent = function(name, cfg) {
    var cfg = cfg || {};
    cfg = $.extend({
      type: 'base'
    }, cfg);
    var component; //存储组建元素
    var page = this.page.slice(-1)[0]
    switch (cfg.type) {
      case 'base':
        component = new H5ComponentBase(name, cfg);
        break;
      case 'polyline':
        component = new H5ComponentPolyline(name, cfg);
        break;
      case 'radar':
        component = new H5ComponentRadar(name, cfg);
        break;
      case 'pie':
        component = new H5ComponentPie(name, cfg);
        break;
      case 'ring':
        component = new H5ComponentRing(name, cfg);
        break;
      case 'bar':
        component = new H5ComponentBar(name, cfg);
        break;
      case 'bar_v':
        component = new H5ComponentBar_v(name, cfg);
        break;
      case 'point':
        component = new H5ComponentPoint(name, cfg);
        break;


      default:
    }
    page.append(component)
    return this

  }
  this.whenAddPage = function() {
    this.addComponent('slide_up', {
      bg: '../zujian/imgs/footer.png',
      css: {
        opacity: 0,
        left: 0,
        bottom: 0,
        width: '100%',
        height: '20px',
        zIndex: 999,
      },
      animateIn: {
        opacity: 1,
        bottom: 0
      },
      animateOut: {
        opacity: 0,
        bottom: '-20px'
      },
      delay: 1000
    })
  }

  this.loader = function(toPage) {
    this.el.fullpage({
      onLeave: function(index, nextIndex, direction) {
        $(this).find('.h5_component').trigger('onLeave')
      },
      afterLoad: function(anchorLink, index) {
        $(this).find('.h5_component').trigger('onLoad')

      }
    });
    this.page[0].find('.h5_component').trigger('onLoad')
    this.el.show();
    if (toPage) {
      $.fn.fullpage.moveTo(toPage)
    }
  }
  this.loader = typeof H5_loading == 'function' ? H5_loading : this.loader
  return this
}