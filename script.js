document.addEventListener('DOMContentLoaded', () => {
    fetchStatistics();

    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            const answer = item.querySelector('.faq-answer');
            const icon = item.querySelector('.faq-icon');
            const isOpen = item.classList.contains('faq-item-active');
            
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('faq-item-active');
                const otherAnswer = otherItem.querySelector('.faq-answer');
                const otherIcon = otherItem.querySelector('.faq-icon');
                otherAnswer.style.maxHeight = '0';
                otherAnswer.style.opacity = '0';
                otherIcon.style.transform = 'rotate(0deg)';
            });
            
            if (!isOpen) {
                item.classList.add('faq-item-active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.style.opacity = '1';
                icon.style.transform = 'rotate(180deg)';
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
                usernameStatus.innerHTML = '<span class="text-gray-500 text-xs font-bold uppercase tracking-widest animate-pulse">Checking database...</span>';
                
                debounceTimer = setTimeout(() => {
                    checkUsernameAvailability(username);
                }, 400);
            } else {
                usernameStatus.innerHTML = '';
            }
        });

        claimForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = usernameInput.value.trim();
            if (username) {
                window.location.href = `register/?claim=${encodeURIComponent(username)}&ref=header`;
            } else {
                usernameInput.focus();
            }
        });
    }

    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = mobileMenu.classList.contains('menu-open');
            if (!isOpen) {
                mobileMenu.classList.remove('hidden');
                setTimeout(() => {
                    mobileMenu.classList.add('menu-open');
                }, 10);
                mobileMenuBtn.innerHTML = '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>';
            } else {
                closeMobileMenu();
            }
        });

        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                if (mobileMenu.classList.contains('menu-open')) {
                    closeMobileMenu();
                }
            }
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeMobileMenu();
            });
        });
    }

    function closeMobileMenu() {
        mobileMenu.classList.remove('menu-open');
        mobileMenuBtn.innerHTML = '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 6h16M4 12h16M4 18h16"></path></svg>';
        setTimeout(() => {
            if (!mobileMenu.classList.contains('menu-open')) {
                mobileMenu.classList.add('hidden');
            }
        }, 300);
    }
});

async function checkUsernameAvailability(username) {
    const usernameStatus = document.getElementById('usernameStatus');
    try {
        const response = await fetch('/api/check-username', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username }),
        });
        const data = await response.json();
        if (data.available) {
            usernameStatus.innerHTML = '<span class="text-green-400 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-green-400"></span> Username Available</span>';
        } else {
            usernameStatus.innerHTML = '<span class="text-red-400 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-red-400"></span> Username Taken</span>';
        }
    } catch (error) {
        usernameStatus.innerHTML = '<span class="text-green-400 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-green-400"></span> Username Available</span>';
    }
}

async function fetchStatistics() {
    try {
        const response = await fetch('/api/stats');
        const data = await response.json();
        document.getElementById('statTotalProfileViews').textContent = data.totalProfileViews;
        document.getElementById('statRegisteredUsers').textContent = data.registeredUsers;
        document.getElementById('statFilesHosted').textContent = data.filesHosted;
        document.getElementById('statActiveSubscribers').textContent = data.activeSubscribers;
    } catch (error) {
        document.getElementById('statTotalProfileViews').textContent = '0';
        document.getElementById('statRegisteredUsers').textContent = '0';
        document.getElementById('statFilesHosted').textContent = '0';
        document.getElementById('statActiveSubscribers').textContent = '0';
    }
}
