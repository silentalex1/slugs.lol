document.addEventListener('DOMContentLoaded', () => {
    const claimAccountForm = document.getElementById('claimAccountForm');
    const usernameInput = document.getElementById('usernameInput');
    const usernameStatus = document.getElementById('usernameStatus');

    const urlParams = new URLSearchParams(window.location.search);
    const prefillUsername = urlParams.get('claim');
    
    if (prefillUsername && usernameInput) {
        usernameInput.value = prefillUsername;
    }

    if (claimAccountForm && usernameInput) {
        let debounceTimer;
        
        usernameInput.addEventListener('input', () => {
            clearTimeout(debounceTimer);
            const username = usernameInput.value.trim();
            
            if (username.length > 0) {
                usernameStatus.textContent = 'verifying request';
                usernameStatus.className = 'mt-2 text-xs sm:text-sm font-medium text-gray-400 min-h-[18px] smooth-transition opacity-100 transform translate-y-0';
                
                debounceTimer = setTimeout(() => {
                    checkUsernameAvailability(username);
                }, 500);
            } else {
                usernameStatus.className = 'mt-2 text-xs sm:text-sm font-medium text-gray-500 min-h-[18px] smooth-transition opacity-0 transform translate-y-[-5px]';
            }
        });

        claimAccountForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = usernameInput.value.trim();
            
            if (username) {
                const submitButton = claimAccountForm.querySelector('button[type="submit"]');
                
                submitButton.innerHTML = `<svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Processing...`;
                submitButton.disabled = true;
                submitButton.classList.add('opacity-80', 'cursor-not-allowed', 'transform-none');
                submitButton.classList.remove('hover:-translate-y-1', 'active:scale-[0.98]');

                setTimeout(() => {
                    window.location.href = `/register/?claim=${encodeURIComponent(username)}&ref=header`;
                }, 800);
            }
        });
    }
});

async function checkUsernameAvailability(username) {
    const usernameStatus = document.getElementById('usernameStatus');
    
    try {
        const response = await fetch('/api/check-username', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username }),
        });

        const data = await response.json();

        if (data.available) {
            usernameStatus.innerHTML = '<span class="text-green-400 flex items-center gap-2"><svg class="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> username available</span>';
        } else {
            usernameStatus.innerHTML = '<span class="text-red-400 flex items-center gap-2"><svg class="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg> username unavailable - user taken</span>';
        }
        usernameStatus.className = 'mt-2 text-xs sm:text-sm font-medium min-h-[18px] smooth-transition opacity-100 transform translate-y-0';
    } catch (error) {
        const isTaken = ['admin', 'test', 'support', 'help'].includes(username.toLowerCase());
        
        if (isTaken) {
            usernameStatus.innerHTML = '<span class="text-red-400 flex items-center gap-2"><svg class="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg> username unavailable - user taken</span>';
        } else {
            usernameStatus.innerHTML = '<span class="text-green-400 flex items-center gap-2"><svg class="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> username available</span>';
        }
        usernameStatus.className = 'mt-2 text-xs sm:text-sm font-medium min-h-[18px] smooth-transition opacity-100 transform translate-y-0';
    }
}