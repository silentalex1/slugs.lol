document.addEventListener('DOMContentLoaded', () => {
    fetchStatistics();
    setInterval(fetchStatistics, 30000);

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
            if(!link.classList.contains('login-trigger')) {
                link.addEventListener('click', () => {
                    closeMobileMenu();
                });
            }
        });
    }

    function closeMobileMenu() {
        if(mobileMenu) {
            mobileMenu.classList.remove('menu-open');
            if(mobileMenuBtn) {
                mobileMenuBtn.innerHTML = '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 6h16M4 12h16M4 18h16"></path></svg>';
            }
            setTimeout(() => {
                if (!mobileMenu.classList.contains('menu-open')) {
                    mobileMenu.classList.add('hidden');
                }
            }, 300);
        }
    }

    const loginTriggers = document.querySelectorAll('.login-trigger');
    const createAccountBtn = document.getElementById('createAccountBtn');
    const flipper = document.getElementById('flipper');
    const formFlipContainer = document.getElementById('formFlipContainer');
    const mainTitle = document.getElementById('mainTitle');
    const loginEmail = document.getElementById('loginEmail');
    const passwordFieldContainer = document.getElementById('passwordFieldContainer');

    function updateContainerHeight() {
        if(!flipper || !formFlipContainer) return;
        const isFlipped = flipper.classList.contains('rotate-y-180');
        const activeFace = isFlipped ? document.getElementById('loginFace') : document.getElementById('claimFace');
        if(activeFace) {
            formFlipContainer.style.height = `${activeFace.offsetHeight}px`;
        }
    }

    function updateTitleText(newText) {
        if(!mainTitle) return;
        mainTitle.style.opacity = '0';
        setTimeout(() => {
            mainTitle.innerHTML = newText;
            mainTitle.style.opacity = '1';
        }, 250);
    }

    loginTriggers.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            closeMobileMenu();
            if(flipper && !flipper.classList.contains('rotate-y-180')) {
                flipper.classList.add('rotate-y-180');
                updateTitleText("Login to your account.");
                setTimeout(updateContainerHeight, 50);
            }
        });
    });

    const homeLoginBtn = document.getElementById('homeLoginBtn');
    if (homeLoginBtn) {
        homeLoginBtn.addEventListener('click', () => {
            window.location.href = '/login';
        });
    }

    if(createAccountBtn) {
        createAccountBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if(flipper && flipper.classList.contains('rotate-y-180')) {
                flipper.classList.remove('rotate-y-180');
                updateTitleText("Claim your user");
                setTimeout(updateContainerHeight, 50);
            }
        });
    }

    if(loginEmail && passwordFieldContainer) {
        loginEmail.addEventListener('input', (e) => {
            if(e.target.value.trim().length > 0) {
                passwordFieldContainer.classList.remove('opacity-0', 'max-h-0', 'invisible');
                passwordFieldContainer.classList.add('opacity-100', 'max-h-[120px]', 'visible');
            } else {
                passwordFieldContainer.classList.add('opacity-0', 'max-h-0', 'invisible');
                passwordFieldContainer.classList.remove('opacity-100', 'max-h-[120px]', 'visible');
            }
            setTimeout(updateContainerHeight, 150);
        });
    }

    window.addEventListener('load', updateContainerHeight);
    window.addEventListener('resize', updateContainerHeight);
});

async function checkUsernameAvailability(username) {
    const usernameStatus = document.getElementById('usernameStatus');
    if(!usernameStatus) return;
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
        if(document.getElementById('statTotalProfileViews')) document.getElementById('statTotalProfileViews').textContent = data.totalProfileViews;
        if(document.getElementById('statRegisteredUsers')) document.getElementById('statRegisteredUsers').textContent = data.registeredUsers;
        if(document.getElementById('statFilesHosted')) document.getElementById('statFilesHosted').textContent = data.filesHosted;
        if(document.getElementById('statActiveSubscribers')) document.getElementById('statActiveSubscribers').textContent = data.activeSubscribers;
    } catch (error) {
        if(document.getElementById('statTotalProfileViews')) document.getElementById('statTotalProfileViews').textContent = '0';
        if(document.getElementById('statRegisteredUsers')) document.getElementById('statRegisteredUsers').textContent = '0';
        if(document.getElementById('statFilesHosted')) document.getElementById('statFilesHosted').textContent = '0';
        if(document.getElementById('statActiveSubscribers')) document.getElementById('statActiveSubscribers').textContent = '0';
    }
}
