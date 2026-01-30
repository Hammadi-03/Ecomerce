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

            // Brand partners marquee: start/pause when section scrolls into view (scroll-trigger-like)
            (function() {
                const marquee = document.querySelector('.marquee');
                const track = marquee?.querySelector('.marquee__track');
                if (!marquee || !track) return;

                // Observe visibility of the marquee wrapper
                const io = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
                            track.classList.add('marquee--running');
                        } else {
                            track.classList.remove('marquee--running');
                        }
                    });
                }, { threshold: [0, 0.1, 0.5, 1] });

                io.observe(marquee);

                // Pause when document hidden (tab change) and resume when visible and in view
                document.addEventListener('visibilitychange', () => {
                    if (document.hidden) {
                        track.classList.remove('marquee--running');
                    } else {
                        const rect = marquee.getBoundingClientRect();
                        const inView = rect.top < window.innerHeight && rect.bottom >= 0;
                        if (inView) track.classList.add('marquee--running');
                    }
                });

                // On page load, if marquee is already in view, start it
                const rect = marquee.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom >= 0) {
                    track.classList.add('marquee--running');
                }
            })();
        });