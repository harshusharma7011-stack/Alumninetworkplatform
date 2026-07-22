// ==================== Dark/Light Mode Toggle ====================
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

// Check for saved theme preference or default to light
const currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);

if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
        const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateDarkModeIcon();
    });
}

function updateDarkModeIcon() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (darkModeToggle) {
        darkModeToggle.innerHTML = isDark ? '☀️' : '🌙';
    }
}

// Initialize icon
updateDarkModeIcon();

// ==================== Mobile Menu Toggle ====================
const menuToggle = document.querySelector('.menu-toggle');
const navbarNav = document.querySelector('.navbar-nav');

if (menuToggle && navbarNav) {
    menuToggle.addEventListener('click', () => {
        navbarNav.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navbarNav.classList.remove('active');
        });
    });
}

// ==================== Smooth Scrolling ====================
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

// ==================== Counter Animation ====================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }
    
    updateCounter();
}

// Initialize counters when they come into view
const observerOptions = {
    threshold: 0.5
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.textContent);
            animateCounter(entry.target, target);
            counterObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-number').forEach(counter => {
    counterObserver.observe(counter);
});

// ==================== Fade-in Animation on Scroll ====================
const fadeElements = document.querySelectorAll('.card, .feature-card, .story-card, .event-item');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(element => {
    fadeObserver.observe(element);
});

// ==================== Form Validation ====================
function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    
    inputs.forEach(input => {
        const value = input.value.trim();
        const errorElement = input.parentElement.querySelector('.error-message');
        
        if (!value) {
            isValid = false;
            input.style.borderColor = '#EF4444';
            if (errorElement) {
                errorElement.textContent = 'This field is required';
                errorElement.style.display = 'block';
            }
        } else {
            input.style.borderColor = '';
            if (errorElement) {
                errorElement.style.display = 'none';
            }
        }
        
        // Email validation
        if (input.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                input.style.borderColor = '#EF4444';
                if (errorElement) {
                    errorElement.textContent = 'Please enter a valid email';
                    errorElement.style.display = 'block';
                }
            }
        }
        
        // Password confirmation
        if (input.type === 'password' && input.id === 'confirmPassword') {
            const password = form.querySelector('#password').value;
            if (value !== password) {
                isValid = false;
                input.style.borderColor = '#EF4444';
                if (errorElement) {
                    errorElement.textContent = 'Passwords do not match';
                    errorElement.style.display = 'block';
                }
            }
        }
    });
    
    return isValid;
}

// Add validation to all forms
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
        if (!validateForm(form)) {
            e.preventDefault();
        }
    });
});

// ==================== Local Storage Login Demo ====================
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('rememberMe').checked;
        
        // Demo login - accept any valid email/password
        if (email && password) {
            const user = {
                email: email,
                name: email.split('@')[0],
                loggedIn: true,
                loginTime: new Date().toISOString()
            };
            
            localStorage.setItem('currentUser', JSON.stringify(user));
            
            if (rememberMe) {
                localStorage.setItem('rememberedEmail', email);
            } else {
                localStorage.removeItem('rememberedEmail');
            }
            
            alert('Login successful! Redirecting to dashboard...');
            window.location.href = 'dashboard.html';
        }
    });
    
    // Check for remembered email
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
        document.getElementById('email').value = rememberedEmail;
        document.getElementById('rememberMe').checked = true;
    }
}

if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            graduationYear: document.getElementById('graduationYear').value,
            branch: document.getElementById('branch').value,
            currentCompany: document.getElementById('currentCompany').value,
            jobRole: document.getElementById('jobRole').value,
            location: document.getElementById('location').value,
            linkedin: document.getElementById('linkedin').value,
            password: document.getElementById('password').value,
            registeredAt: new Date().toISOString()
        };
        
        // Store user data in local storage
        localStorage.setItem('userData', JSON.stringify(formData));
        
        alert('Registration successful! Please login to continue.');
        window.location.href = 'login.html';
    });
}

// Check if user is logged in
function checkAuth() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || !currentUser.loggedIn) {
        // Redirect to login if not on login/register pages
        const currentPage = window.location.pathname.split('/').pop();
        if (currentPage !== 'login.html' && currentPage !== 'register.html' && currentPage !== 'index.html') {
            window.location.href = 'login.html';
        }
    }
    return currentUser;
}

