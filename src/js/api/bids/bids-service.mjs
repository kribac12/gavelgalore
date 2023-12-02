import { makeApiRequest } from '../api-service.mjs';

export async function placeBid(listingId, bidAmount) {
  try {
    const response = await makeApiRequest(
      `listings/${listingId}/bids`,
      'POST',
      { amount: bidAmount }
    );

    return response;
  } catch (error) {
    console.error('Error placing bid:', error);
    throw error;
  }
}
