import { makeApiRequest } from '../api-service.mjs';

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

export async function getListingById(id) {
  const query = {
    _seller: true,
    _bids: true,
    _active: true,
  };
  return await makeApiRequest(`listings/${id}`, 'GET', null, {}, query);
}

export function getMostPopularListings(listings) {
  const now = new Date();
  return listings
    .filter((listing) => new Date(listing.endsAt) > now) // Exclude ended listings
    .sort((a, b) => b._count.bids - a._count.bids);
}

export function getNewestListings(listings) {
  const now = new Date();
  return listings
    .filter((listing) => new Date(listing.endsAt) > now) // Exclude ended listings
    .sort((a, b) => new Date(b.created) - new Date(a.created));
}

export function getSoonEndingListings(listings) {
  const now = new Date();
  return listings
    .filter((listing) => new Date(listing.endsAt) > now) // Exclude ended listings
    .sort((a, b) => new Date(a.endsAt) - new Date(b.endsAt)); // Sort by end date
}

export async function getUpdatedListingById(id) {
  return await makeApiRequest(`listings/${id}`, 'GET');
}