// Logout function
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

// ==================== Event Countdown Timer ====================
function updateCountdown(eventDate, elementId) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const eventTime = new Date(eventDate).getTime();
    const now = new Date().getTime();
    const distance = eventTime - now;
    
    if (distance < 0) {
        element.innerHTML = 'Event has started!';
        return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    element.innerHTML = `
        <div class="countdown-item">
            <span class="countdown-value">${days}</span>
            <span class="countdown-label">Days</span>
        </div>
        <div class="countdown-item">
            <span class="countdown-value">${hours}</span>
            <span class="countdown-label">Hours</span>
        </div>
        <div class="countdown-item">
            <span class="countdown-value">${minutes}</span>
            <span class="countdown-label">Minutes</span>
        </div>
        <div class="countdown-item">
            <span class="countdown-value">${seconds}</span>
            <span class="countdown-label">Seconds</span>
        </div>
    `;
}

// Initialize countdowns
document.querySelectorAll('[data-countdown]').forEach(element => {
    const eventDate = element.dataset.countdown;
    setInterval(() => updateCountdown(eventDate, element.id), 1000);
    updateCountdown(eventDate, element.id);
});

// ==================== FAQ Accordion ====================
document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    
    if (question && answer) {
        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');
            
            // Close all other items
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                otherItem.classList.remove('active');
                const otherAnswer = otherItem.querySelector('.faq-answer');
                if (otherAnswer) {
                    otherAnswer.style.maxHeight = '0';
                }
            });
            
            // Toggle current item
            if (!isOpen) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    }
});

// ==================== Image Slider ====================
let currentSlide = 0;

function showSlide(index, sliderId) {
    const slider = document.getElementById(sliderId);
    if (!slider) return;
    
    const slides = slider.querySelectorAll('.slide');
    if (slides.length === 0) return;
    
    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }
    
    slides.forEach((slide, i) => {
        slide.style.display = i === currentSlide ? 'block' : 'none';
    });
}

function nextSlide(sliderId) {
    showSlide(currentSlide + 1, sliderId);
}

function prevSlide(sliderId) {
    showSlide(currentSlide - 1, sliderId);
}

// Auto-advance slides
setInterval(() => {
    const slider = document.querySelector('.slider');
    if (slider) {
        nextSlide(slider.id);
    }
}, 5000);

// ==================== Toast Notifications ====================
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// ==================== Modal Functionality ====================
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close modal when clicking outside
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal.id);
        }
    });
});

// ==================== Loading State ====================
function showLoading(button) {
    const originalText = button.textContent;
    button.disabled = true;
    button.innerHTML = '<span class="spinner"></span> Loading...';
    button.dataset.originalText = originalText;
}

function hideLoading(button) {
    button.disabled = false;
    button.textContent = button.dataset.originalText || 'Submit';
}

// ==================== Dynamic Year in Footer ====================
const yearElements = document.querySelectorAll('.current-year');
yearElements.forEach(element => {
    element.textContent = new Date().getFullYear();
});

// ==================== Initialize on DOM Ready ====================
document.addEventListener('DOMContentLoaded', () => {
    // Check authentication for protected pages
    const protectedPages = ['dashboard.html', 'profile.html', 'directory.html', 'jobs.html', 'mentorship.html', 'events.html', 'announcements.html', 'achievements.html'];
    const currentPage = window.location.pathname.split('/').pop();
    
    if (protectedPages.includes(currentPage)) {
        checkAuth();
    }
    
    // Load user data for profile page
    if (currentPage === 'profile.html') {
        loadUserProfile();
    }
});

