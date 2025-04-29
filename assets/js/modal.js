(function() {
  // Replace with your actual Apps Script URL:
  var SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbycogZtDr3fZC-XhFW21w-hqyqlL0A3Fk6CLzbMC_fK4_cK30fbEMjt4btR7M7tfNj-/exec';

  // Grab elements
  var openModalBtn  = document.getElementById('my-preexisting-trigger');
  var closeModalBtn = document.getElementById('close-modal');
  var backdrop      = document.getElementById('modal-backdrop');
  var form          = document.getElementById('interest-form');
  var submitBtn     = document.getElementById('submit-btn');
  var successMsg    = document.getElementById('success-msg');
  var errorMsg      = document.getElementById('error-msg');

  // Only run if the trigger button exists
  if (!openModalBtn) {
    console.warn('Modal trigger button not found: #my-preexisting-trigger');
    return;
  }

  // Show modal
  openModalBtn.addEventListener('click', function() {
    backdrop.style.display = 'flex';
  });

  // Close modal
  closeModalBtn.addEventListener('click', function() {
    backdrop.style.display = 'none';
    resetForm();
  });

  // Close when clicking outside the modal
  backdrop.addEventListener('click', function(e) {
    if (e.target === backdrop) {
      backdrop.style.display = 'none';
      resetForm();
    }
  });

  // Form submission handler
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    var payload = {
      firstName: document.getElementById('firstName').value.trim(),
      email:     document.getElementById('email').value.trim(),
      consent:   document.getElementById('consent').checked
    };

    var xhr = new XMLHttpRequest();
    xhr.open('POST', SCRIPT_URL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit';

        if (xhr.status === 200) {
          try {
            var response = JSON.parse(xhr.responseText);
            if (response.status === 'success') {
              successMsg.style.display = 'block';
              form.style.display = 'none';
            } else {
              showError();
            }
          } catch (err) {
            console.error(err);
            showError();
          }
        } else {
          showError();
        }
      }
    };

    xhr.send(JSON.stringify(payload));
  });

  // Reset form state
  function resetForm() {
    form.reset();
    successMsg.style.display = 'none';
    errorMsg.style.display   = 'none';
    submitBtn.disabled = false;
    submitBtn.textContent = 'Submit';
    form.style.display = '';
  }

  // Display error
  function showError() {
    errorMsg.style.display = 'block';
  }

})();
