
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbycogZtDr3fZC-XhFW21w-hqyqlL0A3Fk6CLzbMC_fK4_cK30fbEMjt4btR7M7tfNj-/exec';

  document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('modal');
    const backdrop = document.getElementById('modal-backdrop');
    const openModalBtn = document.getElementById('play_store_icon');
    const closeModalBtn = document.getElementById('close-modal');
    const form = document.getElementById('interest-form');
    const submitBtn = document.getElementById('submit-btn');

    // Open modal when the image is clicked
    if (openModalBtn) {
      openModalBtn.addEventListener('click', function (event) {
        event.preventDefault();
        backdrop.style.display = 'flex';
      });
    }

    // Close modal
    if (closeModalBtn) {
      closeModalBtn.addEventListener('click', function () {
        backdrop.style.display = 'none';
      });
    }

    // Close modal if clicking outside the modal
    if (backdrop) {
      backdrop.addEventListener('click', function (event) {
        if (event.target === backdrop) {
          backdrop.style.display = 'none';
        }
      });
    }

    // Handle form submission
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();

        const firstName = document.getElementById('firstName').value.trim();
        const email = document.getElementById('email').value.trim();
        const consent = document.getElementById('consent').checked;

        if (!firstName || !email || !consent) {
          alert('Please fill in all fields and check the consent box.');
          return;
        }

        submitBtn.disabled = true;
        submitBtn.innerText = 'Sending...';

        fetch(SCRIPT_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ firstName, email, consent }),
        })
          .then((res) => res.json())
          .then((data) => {
            alert('Thanks! We’ll keep you updated.');
            form.reset();
            backdrop.style.display = 'none';
          })
          .catch((error) => {
            console.error('Error!', error.message);
            alert('There was an error submitting the form.');
          })
          .finally(() => {
            submitBtn.disabled = false;
            submitBtn.innerText = 'Submit';
          });
      });
    }
  });
