document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const header = item.querySelector('.faq-header');
        
        header.addEventListener('click', () => {
            const answer = item.querySelector('.faq-answer');
            const icon = item.querySelector('.faq-icon');
            const isVisible = answer.style.display === 'block';
            
            faqItems.forEach(otherItem => {
                const otherAnswer = otherItem.querySelector('.faq-answer');
                const otherIcon = otherItem.querySelector('.faq-icon');
                otherAnswer.style.display = 'none';
                otherIcon.style.transform = 'rotate(0deg)';
                otherItem.classList.remove('border-blue-500/30', 'bg-[#111111]/90');
            });
            
            if (!isVisible) {
                answer.style.display = 'block';
                icon.style.transform = 'rotate(180deg)';
                item.classList.add('border-blue-500/30', 'bg-[#111111]/90');
            }
        });
    });

    const claimForm = document.getElementById('claimForm');
    const usernameInput = document.getElementById('usernameInput');
    const usernameStatus = document.getElementById('usernameStatus');

    if (claimForm && usernameInput) {
        let debounceTimer;
        
        usernameInput.addEventListener('input', () => {
            clearTimeout(debounceTimer);
            const username = usernameInput.value.trim();
            
            if (username.length > 0) {
                usernameStatus.textContent = 'verifying request';
                usernameStatus.className = 'mt-3 text-sm font-medium text-gray-400 min-h-[20px]';
                
                debounceTimer = setTimeout(() => {
                    checkUsernameAvailability(username);
                }, 500);
            } else {
                usernameStatus.textContent = '';
            }
        });

        claimForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = usernameInput.value.trim();
            if (username) {
                window.location.href = `/register/?claim=${encodeURIComponent(username)}&ref=landing_page`;
            } else {
                usernameInput.focus();
            }
        });
    }

    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.contains('hidden');
            if (isHidden) {
                mobileMenu.classList.remove('hidden');
                setTimeout(() => {
                    mobileMenu.classList.remove('opacity-0');
                    mobileMenu.classList.add('opacity-100');
                }, 10);
                document.body.style.overflow = 'hidden';
            } else {
                mobileMenu.classList.remove('opacity-100');
                mobileMenu.classList.add('opacity-0');
                setTimeout(() => {
                    mobileMenu.classList.add('hidden');
                }, 300);
                document.body.style.overflow = '';
            }
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('opacity-100');
                mobileMenu.classList.add('opacity-0');
                setTimeout(() => {
                    mobileMenu.classList.add('hidden');
                }, 300);
                document.body.style.overflow = '';
            });
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
            usernameStatus.innerHTML = '<span class="text-green-400 flex items-center gap-2"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> username available</span>';
        } else {
            usernameStatus.innerHTML = '<span class="text-red-400 flex items-center gap-2"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg> username unavailable - user taken</span>';
        }
    } catch (error) {
        const isTaken = ['admin', 'test', 'support', 'help'].includes(username.toLowerCase());
        
        if (isTaken) {
            usernameStatus.innerHTML = '<span class="text-red-400 flex items-center gap-2"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg> username unavailable - user taken</span>';
        } else {
            usernameStatus.innerHTML = '<span class="text-green-400 flex items-center gap-2"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> username available</span>';
        }
    }
}