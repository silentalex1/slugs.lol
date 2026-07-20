document.addEventListener('DOMContentLoaded', () => {
    const resetForm = document.getElementById('resetForm');
    const newPassword = document.getElementById('newPassword');
    const errorMessage = document.getElementById('errorMessage');
    const resetContent = document.getElementById('resetContent');
    const successContainer = document.getElementById('successContainer');
    const countdownMessage = document.getElementById('countdownMessage');

    const emailRequest = window.location.pathname.substring(1);
    if (!emailRequest.endsWith('=request')) {
        errorMessage.textContent = 'Invalid reset link. Please request a new password reset.';
        errorMessage.classList.remove('hidden');
        if (resetForm) resetForm.style.display = 'none';
        return;
    }

    const email = emailRequest.split('=request')[0];

    resetForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        errorMessage.classList.add('hidden');

        if (newPassword.value.length < 6) {
            errorMessage.textContent = 'Password must be at least 6 characters';
            errorMessage.classList.remove('hidden');
            return;
        }

        const submitBtn = resetForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = `<svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Resetting...`;
        submitBtn.disabled = true;
        submitBtn.classList.add('opacity-80', 'cursor-not-allowed', 'transform-none');
        submitBtn.classList.remove('hover:-translate-y-1', 'active:scale-[0.98]');

        try {
            const response = await fetch('/api/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    newPassword: newPassword.value
                })
            });

            const data = await response.json();

            if (response.ok) {
                resetContent.classList.add('hidden');
                successContainer.classList.remove('hidden');
                
                let count = 5;
                countdownMessage.textContent = 'redirecting you to main site login now.. ' + count;
                const interval = setInterval(() => {
                    count--;
                    if (count <= 0) {
                        clearInterval(interval);
                        window.location.href = '/login';
                    } else {
                        countdownMessage.textContent = 'redirecting you to main site login now.. ' + count;
                    }
                }, 1000);
            } else {
                errorMessage.textContent = data.error || 'Failed to reset password. Please try again.';
                errorMessage.classList.remove('hidden');
                
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('opacity-80', 'cursor-not-allowed', 'transform-none');
                submitBtn.classList.add('hover:-translate-y-1', 'active:scale-[0.98]');
            }
        } catch (error) {
            errorMessage.textContent = 'An error occurred. Please try again.';
            errorMessage.classList.remove('hidden');
            
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.classList.remove('opacity-80', 'cursor-not-allowed', 'transform-none');
            submitBtn.classList.add('hover:-translate-y-1', 'active:scale-[0.98]');
        }
    });
});
