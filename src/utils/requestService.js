import tokenService from './tokenService';

const BASE_URL = '/api/requests/';

const createSongRequest = async (formData) => {
  try {
    let response = await fetch(BASE_URL + 'create', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(formData)
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(response.err);
    }
  } catch (err) {
    return err;
  }
}

const getAllSongsRequests = asyn() => {
  try {
    let response = await fetch(BASE_URL, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(response.err);
    }
  } catch (err) {
    return err;
  }
}

export default {
  createSongRequest,
  getAllSongsRequests
}