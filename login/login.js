document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const resetForm = document.getElementById('resetForm');
    const flipCard = document.getElementById('flipCard');
    const forgotPasswordBtn = document.getElementById('forgotPasswordBtn');
    const flipBackButton = document.getElementById('flipBackButton');
    const backToLoginText = document.getElementById('backToLoginText');

    function flipToReset() {
        if (flipCard) flipCard.classList.add('is-flipped');
    }

    function flipToLogin() {
        if (flipCard) flipCard.classList.remove('is-flipped');
    }

    if (forgotPasswordBtn) forgotPasswordBtn.addEventListener('click', flipToReset);
    if (flipBackButton) flipBackButton.addEventListener('click', flipToLogin);
    if (backToLoginText) backToLoginText.addEventListener('click', flipToLogin);

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = loginForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            submitBtn.innerHTML = `<svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Signing In...`;
            submitBtn.disabled = true;
            submitBtn.classList.add('opacity-80', 'cursor-not-allowed');

            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 1500);
        });
    }

    if (resetForm) {
        resetForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = resetForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            const emailInput = document.getElementById('resetEmailInput');
            const resetErrorMsg = document.getElementById('resetErrorMsg');

            resetErrorMsg.classList.add('hidden');
            resetErrorMsg.textContent = '';

            submitBtn.innerHTML = `<svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Sending...`;
            submitBtn.disabled = true;
            submitBtn.classList.add('opacity-80', 'cursor-not-allowed');

            const restoreBtn = () => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('opacity-80', 'cursor-not-allowed');
            };

            try {
                const response = await fetch('/api/request-password-reset', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: emailInput.value })
                });

                const data = await response.json();

                if (data.success) {
                    submitBtn.innerHTML = 'Reset Link Sent!';
                    submitBtn.classList.add('bg-green-700');
                    setTimeout(() => {
                        flipToLogin();
                        restoreBtn();
                        submitBtn.classList.remove('bg-green-700');
                        resetForm.reset();
                    }, 2000);
                } else {
                    resetErrorMsg.textContent = data.error || 'Something went wrong. Please try again.';
                    resetErrorMsg.classList.remove('hidden');
                    restoreBtn();
                }
            } catch (error) {
                resetErrorMsg.textContent = 'An error occurred. Please try again.';
                resetErrorMsg.classList.remove('hidden');
                restoreBtn();
            }
        });
    }
});