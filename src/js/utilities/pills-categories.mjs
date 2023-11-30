import { populateSections } from '../api/listings/listings-render.mjs';

export function setUpTabs() {
  const tabs = document.querySelectorAll('.nav-pills .nav-link');
  tabs.forEach((tab) => {
    tab.addEventListener('click', (event) => {
      event.preventDefault();
      switchTab(event.target.id);
    });
  });
}
export function switchTab(selectedTabId) {
  const tabMapping = {
    popularTab: 'popular',
    endsSoonTab: 'endsSoon',
    newestTab: 'newest',
  };

  // Update active state of tabs
  updateActiveTabState(selectedTabId);

  const selectedCategory = tabMapping[selectedTabId];
  if (selectedCategory) {
    // Hide all containers first
    const containers = ['popularContent', 'endsSoonContent', 'newestContent'];
    containers.forEach((containerId) => {
      const container = document.getElementById(containerId);
      if (container) {
        container.style.display = 'none';
      }
    });

    // Show the selected container
    const selectedContainer = document.getElementById(
      `${selectedCategory}Content`
    );
    if (selectedContainer) {
      selectedContainer.style.display = 'block';
    }

    populateSections(false, selectedCategory);
  }
}

//Function to update active state of tabs

function updateActiveTabState(activeTabId) {
  const tabs = document.querySelectorAll('.nav-pills .nav-link');
  tabs.forEach((tab) => {
    if (tab.id == activeTabId) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });
}
