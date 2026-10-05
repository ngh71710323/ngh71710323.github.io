(function () {
  var root = document.documentElement;
  function setLang(l) {
    root.setAttribute('data-lang', l);
    root.setAttribute('lang', l === 'en' ? 'en' : 'ko');
    try { localStorage.setItem('lang', l); } catch (e) {}
    var bs = document.querySelectorAll('[data-set-lang]');
    for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('on', bs[i].getAttribute('data-set-lang') === l);
  }
  var lbs = document.querySelectorAll('[data-set-lang]');
  for (var i = 0; i < lbs.length; i++) lbs[i].addEventListener('click', function () { setLang(this.getAttribute('data-set-lang')); });
  setLang(root.getAttribute('data-lang') === 'en' ? 'en' : 'ko');

  var mb = document.querySelector('.menu-btn');
  if (mb) {
    mb.addEventListener('click', function () { var o = document.body.classList.toggle('menu-open'); mb.setAttribute('aria-expanded', o ? 'true' : 'false'); });
    var navLinks = document.querySelectorAll('.nav a');
    for (var j = 0; j < navLinks.length; j++) navLinks[j].addEventListener('click', function () { document.body.classList.remove('menu-open'); mb.setAttribute('aria-expanded', 'false'); });
  }

  var v = document.querySelector('.viewer');
  if (v) {
    var img = v.querySelector('.v-img');
    var thumbs = Array.prototype.slice.call(document.querySelectorAll('.v-thumbs button'));
    var cnt = document.querySelector('.v-count');
    var cur = 0, n = thumbs.length;
    var box = document.createElement('div');
    box.className = 'lightbox';
    box.innerHTML = '<img alt=""><button type="button" class="lb-x" aria-label="Close">&times;</button>';
    document.body.appendChild(box);
    var big = box.querySelector('img');
    var show = function (k) {
      if (n < 2) return;
      cur = (k + n) % n;
      var t = thumbs[cur];
      img.src = t.getAttribute('data-src');
      img.width = +t.getAttribute('data-w');
      img.height = +t.getAttribute('data-h');
      thumbs.forEach(function (b, x) { b.classList.toggle('on', x === cur); });
      if (cnt) cnt.textContent = (cur + 1) + ' / ' + n;
      if (box.classList.contains('open')) big.src = img.src;
    };
    thumbs.forEach(function (b, x) { b.addEventListener('click', function () { show(x); }); });
    var pv = v.querySelector('.v-prev'), nx = v.querySelector('.v-next');
    if (pv) pv.addEventListener('click', function () { show(cur - 1); });
    if (nx) nx.addEventListener('click', function () { show(cur + 1); });
    img.addEventListener('click', function () { big.src = img.src; big.alt = img.alt; box.classList.add('open'); });
    box.addEventListener('click', function () { box.classList.remove('open'); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') box.classList.remove('open');
      else if (e.key === 'ArrowLeft') show(cur - 1);
      else if (e.key === 'ArrowRight') show(cur + 1);
    });
    var sx = null;
    v.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
    v.addEventListener('touchend', function (e) {
      if (sx === null) return;
      var dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 40) show(cur + (dx < 0 ? 1 : -1));
      sx = null;
    });
  }

  var fb = Array.prototype.slice.call(document.querySelectorAll('.filters button'));
  if (fb.length) {
    var acts = Array.prototype.slice.call(document.querySelectorAll('.act'));
    fb.forEach(function (b) {
      b.addEventListener('click', function () {
        var c = b.getAttribute('data-cat');
        fb.forEach(function (x) { x.classList.toggle('on', x === b); });
        acts.forEach(function (a) { a.hidden = !(c === 'all' || a.getAttribute('data-cat') === c); });
      });
    });
  }
})();