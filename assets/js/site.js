// Mobile menu toggle + the Resources dropdown. That is all the JS on this site.
(function () {
  // --- mobile menu ---------------------------------------------------------
  var btn = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');

  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        nav.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // --- dropdown menus ------------------------------------------------------
  // Hovering opens them via CSS; this adds click-to-open, keyboard support,
  // and click-outside / Escape to close.
  var menus = Array.prototype.slice.call(document.querySelectorAll('.has-menu'));

  function closeAll(except) {
    menus.forEach(function (m) {
      if (m === except) return;
      var d = m.querySelector('.dropdown');
      var b = m.querySelector('.nav-menu-btn');
      if (d) d.classList.remove('open');
      if (b) b.setAttribute('aria-expanded', 'false');
    });
  }

  menus.forEach(function (menu) {
    var mbtn = menu.querySelector('.nav-menu-btn');
    var drop = menu.querySelector('.dropdown');
    if (!mbtn || !drop) return;

    mbtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = drop.classList.toggle('open');
      mbtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      closeAll(menu);
    });

    drop.addEventListener('click', function (e) { e.stopPropagation(); });

    // Tabbing out of the menu closes it.
    menu.addEventListener('focusout', function (e) {
      if (!menu.contains(e.relatedTarget)) {
        drop.classList.remove('open');
        mbtn.setAttribute('aria-expanded', 'false');
      }
    });
  });

  if (menus.length) {
    document.addEventListener('click', function () { closeAll(null); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeAll(null);
    });
  }
})();
