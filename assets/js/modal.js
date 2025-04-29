document.addEventListener('DOMContentLoaded', function() {
  var openBtn  = document.getElementById('play_store_icon');
  var backdrop = document.getElementById('modal-backdrop');
  var closeBtn = document.getElementById('close-modal');
  var form     = document.getElementById('interest-form');
  var success  = document.getElementById('success-msg');
  var error    = document.getElementById('error-msg');

  // Show modal
  openBtn.addEventListener('click', function(e) {
    e.preventDefault();
    backdrop.style.display = 'flex';
  });

  // Close modal
  closeBtn.addEventListener('click', function() {
    backdrop.style.display = 'none';
    resetMessages();
  });

  // Close on outside click
  backdrop.addEventListener('click', function(e) {
    if (e.target === backdrop) {
      backdrop.style.display = 'none';
      resetMessages();
    }
  });

  // Listen for the iframe load event to detect success/failure
  var iframe = document.querySelector('iframe[name="ghost-frame"]');
  iframe.addEventListener('load', function() {
    // If the script returns success JSON, show success message
    try {
      var doc = iframe.contentDocument || iframe.contentWindow.document;
      var body = doc.body.textContent;
      var json = JSON.parse(body);
      if (json.status === 'success') {
        success.style.display = 'block';
        form.style.display = 'none';
      } else {
        throw new Error();
      }
    } catch (e) {
      error.style.display = 'block';
    }
  });

  function resetMessages() {
    success.style.display = 'none';
    error.style.display = 'none';
    form.style.display = '';
    form.reset();
  }
});
