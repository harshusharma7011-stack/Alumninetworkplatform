// ==================== Jobs Page Functionality ====================

// Check for previously applied jobs on page load
document.addEventListener('DOMContentLoaded', () => {
    const appliedJobs = JSON.parse(localStorage.getItem('jobApplications')) || [];
    
    appliedJobs.forEach(jobId => {
        const button = document.querySelector(`[data-job-id="${jobId}"]`);
        if (button) {
            button.textContent = 'Applied';
            button.disabled = true;
            button.classList.remove('btn-primary');
            button.classList.add('btn-success');
        }
    });
});

// Search functionality for jobs (optional enhancement)
const jobSearchInput = document.getElementById('jobSearchInput');
if (jobSearchInput) {
    jobSearchInput.addEventListener('input', filterJobs);
}

function filterJobs() {
    const searchTerm = jobSearchInput.value.toLowerCase();
    const jobCards = document.querySelectorAll('.job-card');
    
    jobCards.forEach(card => {
        const title = card.querySelector('h4') ? card.querySelector('h4').textContent.toLowerCase() : '';
        const company = card.querySelector('.company-name') ? card.querySelector('.company-name').textContent.toLowerCase() : '';
        const location = card.querySelector('.job-detail') ? card.querySelector('.job-detail').textContent.toLowerCase() : '';
        
        if (title.includes(searchTerm) || company.includes(searchTerm) || location.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}
