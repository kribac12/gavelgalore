import { makeApiRequest } from '../api-service.mjs';
/**
 * Gets all listings with specific filters and sorting.
 *
 * @param {string} sort - Field to sort by (default is 'created').
 * @param {string} order - Order of sorting (default is 'desc).
 * @param {number} offset - Offset for pagination (default is 0).
 * @param {number} limit - Limit of listings to fetch (default is 100).
 * @param {string} searchQuery - Search query string.
 * @returns {Promise <object>} - Promise that resolves to the fetched listings.
 */
export async function getAllListings(
  sort = 'created',
  order = 'desc',
  offset = 0,
  limit = 100,
  searchQuery = ''
) {
  const query = {
    sort,
    sortOrder: order,
    offset,
    limit,
    _active: true,
    _bids: true,
    searchQuery,
  };
  return await makeApiRequest('listings', 'GET', null, {}, query);
}

/**
 * Fetches specific listing by ID.
 *
 * @param {string} id - Unique id for the listing.
 * @returns {Promise<Object>}- Promise that resolves to the requested listing.
 */
export async function getListingById(id) {
  const query = {
    _seller: true,
    _bids: true,
    _active: true,
  };
  return await makeApiRequest(`listings/${id}`, 'GET', null, {}, query);
}

/**
 * Filters and sorts listings based on number of bids
 *
 * @param {Array<Object>} listings - array of listing objects.
 * @returns {Array<Object>} - The sorted array of listings based on bid count.
 */
export function getMostPopularListings(listings) {
  const now = new Date();
  return listings
    .filter((listing) => new Date(listing.endsAt) > now) // Exclude ended listings
    .sort((a, b) => b._count.bids - a._count.bids);
}

/**
 * Filters and sorts listings based on creation date.
 *
 * @param {Array<Object>} listings - Array of listing objects.
 * @returns {Array<Object>} - Sorted array of listings by date created.
 */
export function getNewestListings(listings) {
  const now = new Date();
  return listings
    .filter((listing) => new Date(listing.endsAt) > now) // Exclude ended listings
    .sort((a, b) => new Date(b.created) - new Date(a.created));
}

/**
 * Filters and sorts listings based on ending date.
 *
 * @param {Array<Object>} listings - Array of listing objects.
 * @returns {Array<Object>} - Sorted array of listings by date ending.
 */
export function getSoonEndingListings(listings) {
  const now = new Date();
  return listings
    .filter((listing) => new Date(listing.endsAt) > now) // Exclude ended listings
    .sort((a, b) => new Date(a.endsAt) - new Date(b.endsAt)); // Sort by end date
}

/**
 * Fetches updated version of listing based by ID.
 *
 * @param {string} id - Unique ID of listing.
 * @returns {Promise<Object>}- Promise that resolves to updated listing.
 */
export async function getUpdatedListingById(id) {
  return await makeApiRequest(`listings/${id}`, 'GET');
}
