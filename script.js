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

            // Product modal and clickable products
            const productData = {
                1: { id:1, title:'Premium T-Shirt', price:'IDR45', img:'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop', desc:'A premium cotton tee for everyday wear.' },
                2: { id:2, title:'Urban Hoodie', price:'IDR95', img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqjEHV-HLsuFz4_t7fpvEMUlHBnbc9pmG9yg&s', desc:'Cozy urban hoodie with relaxed fit.' },
                3: { id:3, title:'Classic Sneakers', price:'IDR120', img:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop', desc:'Timeless sneakers for daily style.' },
                4: { id:4, title:'Vintage Jacket', price:'IDR150', img:'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop', desc:'Retro-style jacket with premium finish.' },
                5: { id:5, title:'Leather Belt', price:'IDR35', img:'https://images.unsplash.com/photo-1545235617-9465f21b0f6a?w=500&h=500&fit=crop', desc:'Genuine leather belt to complete your outfit.' },
                6: { id:6, title:'Cargo Shorts', price:'IDR60', img:'https://images.unsplash.com/photo-1569089782138-28c2462f1c7b?w=500&h=500&fit=crop', desc:'Comfortable cargo shorts with pockets.' },
                7: { id:7, title:'Beanie Cap', price:'IDR25', img:'https://images.unsplash.com/photo-1542060748-18b3d6e0e6b5?w=500&h=500&fit=crop', desc:'Warm knit beanie for colder days.' },
                8: { id:8, title:'Travel Bag', price:'IDR200', img:'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=500&h=500&fit=crop', desc:'Durable travel bag with multiple compartments.' }
            };

            const modal = document.getElementById('product-modal');
            const modalImg = document.getElementById('product-modal-img');
            const modalTitle = document.getElementById('product-modal-title');
            const modalPrice = document.getElementById('product-modal-price');
            const modalDesc = document.getElementById('product-modal-desc');
            const modalClose = document.getElementById('product-modal-close');
            let lastFocus = null;

            function openProductModal(product) {
                modalImg.src = product.img;
                modalImg.alt = product.title;
                modalTitle.textContent = product.title;
                modalPrice.textContent = product.price;
                modalDesc.textContent = product.desc;
                modal.setAttribute('open','');
                modal.setAttribute('aria-hidden','false');
                lastFocus = document.activeElement;
                modalClose.focus();
            }

            function closeProductModal() {
                modal.removeAttribute('open');
                modal.setAttribute('aria-hidden','true');
                if (lastFocus) lastFocus.focus();
            }

            // Attach click handlers to product cards
            document.querySelectorAll('.product-card').forEach(card => {
                card.addEventListener('click', (e) => {
                    const id = card.getAttribute('data-product-id');
                    const product = productData[id];
                    if (product) openProductModal(product);
                });
            });

            modalClose.addEventListener('click', closeProductModal);
            modal.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-action') === 'backdrop' || e.target.classList.contains('modal-backdrop')) {
                    closeProductModal();
                }
            });
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && modal.hasAttribute('open')) {
                    closeProductModal();
                }
            });

        });