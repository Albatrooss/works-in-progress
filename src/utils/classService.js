const BASE_URL = '/api/classes/';

const getAll = async () => {
  try {
    let response = await fetch(BASE_URL, {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
    })
    return await response.json();
  } catch (err) {
    return err
  }
}

const getOne = async (id) => {
  try {
    let response = await fetch(BASE_URL + id, {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });
    return await response.json();
  } catch (err) {
    return err
  }
}

const enroll = async (clssId, userId) => {
  console.log(userId, clssId)
  try {
    let response = await fetch(BASE_URL + `enroll/${clssId}`, {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ id: userId })
    });
    return await response.json();
  } catch (err) {
    return err
  }
}

export default {
  getAll,
  getOne,
  enroll
}