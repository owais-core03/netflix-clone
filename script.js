// ==========================================
// NETFLIX CLONE - JAVASCRIPT
// ==========================================

// ==========================================
// NAVBAR SCROLL EFFECT
// ==========================================

const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ==========================================
// NAVIGATION LINK ACTIVE STATE
// ==========================================

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// ==========================================
// SEARCH FUNCTIONALITY
// ==========================================

const searchInput = document.getElementById('searchInput');
const searchBtn = document.querySelector('.search-btn');
const movieCards = document.querySelectorAll('.movie-card');

function filterContent(searchTerm) {
    const term = searchTerm.toLowerCase();
    let matchCount = 0;

    movieCards.forEach(card => {
        const cardTitle = card.querySelector('.card-info h3');
        if (cardTitle) {
            const title = cardTitle.textContent.toLowerCase();
            if (title.includes(term) || term === '') {
                card.style.display = 'block';
                matchCount++;
            } else {
                card.style.display = 'none';
            }
        }
    });

    // Show/hide empty state
    if (matchCount === 0 && searchTerm !== '') {
        showNotification('No results found for "' + searchTerm + '"');
    }
}

searchInput.addEventListener('input', (e) => {
    filterContent(e.target.value);
});

searchBtn.addEventListener('click', () => {
    const searchTerm = searchInput.value;
    filterContent(searchTerm);
});

// Enter key search
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        filterContent(searchInput.value);
    }
});

// ==========================================
// CAROUSEL FUNCTIONALITY
// ==========================================

const carousels = document.querySelectorAll('.carousel');

carousels.forEach(carousel => {
    // Add scroll arrows dynamically
    const prevBtn = document.createElement('button');
    const nextBtn = document.createElement('button');

    prevBtn.className = 'carousel-arrow prev-arrow';
    nextBtn.className = 'carousel-arrow next-arrow';
    prevBtn.innerHTML = '❮';
    nextBtn.innerHTML = '❯';

    carousel.parentElement.style.position = 'relative';
    carousel.parentElement.appendChild(prevBtn);
    carousel.parentElement.appendChild(nextBtn);

    // Scroll amount (adjust as needed)
    const scrollAmount = 300;

    prevBtn.addEventListener('click', () => {
        carousel.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });

    nextBtn.addEventListener('click', () => {
        carousel.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    // Show/hide arrows based on scroll position
    function updateArrowVisibility() {
        prevBtn.style.opacity = carousel.scrollLeft > 0 ? '1' : '0.3';
        nextBtn.style.opacity = 
            carousel.scrollLeft < carousel.scrollWidth - carousel.clientWidth 
            ? '1' : '0.3';
    }

    carousel.addEventListener('scroll', updateArrowVisibility);
    window.addEventListener('resize', updateArrowVisibility);
    updateArrowVisibility();
});

// ==========================================
// PLAY BUTTON INTERACTIONS
// ==========================================

const playButtons = document.querySelectorAll('.play-button');

playButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        const cardTitle = button.nextElementSibling.querySelector('h3')?.textContent || 'Content';
        showNotification(`Playing ${cardTitle}...`);
        
        // Add a visual feedback
        button.style.transform = 'scale(0.9)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 100);
    });
});

// ==========================================
// PRIMARY BUTTON INTERACTIONS
// ==========================================

const primaryBtns = document.querySelectorAll('.btn-primary');

primaryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const title = document.querySelector('.hero-title')?.textContent || 'Content';
        showNotification(`Playing ${title}... Enjoy!`);
    });
});

// Secondary button
const secondaryBtn = document.querySelector('.btn-secondary');
if (secondaryBtn) {
    secondaryBtn.addEventListener('click', () => {
        const title = document.querySelector('.hero-title')?.textContent || 'Content';
        showNotification(`More info about ${title}`);
    });
}

// ==========================================
// MOVIE CARD HOVER EFFECTS & TOOLTIPS
// ==========================================

movieCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        const rect = this.getBoundingClientRect();
        const isNearRight = rect.right > window.innerWidth - 200;
        
        if (isNearRight) {
            this.style.zIndex = '100';
        }
    });

    card.addEventListener('mouseleave', function() {
        this.style.zIndex = 'auto';
    });
});

// ==========================================
// NOTIFICATION SYSTEM
// ==========================================

