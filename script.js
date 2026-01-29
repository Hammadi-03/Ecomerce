 // Mobile menu toggle
        document.addEventListener('DOMContentLoaded', function() {
            const mobileMenuBtn = document.querySelector('[commandfor="mobile-menu"]');
            const mobileMenu = document.getElementById('mobile-menu');
            const profileBtn = document.getElementById('profile-btn');
            const profileMenu = document.getElementById('profile-menu');

            // Toggle mobile menu
            if (mobileMenuBtn && mobileMenu) {
                mobileMenuBtn.addEventListener('click', function() {
                    const isHidden = mobileMenu.hasAttribute('hidden');
                    if (isHidden) {
                        mobileMenu.removeAttribute('hidden');
                    } else {
                        mobileMenu.setAttribute('hidden', '');
                    }
                });
            }

            // Toggle profile dropdown
            if (profileBtn && profileMenu) {
                profileBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const isHidden = profileMenu.hasAttribute('hidden');
                    if (isHidden) {
                        profileMenu.removeAttribute('hidden');
                    } else {
                        profileMenu.setAttribute('hidden', '');
                    }
                });

                // Close profile menu when clicking outside
                document.addEventListener('click', function(e) {
                    if (!profileBtn.contains(e.target) && !profileMenu.contains(e.target)) {
                        profileMenu.setAttribute('hidden', '');
                    }
                });

                // Close profile menu when clicking on a link
                const profileLinks = profileMenu.querySelectorAll('a');
                profileLinks.forEach(link => {
                    link.addEventListener('click', function() {
                        profileMenu.setAttribute('hidden', '');
                    });
                });
            }

            // Close mobile menu when clicking on a link
            if (mobileMenu) {
                const mobileMenuLinks = mobileMenu.querySelectorAll('a');
                mobileMenuLinks.forEach(link => {
                    link.addEventListener('click', function() {
                        mobileMenu.setAttribute('hidden', '');
                    });
                });
            }
        });