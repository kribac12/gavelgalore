import { populateSections } from '../../render/listings-render.mjs';

/**
 * Sets up event listeners on navigation tabs. Clicking a tab triggers the switchTab function.
 */

export function setUpTabs() {
  const tabs = document.querySelectorAll('.nav-pills .nav-link');
  tabs.forEach((tab) => {
    tab.addEventListener('click', (event) => {
      event.preventDefault();
      switchTab(event.target.id);
    });
  });
}

/**
 * Switches the active tab and updates the content displayed based on the selected tab.
 *
 * @param {string} selectedTabId - The ID of the tab that has been selected.
 */

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

/**
 * Updates the active state of tabs in the navigation.
 *
 * @param {string} activeTabId - The ID of the tab to be shown as active.
 */

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
