import { getAccessToken } from '../storage/storage.mjs';
import { API_BASE_URL } from './constants.mjs';

export async function makeApiRequest(
  path,
  method,
  body = null,
  extraHeaders = {},
  query = {}
) {
  try {
    const token = getAccessToken();

    const { 'Content-Type': contentType = 'application/json' } = extraHeaders;
    const headers = {
      'Content-Type': contentType,
      ...extraHeaders,
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    const queryString = new URLSearchParams(query).toString();
    const fullUrl = `${API_BASE_URL}${path}${
      queryString ? `?${queryString}` : ''
    }`;

    const options = {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    };

    const response = await fetch(fullUrl, options);

    if (response.status === 401) {
      //If token has expired or is invalid
      handleTokenExpiration();
      return;
    }

    if (!response.ok) {
      const errorResponse = await response.json();

      // Handle 404 errors specifically for listings in case listing is deleted
      if (response.status === 404 && path.startsWith('listings/')) {
        console.log(`Listing not found at path: ${path}`);
        return null;
      }
      console.error('Api error response:', errorResponse);
      throw new Error(
        `${response.status}: ${
          errorResponse.errors?.[0]?.message || 'An error occurred'
        }`
      );
    }

    return await response.json();
  } catch (error) {
    console.error(`${method} request to ${path} failed:`, error);
    return { error: true, message: error.message };
  }
}

function handleTokenExpiration() {
  alert('Your session has expired. Please log in again');
  window.location.href = '/src/html/login-register';
}
