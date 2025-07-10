document.addEventListener('DOMContentLoaded', function () {
    const emailOrPhoneInput = document.getElementById('emailOrPhone');
    const passwordInput = document.getElementById('password');
    const submitBtn = document.getElementById('submitBtn');
    const notification = document.getElementById('notification');
    const formCard = document.querySelector('.form-card');
    
    function toggleSubmitButton() {
        if (emailOrPhoneInput.value.trim() !== '' && passwordInput.value.trim() !== '') {
            submitBtn.disabled = false;
        } else {
            submitBtn.disabled = true;
        }
    }
    
    // Initialize button state
    toggleSubmitButton();
    
    // Add event listeners
    emailOrPhoneInput.addEventListener('input', toggleSubmitButton);
    passwordInput.addEventListener('input', toggleSubmitButton);
    
    // Handle form submission
    submitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Show notification
        notification.classList.add('show');
        
        // Hide notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
        
        // Reset form
        emailOrPhoneInput.value = '';
        passwordInput.value = '';
        toggleSubmitButton();
        
        // PERBAIKAN: Hapus reset manual label
        // Biarkan CSS yang mengatur posisi label secara otomatis
    });
    
    // Add hover effects to form card
    formCard.addEventListener('mouseenter', () => {
        formCard.style.transform = 'translateY(-5px)';
        formCard.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.15)';
    });
    
    formCard.addEventListener('mouseleave', () => {
        formCard.style.transform = 'translateY(0)';
        formCard.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.1)';
    });
    
    // Page load animation
    setTimeout(() => {
        document.body.style.opacity = 1;
    }, 100);
});// script.js
document.getElementById("submitBtn").addEventListener("click", function() {
  window.location.href = "index.html";
});