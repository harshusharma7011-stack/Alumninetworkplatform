// ==================== Directory Search and Filter ====================
const searchInput = document.getElementById('searchInput');
const batchFilter = document.getElementById('batchFilter');
const locationFilter = document.getElementById('locationFilter');
const industryFilter = document.getElementById('industryFilter');
const resetFilters = document.getElementById('resetFilters');
const alumniGrid = document.getElementById('alumniGrid');

// Get all alumni cards
const alumniCards = document.querySelectorAll('.alumni-card');

// Search functionality
if (searchInput) {
    searchInput.addEventListener('input', filterAlumni);
}

// Filter functionality
if (batchFilter) {
    batchFilter.addEventListener('change', filterAlumni);
}

if (locationFilter) {
    locationFilter.addEventListener('change', filterAlumni);
}

if (industryFilter) {
    industryFilter.addEventListener('change', filterAlumni);
}

// Reset filters
if (resetFilters) {
    resetFilters.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        if (batchFilter) batchFilter.value = '';
        if (locationFilter) locationFilter.value = '';
        if (industryFilter) industryFilter.value = '';
        filterAlumni();
    });
}

// Main filter function
function filterAlumni() {
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    const selectedBatch = batchFilter ? batchFilter.value : '';
    const selectedLocation = locationFilter ? locationFilter.value : '';
    const selectedIndustry = industryFilter ? industryFilter.value : '';

    let visibleCount = 0;

    alumniCards.forEach(card => {
        const name = card.dataset.name ? card.dataset.name.toLowerCase() : '';
        const batch = card.dataset.batch || '';
        const location = card.dataset.location || '';
        const industry = card.dataset.industry || '';
        const company = card.querySelector('.company') ? card.querySelector('.company').textContent.toLowerCase() : '';
        const role = card.querySelector('.role') ? card.querySelector('.role').textContent.toLowerCase() : '';

        // Check if card matches all filters
        const matchesSearch = name.includes(searchTerm) || 
                             company.includes(searchTerm) || 
                             role.includes(searchTerm);
        const matchesBatch = selectedBatch === '' || batch === selectedBatch;
        const matchesLocation = selectedLocation === '' || location === selectedLocation;
        const matchesIndustry = selectedIndustry === '' || industry === selectedIndustry;

        if (matchesSearch && matchesBatch && matchesLocation && matchesIndustry) {
            card.style.display = 'block';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });

    // Show message if no results
    let noResults = document.getElementById('noResults');
    if (visibleCount === 0) {
        if (!noResults) {
            noResults = document.createElement('div');
            noResults.id = 'noResults';
            noResults.className = 'text-center';
            noResults.style.gridColumn = '1 / -1';
            noResults.style.padding = '3rem';
            noResults.innerHTML = `
                <h3 style="color: var(--gray-500);">No alumni found</h3>
                <p style="color: var(--gray-400);">Try adjusting your search or filters</p>
            `;
            alumniGrid.appendChild(noResults);
        }
        noResults.style.display = 'block';
    } else {
        if (noResults) {
            noResults.style.display = 'none';
        }
    }
}

// Initialize filter on page load
document.addEventListener('DOMContentLoaded', () => {
    filterAlumni();
});
