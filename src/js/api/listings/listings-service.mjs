import { makeApiRequest } from '../api-service.mjs';

export async function getAllListings(
  sort = 'created',
  order = 'desc',
  offset = 0,
  limit = 100
) {
  const query = { sort, sortOrder: order, offset, limit };
  return await makeApiRequest('listings', 'GET', null, {}, query);
}

export async function getListingById(id) {
  const query = {
    _seller: true,
    _bids: true,
  };
  return await makeApiRequest(`listings/${id}`, 'GET', null, {}, query);
}

export function getMostPopularListings(listings) {
  return listings.sort((a, b) => b._count.bids - a._count.bids);
}

export function getNewestListings(listings) {
  return listings.sort((a, b) => new Date(b.created) - new Date(a.created));
}

export function getSoonEndingListings(listings) {
  return listings.sort((a, b) => new Date(a.endsAt) - new Date(b.endsAt));
}
