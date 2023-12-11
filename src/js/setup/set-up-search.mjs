export function setUpSearchForm() {
  const searchForm = document.getElementById('searchForm');
  if (searchForm) {
    searchForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const searchQuery = searchForm.querySelector('[name="query"]').value;
      if (searchQuery) {
        localStorage.setItem('searchQuery', searchQuery);
        window.location.href = '/src/html/search-results/index.html'; // Redirect to search results page
      }
    });
  }
}
