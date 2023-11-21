import { API_BASE_URL } from '../utilities/base-url.mjs';

export async function makeApiRequest(
  path,
  method,
  body = null,
  extraHeaders = {}
) {
  try {
    const options = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...extraHeaders,
      },
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
