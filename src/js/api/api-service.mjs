import { getAccessToken } from '../storage/storage.mjs';
import { API_BASE_URL } from './constants.mjs';

/**
 * Reusable function that sends API request to specified path using the provided method, body, headers and query parameters.
 * Constructs the request headers, including access token if available.
 * Also handles specific response status 401 and 404. In case of error,
 * it logs the error and returns an object containing error details.
 *
 * @async
 * @function makeApiRequest
 * @param {string} path - Path of API endpoint.
 * @param {string} method - HTTP method to use for the request.
 * @param {Object|null} [body=null] - The body of the request.
 * @param {Object} [extraHeaders= {}] - Any additional headers.
 * @param {Object} [query={}] - Query parameters to be appended to the URL.
 * @returns {Promise<Object>} - Promise that resolves to response from API
 * as a JSON object. In case of error, returns object with flag and message.
 *
 * @throws {Error} - Throws error if response not valid, except for what is handled already.
 */
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
