window.onload = function() {
  var page1 = document.getElementById("page1");
  var page2 = document.getElementById("page2");
  var page3 = document.getElementById("page3");


  var music = document.getElementById('music');
  var audio = document.getElementsByTagName('audio')[0];

  //音乐停止的时候唱片停止转
  audio.addEventListener("ended", function(event) {
    this.className = ''

  }, false)

  // music.onclick = function() {
  //   if (audio.paused) {
  //     audio.play();
  //     this.className = 'play'
  //       // this.style.animationPlayState = 'running'  //不兼容安卓和苹果6以下
  //   } else {
  //     audio.pause();
  //     this.className = ''
  //       // this.style.animationPlayState = 'paused'
  //   }


  // }

  music.addEventListener('touchstart', function() {
    if (audio.paused) {
      audio.play();
      this.className = 'play'
        // this.style.animationPlayState = 'running'  //不兼容安卓和苹果6以下
    } else {
      audio.pause();
      this.className = ''
        // this.style.animationPlayState = 'paused'
    }

  }, false);

  page1.addEventListener('touchstart', function() {
    page1.style.display = 'none';
    page2.style.display = 'block';
    page3.style.display = 'block';
    page3.style.top = '100%';


    setTimeout(function() {
      page2.setAttribute('class', 'page fadeOut');
      page3.setAttribute('class', 'page fadeIn');

    }, 5500)
  })
}