// ==================== Load User Profile ====================
function loadUserProfile() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (userData) {
        // Update profile page with user data
        const nameElement = document.getElementById('profileName');
        const batchElement = document.getElementById('profileBatch');
        const branchElement = document.getElementById('profileBranch');
        const companyElement = document.getElementById('profileCompany');
        const roleElement = document.getElementById('profileRole');
        const locationElement = document.getElementById('profileLocation');
        const linkedinElement = document.getElementById('profileLinkedin');
        
        if (nameElement) nameElement.textContent = userData.fullName || currentUser?.name || 'User';
        if (batchElement) batchElement.textContent = `Batch of ${userData.graduationYear || 'N/A'}`;
        if (branchElement) branchElement.textContent = userData.branch || 'N/A';
        if (companyElement) companyElement.textContent = userData.currentCompany || 'N/A';
        if (roleElement) roleElement.textContent = userData.jobRole || 'N/A';
        if (locationElement) locationElement.textContent = userData.location || 'N/A';
        if (linkedinElement) linkedinElement.href = userData.linkedin || '#';
    }
}

// ==================== RSVP Functionality ====================
function rsvpEvent(eventId) {
    const currentUser = checkAuth();
    if (!currentUser) {
        showToast('Please login to RSVP for events', 'error');
        return;
    }
    
    // Get existing RSVPs
    let rsvps = JSON.parse(localStorage.getItem('rsvps')) || [];
    
    if (rsvps.includes(eventId)) {
        showToast('You have already RSVPed for this event', 'info');
        return;
    }
    
    rsvps.push(eventId);
    localStorage.setItem('rsvps', JSON.stringify(rsvps));
    showToast('RSVP successful!', 'success');
    
    // Update button state
    const button = document.querySelector(`[data-event-id="${eventId}"]`);
    if (button) {
        button.textContent = 'RSVPed';
        button.disabled = true;
        button.classList.remove('btn-primary');
        button.classList.add('btn-success');
    }
}

// ==================== Apply for Job ====================
function applyForJob(jobId) {
    const currentUser = checkAuth();
    if (!currentUser) {
        showToast('Please login to apply for jobs', 'error');
        return;
    }
    
    // Get existing applications
    let applications = JSON.parse(localStorage.getItem('jobApplications')) || [];
    
    if (applications.includes(jobId)) {
        showToast('You have already applied for this job', 'info');
        return;
    }
    
    applications.push(jobId);
    localStorage.setItem('jobApplications', JSON.stringify(applications));
    showToast('Application submitted successfully!', 'success');
    
    // Update button state
    const button = document.querySelector(`[data-job-id="${jobId}"]`);
    if (button) {
        button.textContent = 'Applied';
        button.disabled = true;
        button.classList.remove('btn-primary');
        button.classList.add('btn-success');
    }
}

// ==================== Request Mentorship ====================
function requestMentorship(mentorId) {
    const currentUser = checkAuth();
    if (!currentUser) {
        showToast('Please login to request mentorship', 'error');
        return;
    }
    
    // Get existing requests
    let requests = JSON.parse(localStorage.getItem('mentorshipRequests')) || [];
    
    if (requests.includes(mentorId)) {
        showToast('You have already requested mentorship from this mentor', 'info');
        return;
    }
    
    requests.push(mentorId);
    localStorage.setItem('mentorshipRequests', JSON.stringify(requests));
    showToast('Mentorship request sent!', 'success');
    
    // Update button state
    const button = document.querySelector(`[data-mentor-id="${mentorId}"]`);
    if (button) {
        button.textContent = 'Requested';
        button.disabled = true;
        button.classList.remove('btn-primary');
        button.classList.add('btn-success');
    }
}

// ==================== Connect with Alumni ====================
function connectWithAlumni(alumniId) {
    const currentUser = checkAuth();
    if (!currentUser) {
        showToast('Please login to connect with alumni', 'error');
        return;
    }
    
    // Get existing connections
    let connections = JSON.parse(localStorage.getItem('connections')) || [];
    
    if (connections.includes(alumniId)) {
        showToast('You are already connected with this alumni', 'info');
        return;
    }
    
    connections.push(alumniId);
    localStorage.setItem('connections', JSON.stringify(connections));
    showToast('Connection request sent!', 'success');
    
    // Update button state
    const button = document.querySelector(`[data-alumni-id="${alumniId}"]`);
    if (button) {
        button.textContent = 'Pending';
        button.disabled = true;
        button.classList.remove('btn-primary');
        button.classList.add('btn-secondary');
    }
}
