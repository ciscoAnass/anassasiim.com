        // Mobile Menu
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });

        // Footer Current Year
        document.getElementById('currentYear').textContent = new Date().getFullYear();

        // Vanta.js for Contact Section
        let vantaEffectContact;
        function initializeVantaContact() {
            const vantaCanvasElement = document.getElementById('vanta-canvas-contact');
            if (vantaCanvasElement && typeof VANTA !== 'undefined' && VANTA.RINGS) {
                 vantaEffectContact = VANTA.RINGS({
                    el: vantaCanvasElement,
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 400.00, 
                    minWidth: 200.00,
                    scale: 1.00,
                    scaleMobile: 1.00,
                    backgroundColor: 0xe0f2fe, // Light sky blue (sky-50)
                    color: 0x0ea5e9 // Sky 500
                });
            }
        }
        
        document.addEventListener('DOMContentLoaded', function() {
            initializeVantaContact();
        });











        // Enhanced JavaScript functionality
        document.addEventListener('DOMContentLoaded', function() {
            // Mobile menu toggle
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const mobileMenu = document.getElementById('mobile-menu');
            
            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
                const icon = mobileMenuButton.querySelector('i');
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            });

            // Close mobile menu when clicking on links
            document.querySelectorAll('#mobile-menu a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.add('hidden');
                    const icon = mobileMenuButton.querySelector('i');
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                });
            });

            // Scroll progress indicator
            function updateScrollProgress() {
                const scrollTop = window.pageYOffset;
                const docHeight = document.body.scrollHeight - window.innerHeight;
                const scrollPercent = (scrollTop / docHeight) * 100;
                document.querySelector('.scroll-indicator').style.width = scrollPercent + '%';
            }

            window.addEventListener('scroll', updateScrollProgress);

            // Navbar background on scroll
            window.addEventListener('scroll', function() {
                const navbar = document.getElementById('navbar');
                if (window.scrollY > 50) {
                    navbar.classList.add('bg-white/95', 'shadow-lg');
                    navbar.classList.remove('bg-white/80');
                } else {
                    navbar.classList.remove('bg-white/95', 'shadow-lg');
                    navbar.classList.add('bg-white/80');
                }
            });

            // Intersection Observer for animations
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        
                        // Animate timeline items
                        if (entry.target.classList.contains('timeline-item')) {
                            entry.target.classList.add('animate');
                        }

                        // Animate skill progress bars
                        if (entry.target.querySelector('.loading-bar')) {
                            const progressBars = entry.target.querySelectorAll('.loading-bar');
                            progressBars.forEach((bar, index) => {
                                setTimeout(() => {
                                    bar.style.animationPlayState = 'running';
                                }, index * 200);
                            });
                        }
                    }
                });
            }, observerOptions);

            // Observe sections and elements
            document.querySelectorAll('.section-fade').forEach(section => {
                observer.observe(section);
            });

            document.querySelectorAll('.timeline-item').forEach(item => {
                observer.observe(item);
            });

            document.querySelectorAll('.hover-card').forEach(card => {
                observer.observe(card);
            });

            // Smooth scrolling for navigation links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });

            // Parallax effect for background elements
            window.addEventListener('scroll', function() {
                const scrolled = window.pageYOffset;
                const parallaxElements = document.querySelectorAll('.parallax');
                
                parallaxElements.forEach(element => {
                    const speed = element.dataset.speed || 0.5;
                    const yPos = -(scrolled * speed);
                    element.style.transform = `translateY(${yPos}px)`;
                });
            });

            // Magnetic effect for buttons and links
            document.querySelectorAll('.magnetic').forEach(element => {
                element.addEventListener('mousemove', function(e) {
                    const rect = this.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;
                    
                    this.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
                });

                element.addEventListener('mouseleave', function() {
                    this.style.transform = 'translate(0, 0)';
                });
            });

            // Enhanced typing effect
            function typeWriter(element, text, speed = 100) {
                let i = 0;
                element.innerHTML = '';
                
                function type() {
                    if (i < text.length) {
                        element.innerHTML += text.charAt(i);
                        i++;
                        setTimeout(type, speed);
                    }
                }
                type();
            }

            // Initialize typing effect when element comes into view
            const typingElement = document.querySelector('.typing-effect');
            if (typingElement) {
                const typingObserver = new IntersectionObserver(function(entries) {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            typeWriter(entry.target, entry.target.textContent);
                            typingObserver.unobserve(entry.target);
                        }
                    });
                });
                typingObserver.observe(typingElement);
            }

            // Form submission with animation
            const contactForm = document.querySelector('#contact form');
            if (contactForm) {
                contactForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    const submitBtn = this.querySelector('button[type="submit"]');
                    const originalText = submitBtn.innerHTML;
                    
                    // Loading animation
                    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-3"></i>Sending...';
                    submitBtn.disabled = true;
                    
                    // Simulate form submission
                    setTimeout(() => {
                        submitBtn.innerHTML = '<i class="fas fa-check mr-3"></i>Message Sent!';
                        submitBtn.classList.add('bg-green-600', 'hover:bg-green-700');
                        submitBtn.classList.remove('bg-sky-600', 'hover:bg-sky-700');
                        
                        setTimeout(() => {
                            submitBtn.innerHTML = originalText;
                            submitBtn.disabled = false;
                            submitBtn.classList.remove('bg-green-600', 'hover:bg-green-700');
                            submitBtn.classList.add('bg-sky-600', 'hover:bg-sky-700');
                            this.reset();
                        }, 2000);
                    }, 2000);
                });
            }

            // Enhanced cursor effect (optional)
            if (window.innerWidth > 768) {
                const cursor = document.createElement('div');
                cursor.className = 'fixed w-4 h-4 bg-sky-500 rounded-full pointer-events-none z-50 transition-transform duration-100 ease-out opacity-50';
                cursor.style.left = '-100px';
                cursor.style.top = '-100px';
                document.body.appendChild(cursor);

                document.addEventListener('mousemove', (e) => {
                    cursor.style.left = e.clientX - 8 + 'px';
                    cursor.style.top = e.clientY - 8 + 'px';
                });

                document.addEventListener('mousedown', () => {
                    cursor.style.transform = 'scale(0.8)';
                });

                document.addEventListener('mouseup', () => {
                    cursor.style.transform = 'scale(1)';
                });

                // Hide cursor when hovering over interactive elements
                document.querySelectorAll('a, button, input, textarea').forEach(el => {
                    el.addEventListener('mouseenter', () => cursor.style.opacity = '0');
                    el.addEventListener('mouseleave', () => cursor.style.opacity = '0.5');
                });
            }

            // Initialize all animations
            setTimeout(() => {
                document.body.classList.add('loaded');
            }, 100);

            // Update current year
            document.getElementById('currentYear').textContent = new Date().getFullYear();

            // Lazy loading for images
            if ('IntersectionObserver' in window) {
                const imageObserver = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            img.src = img.dataset.src || img.src;
                            img.classList.remove('lazy');
                            imageObserver.unobserve(img);
                        }
                    });
                });

                document.querySelectorAll('img[data-src]').forEach(img => {
                    imageObserver.observe(img);
                });
            }

            // Performance optimization: Throttle scroll events
            let ticking = false;
            function requestTick() {
                if (!ticking) {
                    requestAnimationFrame(updateScrollProgress);
                    ticking = true;
                }
            }

            window.addEventListener('scroll', requestTick);

            // Add loading states for better UX
            window.addEventListener('load', function() {
                document.body.classList.add('page-loaded');
                
                // Start skill bar animations after page load
                setTimeout(() => {
                    document.querySelectorAll('.loading-bar').forEach(bar => {
                        bar.style.animation = 'loading 2s ease-in-out forwards';
                    });
                }, 500);
            });

            // Enhanced keyboard navigation
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    // Close mobile menu
                    mobileMenu.classList.add('hidden');
                    const icon = mobileMenuButton.querySelector('i');
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            });

            // Add focus states for accessibility
            document.querySelectorAll('a, button, input, textarea').forEach(element => {
                element.addEventListener('focus', function() {
                    this.style.outline = '2px solid #0ea5e9';
                    this.style.outlineOffset = '2px';
                });

                element.addEventListener('blur', function() {
                    this.style.outline = 'none';
                });
            });

            console.log('🚀 Portfolio loaded successfully with enhanced animations!');
        });