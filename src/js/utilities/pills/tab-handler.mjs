import { switchTab } from './pills-categories.mjs';

/**
 * Handles initial selection of a tab based on current hash.
 * Maps URL hashes to matching tab IDs and activates the correct tab.
 * If no hash is found, defaults to activate the popularTab.
 */
export function handleInitialTabBasedOnHash() {
  const hash = window.location.hash;
  const tabMapping = {
    '#popular': 'popularTab',
    '#endsSoon': 'endsSoonTab',
    '#newest': 'newestTab',
  };
  const selectedTabId = tabMapping[hash];
  if (selectedTabId) {
    switchTab(selectedTabId);
  } else {
    switchTab('popularTab');
  }
}
