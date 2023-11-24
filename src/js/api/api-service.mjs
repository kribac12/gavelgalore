import { API_BASE_URL } from './constants.mjs';

export async function makeApiRequest(
  path,
  method,
  body = null,
  extraHeaders = {},
  query = {}
) {
  try {
    const { 'Content-Type': contentType = 'application/json' } = extraHeaders;
    const token = localStorage.getItem('accessToken');

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

    if (!response.ok) {
      if (response.status === 401) {
        const error = await response.json();
        throw new Error(error.message || 'No access.');
      }
      throw new Error(`HTTP error. Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`${method} request to ${path} failed:`, error);
    return { error: true, message: error.message };
  }
}
