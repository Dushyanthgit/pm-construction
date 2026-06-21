/* ========================================
   PM CONSTRUCTION - SCRIPT.JS
   Optimized & Separated - No Design Changes
   ======================================== */

   (function() {
    'use strict';

    // ========================================
    // DOM ELEMENTS CACHE
    // ========================================
    const loader = document.getElementById('loader');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelector('.nav-links');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const counters = document.querySelectorAll('.counter');
    const statsSection = document.querySelector('.hero-stats');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const serviceCards = document.querySelectorAll('.service-card');
    const whyCards = document.querySelectorAll('.why-card');
    const progressBars = document.querySelectorAll('.progress-bar');
    
    // Chatbot elements
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotWindow = document.getElementById('chatbotWindow');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const chatbotQuestions = document.getElementById('chatbotQuestions');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSend = document.getElementById('chatbotSend');

    // ========================================
    // LOADER
    // ========================================
    window.addEventListener('load', function() {
        setTimeout(function() {
            if (loader) {
                loader.classList.add('hidden');
            }
        }, 1000);
    });

    // ========================================
    // TAGLINE ROTATION
    // ========================================
    const taglines = [
        "Building Trust Through Structural Excellence.",
        "From Plan to Perfection – Engineering Your Dreams.",
        "Premium Construction Materials, Uncompromised Quality.",
        "Your Trusted Partner in Smart Space Planning & Elevation.",
        "Shaping Madurai's Landscape with Structural Integrity.",
        "On-Time Delivery, Elite Craftsmanship, Transparent Estimation.",
        "Turning Visual Concepts into Living Realities.",
        "End-to-End Construction Solutions Rooted in Expertise.",
        "Innovating Spaces, Building Legacies.",
        "Premium Real Estate & Masterclass Architectural Design."
    ];

    const taglineContainer = document.querySelector('.tagline-container');
    
    // Create tagline elements if they don't exist
    if (taglineContainer && taglineContainer.children.length === 0) {
        taglines.forEach(function(tagline, index) {
            const p = document.createElement('p');
            p.className = 'tagline' + (index === 0 ? ' active' : '');
            p.id = 'tagline-' + index;
            p.textContent = tagline;
            taglineContainer.appendChild(p);
        });
    }

    let currentTagline = 0;
    function rotateTaglines() {
        const allTaglines = document.querySelectorAll('.tagline');
        if (allTaglines.length === 0) return;
        
        const current = document.getElementById('tagline-' + currentTagline);
        currentTagline = (currentTagline + 1) % taglines.length;
        const next = document.getElementById('tagline-' + currentTagline);
        
        if (current) current.classList.remove('active');
        if (next) next.classList.add('active');
    }
    setInterval(rotateTaglines, 4000);

    // ========================================
    // NAVBAR SCROLL EFFECT
    // ========================================
    window.addEventListener('scroll', function() {
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });

    // ========================================
    // MOBILE MENU TOGGLE
    // ========================================
    window.toggleMobileMenu = function() {
        if (!navLinks) return;
        
        if (navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.flexDirection = 'column';
            navLinks.style.background = 'rgba(15, 23, 42, 0.95)';
            navLinks.style.padding = '2rem';
            navLinks.style.backdropFilter = 'blur(10px)';
        }
    };

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', window.toggleMobileMenu);
    }

    // Close mobile menu when clicking a nav link
    document.querySelectorAll('.nav-links a').forEach(function(link) {
        link.addEventListener('click', function() {
            if (navLinks && navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            }
        });
    });

    // ========================================
    // COUNTER ANIMATION
    // ========================================
    let countersAnimated = false;
    
    function animateCounters() {
        if (countersAnimated) return;
        countersAnimated = true;
        
        counters.forEach(function(counter) {
            const target = parseInt(counter.getAttribute('data-target'));
            if (!target) return;
            
            let count = 0;
            const increment = target / 200;
            
            function updateCount() {
                if (count < target) {
                    count += increment;
                    counter.innerText = Math.ceil(count);
                    requestAnimationFrame(updateCount);
                } else {
                    counter.innerText = target + '+';
                }
            }
            updateCount();
        });
    }

    // Use Intersection Observer for counter animation
    if ('IntersectionObserver' in window && statsSection) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    } else if (statsSection) {
        // Fallback for browsers without IntersectionObserver
        window.addEventListener('scroll', function checkCounters() {
            if (statsSection.getBoundingClientRect().top < window.innerHeight - 100) {
                animateCounters();
                window.removeEventListener('scroll', checkCounters);
            }
        });
    }

    // ========================================
    // PORTFOLIO FILTER
    // ========================================
    window.filterPortfolio = function(category, event) {
        portfolioItems.forEach(function(item) {
            if (category === 'all' || item.getAttribute('data-category') === category) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });

        filterBtns.forEach(function(btn) {
            btn.classList.remove('active');
        });
        
        if (event && event.target) {
            event.target.classList.add('active');
        }
    };

    // Update filter buttons to use data-filter attribute
    filterBtns.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            const category = this.getAttribute('data-filter') || this.textContent.trim().toLowerCase().replace(' ', '-');
            window.filterPortfolio(category, e);
        });
    });

    // ========================================
    // SMOOTH SCROLL
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        });
    });

    // ========================================
    // SCROLL ANIMATIONS
    // ========================================
    function animateOnScroll() {
        const windowHeight = window.innerHeight;
        const triggerPoint = windowHeight - 150;

        // Animate service cards
        serviceCards.forEach(function(card) {
            const rect = card.getBoundingClientRect();
            if (rect.top < triggerPoint) {
                card.classList.add('visible');
            }
        });

        // Animate why cards
        whyCards.forEach(function(card) {
            const rect = card.getBoundingClientRect();
            if (rect.top < triggerPoint) {
                card.classList.add('visible');
            }
        });

        // Animate portfolio items
        portfolioItems.forEach(function(item) {
            const rect = item.getBoundingClientRect();
            if (rect.top < triggerPoint) {
                item.classList.add('visible');
            }
        });

        // Animate progress bars
        progressBars.forEach(function(bar) {
            const rect = bar.getBoundingClientRect();
            const dataWidth = bar.getAttribute('data-width');
            if (rect.top < triggerPoint && dataWidth) {
                bar.style.width = dataWidth + '%';
            }
        });
    }

    // Initial call and scroll event
    animateOnScroll();
    window.addEventListener('scroll', function() {
        requestAnimationFrame(animateOnScroll);
    });

    // Set initial styles for animation elements
    serviceCards.forEach(function(card) {
        card.style.transition = 'all 0.6s ease';
    });
    whyCards.forEach(function(card) {
        card.style.transition = 'all 0.6s ease';
    });
    portfolioItems.forEach(function(item) {
        item.style.transition = 'all 0.6s ease';
    });

    // ========================================
    // CHATBOT FUNCTIONALITY
    // ========================================
    let isChatbotOpen = false;

    // Predefined Q&A Database
    const chatbotAnswers = {
        services: '🏗️ <strong>Our Services:</strong><br><br>' +
            '• Architectural Plans & Design<br>' +
            '• Modern 3D Elevation Visualization<br>' +
            '• Transparent Cost Estimation<br>' +
            '• Premium Land Sales in Madurai<br>' +
            '• Quality Construction Materials<br>' +
            '• Turnkey Construction Projects<br><br>' +
            '<em>Want details on any service? Just ask!</em>',
        
        pricing: '💰 <strong>Our Pricing Approach:</strong><br><br>' +
            'We provide <strong>100% transparent pricing</strong> with:<br><br>' +
            '✓ Detailed item-wise estimation<br>' +
            '✓ No hidden charges<br>' +
            '✓ Market-competitive rates<br>' +
            '✓ Flexible payment plans<br><br>' +
            '<em>For a personalized quote, please share your project details via our contact form!</em>',
        
        timeline: '⏱️ <strong>Typical Project Timelines:</strong><br><br>' +
            '• Residential Villa: 4-8 months<br>' +
            '• Commercial Building: 6-12 months<br>' +
            '• Renovation: 1-3 months<br>' +
            '• Architectural Design: 2-4 weeks<br><br>' +
            '<em>Timelines depend on project scope, approvals & weather. We always commit to on-time delivery!</em>',
        
        location: '📍 <strong>Our Location:</strong><br><br>' +
            '<strong>PM Construction</strong><br>' +
            'Thirupuvanam, Madurai<br>' +
            'Tamil Nadu, India - 625001<br><br>' +
            '<strong>Service Areas:</strong><br>' +
            '✓ Madurai & surrounding districts<br>' +
            '✓ All of Tamil Nadu (on request)<br><br>' +
            '<em>Visit us or call +91 95666 82983 for site consultation!</em>',
        
        contact: '📞 <strong>Get In Touch:</strong><br><br>' +
            '<strong>Phone:</strong> +91 95666 82983<br>' +
            '<strong>Email:</strong> raguvenkatm@gmail.com<br>' +
            '<strong>Hours:</strong> Mon-Sat, 9AM-7PM<br><br>' +
            '<strong>Quick Contact:</strong><br>' +
            '• WhatsApp: <a href="https://wa.me/919566682983" target="_blank" style="color:var(--primary);">Click to Chat</a><br>' +
            '• Facebook: Ragu Venkat<br>' +
            '• Instagram: @ragu_venkat01<br><br>' +
            '<em>We respond within 24 hours!</em>',
        
        portfolio: '🏠 <strong>Our Portfolio:</strong><br><br>' +
            'We\'ve completed <strong>150+ projects</strong> including:<br><br>' +
            '✓ Luxury Residential Villas<br>' +
            '✓ Commercial Complexes<br>' +
            '✓ Modern Apartments<br>' +
            '✓ Institutional Buildings<br><br>' +
            '<strong>See our work:</strong><br>' +
            '• Scroll to our Portfolio section<br>' +
            '• Visit our Instagram @ragu_venkat01<br>' +
            '• Request a project brochure via email<br><br>' +
            '<em>Every project showcases our commitment to quality & innovation!</em>',
        
        default: '🤔 I\'m still learning! For detailed assistance:<br><br>' +
            '• Call us: <strong>+91 95666 82983</strong><br>' +
            '• Email: <strong>raguvenkatm@gmail.com</strong><br>' +
            '• Or select a question from the buttons above 👆<br><br>' +
            '<em>Our team will get back to you within 24 hours!</em>'
    };

    // Open Chatbot
    function openChatbot() {
        if (!isChatbotOpen && chatbotWindow) {
            chatbotWindow.classList.add('open');
            isChatbotOpen = true;
            if (chatbotToggle) {
                chatbotToggle.style.animation = 'none';
                setTimeout(function() {
                    chatbotToggle.style.animation = 'pulse 2s infinite';
                }, 10);
            }
            if (chatbotInput) {
                chatbotInput.focus();
            }
        }
    }

    // Close Chatbot
    function closeChatbot() {
        if (isChatbotOpen && chatbotWindow) {
            chatbotWindow.classList.remove('open');
            isChatbotOpen = false;
        }
    }

    // Toggle Chatbot
    function toggleChatbot() {
        if (isChatbotOpen) {
            closeChatbot();
        } else {
            openChatbot();
        }
    }

    // Add Message to Chat
    function addMessage(text, sender, allowHTML) {
        if (!chatbotMessages) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chatbot-message ' + sender;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'chatbot-message-content';
        
        if (allowHTML) {
            contentDiv.innerHTML = text;
        } else {
            contentDiv.textContent = text;
        }
        
        const timeSpan = document.createElement('span');
        timeSpan.className = 'chatbot-time';
        timeSpan.textContent = getCurrentTime();
        
        messageDiv.appendChild(contentDiv);
        messageDiv.appendChild(timeSpan);
        chatbotMessages.appendChild(messageDiv);
        
        // Auto-scroll to bottom
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Show Typing Indicator
    function showTyping() {
        if (!chatbotMessages) return;
        
        hideTyping();
        
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chatbot-message bot';
        typingDiv.id = 'typingIndicator';
        typingDiv.innerHTML = '<div class="chatbot-typing"><span></span><span></span><span></span></div>';
        chatbotMessages.appendChild(typingDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Hide Typing Indicator
    function hideTyping() {
        const typing = document.getElementById('typingIndicator');
        if (typing) {
            typing.remove();
        }
    }

    // Get Current Time
    function getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });
    }

    // Handle User Input
    function handleUserInput() {
        if (!chatbotInput) return;
        
        const message = chatbotInput.value.trim();
        if (!message) return;
        
        addMessage(message, 'user', false);
        chatbotInput.value = '';
        
        showTyping();
        
        setTimeout(function() {
            hideTyping();
            let response = chatbotAnswers.default;
            
            const lowerMsg = message.toLowerCase();
            if (lowerMsg.indexOf('service') !== -1 || lowerMsg.indexOf('offer') !== -1) {
                response = chatbotAnswers.services;
            } else if (lowerMsg.indexOf('price') !== -1 || lowerMsg.indexOf('cost') !== -1 || lowerMsg.indexOf('budget') !== -1) {
                response = chatbotAnswers.pricing;
            } else if (lowerMsg.indexOf('time') !== -1 || lowerMsg.indexOf('duration') !== -1 || lowerMsg.indexOf('long') !== -1) {
                response = chatbotAnswers.timeline;
            } else if (lowerMsg.indexOf('location') !== -1 || lowerMsg.indexOf('where') !== -1 || lowerMsg.indexOf('address') !== -1) {
                response = chatbotAnswers.location;
            } else if (lowerMsg.indexOf('contact') !== -1 || lowerMsg.indexOf('call') !== -1 || lowerMsg.indexOf('email') !== -1 || lowerMsg.indexOf('phone') !== -1) {
                response = chatbotAnswers.contact;
            } else if (lowerMsg.indexOf('portfolio') !== -1 || lowerMsg.indexOf('work') !== -1 || lowerMsg.indexOf('project') !== -1 || lowerMsg.indexOf('previous') !== -1) {
                response = chatbotAnswers.portfolio;
            }
            
            addMessage(response, 'bot', true);
        }, 1000);
    }

    // Chatbot Event Listeners
    if (chatbotToggle) {
        chatbotToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleChatbot();
        });
    }

    if (chatbotClose) {
        chatbotClose.addEventListener('click', function(e) {
            e.stopPropagation();
            closeChatbot();
        });
    }

    // Close when clicking outside
    document.addEventListener('click', function(e) {
        if (isChatbotOpen && 
            chatbotToggle && 
            chatbotWindow &&
            e.target !== chatbotToggle && 
            !chatbotToggle.contains(e.target) &&
            !chatbotWindow.contains(e.target)) {
            closeChatbot();
        }
    });

    // Quick Questions
    document.querySelectorAll('.chatbot-question').forEach(function(button) {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const answerKey = this.getAttribute('data-answer');
            const questionText = this.textContent.trim();
            
            addMessage(questionText, 'user', false);
            showTyping();
            
            setTimeout(function() {
                hideTyping();
                const answer = chatbotAnswers[answerKey] || chatbotAnswers.default;
                addMessage(answer, 'bot', true);
            }, 800);
        });
    });

    // Send button
    if (chatbotSend) {
        chatbotSend.addEventListener('click', function(e) {
            e.stopPropagation();
            handleUserInput();
        });
    }

    // Enter key to send
    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.stopPropagation();
                handleUserInput();
            }
        });
    }

    // Keyboard shortcut 'C' to toggle chatbot
    document.addEventListener('keydown', function(e) {
        if (e.key.toLowerCase() === 'c' &&
            document.activeElement &&
            document.activeElement.tagName !== 'INPUT' &&
            document.activeElement.tagName !== 'TEXTAREA') {
            toggleChatbot();
        }
    });

    // Prevent form submission inside chatbot
    if (chatbotWindow) {
        chatbotWindow.addEventListener('submit', function(e) {
            e.preventDefault();
        });
    }

    // ========================================
    // CONTACT FORM HANDLING
    // ========================================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Form will submit to Web3Forms naturally
            // You can add validation or loading state here if needed
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                
                // Re-enable after timeout (in case of network issues)
                setTimeout(function() {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                }, 10000);
            }
        });
    }

})();
