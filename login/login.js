document.addEventListener('DOMContentLoaded', () => {
    const flipCard = document.getElementById('flipCard');
    const forgotPasswordBtn = document.getElementById('forgotPasswordBtn');
    const flipBackButton = document.getElementById('flipBackButton');
    const backToLoginText = document.getElementById('backToLoginText');
    const loginForm = document.getElementById('loginForm');
    const resetForm = document.getElementById('resetForm');

    if (forgotPasswordBtn && flipCard) {
        forgotPasswordBtn.addEventListener('click', (e) => {
            e.preventDefault();
            flipCard.classList.add('is-flipped');
        });
    }

    const restoreLoginView = (e) => {
        if (e) e.preventDefault();
        if (flipCard) flipCard.classList.remove('is-flipped');
    };

    if (flipBackButton) flipBackButton.addEventListener('click', restoreLoginView);
    if (backToLoginText) backToLoginText.addEventListener('click', restoreLoginView);

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = loginForm.querySelector('button[type="submit"]');
            
            submitBtn.innerHTML = `<svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Logging in...`;
            submitBtn.disabled = true;
            submitBtn.classList.add('opacity-80', 'cursor-not-allowed', 'transform-none');
            submitBtn.classList.remove('hover:-translate-y-1', 'active:scale-[0.98]');

            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 1500);
        });
    }

    if (resetForm) {
        resetForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = resetForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = `<svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Sending...`;
            submitBtn.disabled = true;
            submitBtn.classList.add('opacity-80', 'cursor-not-allowed', 'transform-none');
            submitBtn.classList.remove('hover:-translate-y-1', 'active:scale-[0.98]');

            setTimeout(() => {
                submitBtn.innerHTML = 'Reset Link Sent!';
                submitBtn.classList.remove('from-indigo-600', 'to-purple-600', 'hover:from-indigo-500', 'hover:to-purple-500');
                submitBtn.classList.add('from-emerald-600', 'to-emerald-500');
                
                setTimeout(() => {
                    restoreLoginView();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('opacity-80', 'cursor-not-allowed', 'transform-none', 'from-emerald-600', 'to-emerald-500');
                    submitBtn.classList.add('from-indigo-600', 'to-purple-600', 'hover:from-indigo-500', 'hover:to-purple-500', 'hover:-translate-y-1', 'active:scale-[0.98]');
                    resetForm.reset();
                }, 2000);
            }, 1500);
        });
    }
});
