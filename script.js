var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 500;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum //% this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+ this.txt+'</span>';

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt && this.loopNum !== (this.toRotate.length-1)) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt == 'Abh') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 10;
  } else if (this.isDeleting && this.txt == 'Abhishek Ku') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  if (this.loopNum !== this.toRotate.length) {
    setTimeout(function() {
      that.tick();
    }, delta);
  }
};

function cursorAnimation() {
    $('#cursor').animate({
        opacity: 0
    }, 'fast', 'swing').animate({
        opacity: 1
    }, 'fast', 'swing');
}

window.onload = function() {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i=0; i<elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  // var css = document.createElement("style");
  // css.type = "text/css";
  // css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
  // css.setAttribute("id", "cursor");
  // document.body.appendChild(css);

  setInterval ('cursorAnimation()', 600);
};
