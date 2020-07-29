const BASE_URL = '/api/classes/';

const getAll = async () => {
  try {
    let response = await fetch(BASE_URL, {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
    })
    return await response.json();
  } catch (err) {
    return await err
  }

}

export default {
  getAll
}