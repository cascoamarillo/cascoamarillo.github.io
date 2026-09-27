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

/* --- research figures: click to view full size ---------------------------- */
(function () {
  var figs = document.querySelectorAll('.theme-figure img');
  if (!figs.length) return;

  var view = document.createElement('div');
  view.className = 'figview';
  view.setAttribute('role', 'dialog');
  view.setAttribute('aria-modal', 'true');
  view.innerHTML = '<figure><img alt=""><figcaption></figcaption></figure>';
  document.body.appendChild(view);

  var img = view.querySelector('img');
  var cap = view.querySelector('figcaption');
  var opener = null;

  function open(source) {
    var legend = source.closest('figure').querySelector('figcaption');
    img.src = source.currentSrc || source.src;
    img.alt = source.alt || '';
    cap.textContent = legend ? legend.textContent : '';
    view.classList.add('is-open');
    opener = source;
    view.focus();
  }

  function close() {
    view.classList.remove('is-open');
    img.removeAttribute('src');
    if (opener) { opener.focus(); opener = null; }
  }

  figs.forEach(function (f) {
    f.setAttribute('tabindex', '0');
    f.setAttribute('title', 'Click to enlarge');
    var hint = document.createElement('span');
    hint.className = 'fig-zoom';
    hint.textContent = 'Click to enlarge';
    f.insertAdjacentElement('afterend', hint);
    f.addEventListener('click', function () { open(f); });
    f.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(f); }
    });
  });

  view.addEventListener('click', close);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && view.classList.contains('is-open')) close();
  });
})();
