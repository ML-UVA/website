'use server';

import axios from 'axios';

export async function fetchGoogleSheet(sheetId: string, range: string) {
  const apiKey = process.env.GCLOUD_API_KEY;
  if (!apiKey) {
    throw new Error('GCLOUD_API_KEY is not defined in your environment variables.');
  }
  const api_url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
  const response = await axios.get(api_url);
  return response.data;
}

export async function getGoogleMapsUrl(query: string) {
  const apiKey = process.env.GCLOUD_API_KEY;
  if (!apiKey) {
    console.warn('GCLOUD_API_KEY is not defined, maps will not work correctly.');
  }
  return `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(query)}`;
}
