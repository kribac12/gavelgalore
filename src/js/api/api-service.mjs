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

    const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};
    const token = userInfo.accessToken;
    console.log('Token: ', token);

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
      const errorResponse = await response.json();
      console.error('API error response:', errorResponse);
      throw new Error(
        errorResponse.errors?.[0]?.message || 'An error occurred'
      );
    }

    return await response.json();
  } catch (error) {
    console.error(`${method} request to ${path} failed:`, error);
    return { error: true, message: error.message };
  }
}
