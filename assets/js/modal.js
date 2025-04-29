  document.addEventListener('DOMContentLoaded', function() {
    var openBtn  = document.getElementById('play_store_icon');
    var backdrop = document.getElementById('gf-modal-backdrop');
    var closeBtn = document.getElementById('gf-close');

    openBtn.addEventListener('click', function(e) {
      e.preventDefault();
      backdrop.classList.add('visible');
    });

    closeBtn.addEventListener('click', function() {
      backdrop.classList.remove('visible');
    });

    backdrop.addEventListener('click', function(e) {
      if (e.target === backdrop) {
        backdrop.classList.remove('visible');
      }
    });
  });
