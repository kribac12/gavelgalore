import { API_BASE_URL } from './constants.mjs';

export async function makeApiRequest(
  path,
  method,
  body = null,
  authToken = null,
  extraHeaders = {}
) {
  try {
    const headers = {
      'Content-Type': 'application/json',
      ...extraHeaders,
    };

    // Include authorization header if authToken is provided
    if (authToken) {
      headers['Authorization'] = `Bearer ${authToken}`;
    }

    const options = {
      method: method,
      headers: headers,
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_BASE_URL}${path}`, options);

    if (!response.ok) {
      const error = new Error(`HTTP error. Status: ${response.status}`);
      error.response = response;
      throw error;
    }

    return await response.json();
  } catch (error) {
    console.error(`${method} request to ${path} failed:`, error);
    throw error;
  }
}
