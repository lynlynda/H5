var H5_loading = function(images, toPage) {
  var id = this.id
  if (this._iamges === undefined) {
    this._iamges = (images || []).length;
    this._loaded = 0
    window[id] = this
    for (s in images) {
      var item = images[s]
      var img = new Image
      img.src = item
      img.onload = function() {
        window[id].loader()

      }

    }

    $('#rate').text('0%')
    return this

  } else {
    this._loaded++
      $('#rate').text(((this._loaded / this._iamges * 100) >> 0) + '%')
    if (this._loaded < this._iamges) {
      return this
    }


  }


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