function showNotification(message, duration = 3000) {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background-color: #e50914;
        color: white;
        padding: 15px 25px;
        border-radius: 4px;
        font-size: 14px;
        font-weight: 600;
        z-index: 2000;
        animation: slideIn 0.3s ease-out;
        box-shadow: 0 4px 12px rgba(229, 9, 20, 0.4);
    `;

    // Add animation styles if not already present
    if (!document.querySelector('style[data-notification]')) {
        const style = document.createElement('style');
        style.setAttribute('data-notification', 'true');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, duration);
}

// ==========================================
// CAROUSEL ARROW STYLES (INJECTED)
// ==========================================

const carouselStyles = document.createElement('style');
carouselStyles.textContent = `
    .carousel-arrow {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background-color: rgba(0, 0, 0, 0.5);
        color: white;
        border: none;
        width: 40px;
        height: 40px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        z-index: 20;
    }

    .carousel-arrow:hover {
        background-color: rgba(0, 0, 0, 0.8);
        transform: translateY(-50%) scale(1.1);
    }

    .prev-arrow {
        left: -60px;
    }

    .next-arrow {
        right: -60px;
    }

    @media (max-width: 768px) {
        .carousel-arrow {
            width: 35px;
            height: 35px;
            font-size: 16px;
        }

        .prev-arrow {
            left: -50px;
        }

        .next-arrow {
            right: -50px;
        }
    }
`;

document.head.appendChild(carouselStyles);

// ==========================================
// KEYBOARD NAVIGATION
// ==========================================

document.addEventListener('keydown', (e) => {
    // Press 'H' to go home (scroll to top)
    if (e.key.toLowerCase() === 'h') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Press 'S' to focus search
    if (e.key.toLowerCase() === 's' && e.ctrlKey) {
        e.preventDefault();
        searchInput.focus();
    }
});

// ==========================================
// RANDOM FEATURED CONTENT (Optional Enhancement)
// ==========================================

const heroTitle = document.querySelector('.hero-title');
const heroDescription = document.querySelector('.hero-description');

const featuredContent = [
    {
        title: 'The Crown',
        description: 'Experience the drama, passion, and intrigue of the British royal family as they navigate decades of change and challenge. A masterpiece of television storytelling.'
    },
    {
        title: 'Stranger Things',
        description: 'When a young boy disappears, his friends must uncover secrets in their small town to bring him home. Blending science fiction with 1980s nostalgia, this is peak entertainment.'
    },
    {
        title: 'Breaking Bad',
        description: 'A high school chemistry teacher turns to cooking methamphetamine to secure his family\'s financial future. An intense journey into the criminal underworld.'
    },
    {
        title: 'Bridgerton',
        description: 'Step into the glittering world of Regency-era London where eight siblings navigate love, scandal, and societal expectations in this lavish period romance.'
    }
];

function getRandomContent() {
    return featuredContent[Math.floor(Math.random() * featuredContent.length)];
}

// Uncomment to enable random featured content
// const randomContent = getRandomContent();
// if (heroTitle) heroTitle.textContent = randomContent.title;
// if (heroDescription) heroDescription.textContent = randomContent.description;

// ==========================================
// LOAD MORE / PAGINATION (Optional)
// ==========================================

let currentContentPage = 1;

function loadMoreContent() {
    showNotification(`Loading more content... Page ${currentContentPage + 1}`);
    currentContentPage++;
    // In a real app, this would fetch more content from an API
}

// ==========================================
// PAGE LOAD ANIMATION
// ==========================================

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    console.log('Netflix Clone loaded successfully!');
});

// ==========================================
// GENRE FILTER (Optional Feature)
// ==========================================

function filterByGenre(genre) {
    console.log(`Filtering by genre: ${genre}`);
    showNotification(`Showing ${genre} content...`);
    // Implementation would filter cards by genre data attribute
}

// ==========================================
// LOCAL STORAGE - REMEMBER LAST WATCHED
// ==========================================

function saveWatchedItem(title) {
    let watched = JSON.parse(localStorage.getItem('watched')) || [];
    if (!watched.includes(title)) {
        watched.push(title);
        localStorage.setItem('watched', JSON.stringify(watched));
    }
}

function getWatchedItems() {
    return JSON.parse(localStorage.getItem('watched')) || [];
}

// Save when clicking play
playButtons.forEach(button => {
    button.addEventListener('click', () => {
        const title = button.nextElementSibling.querySelector('h3')?.textContent;
        if (title) saveWatchedItem(title);
    });
});

// ==========================================
// USER PROFILE DROPDOWN (Optional)
// ==========================================

const userProfile = document.querySelector('.user-profile');
if (userProfile) {
    userProfile.addEventListener('click', () => {
        showNotification('Profile menu opened');
        // In a real app, this would show a dropdown menu
    });
}

// ==========================================
// MOBILE MENU TOGGLE (Optional)
// ==========================================

function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        navMenu.classList.toggle('active');
    }
}

// ==========================================
// ACCESSIBILITY - KEYBOARD FOCUS
// ==========================================

document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-focus');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-focus');
});

// ==========================================
// CONSOLE MESSAGE
// ==========================================

console.log('%c🎬 Netflix Clone Loaded! 🎬', 'color: #e50914; font-size: 16px; font-weight: bold;');
console.log('Keyboard shortcuts: Press H to go home, Ctrl+S to search');
