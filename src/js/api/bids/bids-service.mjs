import { makeApiRequest } from '../api-service.mjs';

export async function placeBid(listingId, bidAmount) {
  console.log(`Placing bid: ${bidAmount} on listing ${listingId}`);
  try {
    const response = await makeApiRequest(
      `listings/${listingId}/bids`,
      'POST',
      { amount: bidAmount }
    );
    console.log('Bid placed successfully', response);
    return response;
  } catch (error) {
    console.error('Error placing bid:', error);
    throw error;
  }
}
