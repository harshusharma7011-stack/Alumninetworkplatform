// ==================== Events Page Functionality ====================

// Check for previously RSVPed events on page load
document.addEventListener('DOMContentLoaded', () => {
    const rsvps = JSON.parse(localStorage.getItem('rsvps')) || [];
    
    rsvps.forEach(eventId => {
        const button = document.querySelector(`[data-event-id="${eventId}"]`);
        if (button) {
            button.textContent = 'RSVPed';
            button.disabled = true;
            button.classList.remove('btn-primary');
            button.classList.add('btn-success');
        }
    });

    // Initialize countdown timers for events
    initializeCountdowns();
});

// Initialize countdown timers
function initializeCountdowns() {
    const eventCards = document.querySelectorAll('.event-card');
    
    eventCards.forEach(card => {
        const dateElement = card.querySelector('.event-date');
        if (dateElement) {
            const dateText = dateElement.textContent;
            const eventDate = parseEventDate(dateText);
            
            if (eventDate && eventDate > new Date()) {
                // Add countdown element if it doesn't exist
                if (!card.querySelector('.event-countdown')) {
                    const countdownDiv = document.createElement('div');
                    countdownDiv.className = 'event-countdown';
                    countdownDiv.style.marginTop = '0.5rem';
                    countdownDiv.style.fontSize = '0.875rem';
                    countdownDiv.style.color = 'var(--primary)';
                    countdownDiv.style.fontWeight = '500';
                    card.querySelector('.event-card-body').insertBefore(countdownDiv, card.querySelector('.event-card-body p'));
                    
                    // Start countdown
                    updateCountdown(eventDate, countdownDiv);
                    setInterval(() => updateCountdown(eventDate, countdownDiv), 1000);
                }
            }
        }
    });
}

// Parse event date from text format
function parseEventDate(dateText) {
    // Format: "📅 December 15, 2024"
    const cleanText = dateText.replace('📅', '').trim();
    const date = new Date(cleanText);
    return isNaN(date.getTime()) ? null : date;
}

// Update countdown display
function updateCountdown(eventDate, element) {
    const now = new Date();
    const distance = eventDate - now;
    
    if (distance < 0) {
        element.textContent = 'Event has started!';
        return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) {
        element.textContent = `Starting in ${days} day${days > 1 ? 's' : ''}`;
    } else if (hours > 0) {
        element.textContent = `Starting in ${hours} hour${hours > 1 ? 's' : ''}`;
    } else {
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        element.textContent = `Starting in ${minutes} minute${minutes > 1 ? 's' : ''}`;
    }
}
