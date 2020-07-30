import tokenService from './tokenService';

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
const getAllAdmin = async () => {
  try {
    let response = await fetch(BASE_URL + 'admin', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      'Authorization': 'Bearer ' + tokenService.getToken(),
    })
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(response.err)
    }
  } catch (err) {
    return err
  }
}

const getClasses = async () => {
  try {
    let response = await fetch(BASE_URL + 'classes', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
    })
    return await response.json();
  } catch (err) {
    return err
  }
}

const getCollabs = async () => {
  try {
    let response = await fetch(BASE_URL + 'collabs', {
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

const getMine = async () => {
  let user = tokenService.getUserFromToken();
  if (!user) throw new Error('How did you get here? You\'re not logged in!')
  try {
    let response = await fetch(BASE_URL + 'my-classes', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ id: user._id })
    })
    if (response.ok) return await response.json();
    let message = await response.json();
    console.log(message)
    throw new Error(message.message);
  } catch (err) {
    throw new Error(err.message)
  }
}

const updateOne = async (formData, clssId) => {
  let body = {
    name: formData.className ? formData.className : clssId.name,
    instructor: formData.instructor ? formData.instructor : clssId.instructor,
    description: formData.description ? formData.description : clssId.description,
    type: formData.type ? formData.type : clssId.type,
    name: formData.className ? formData.className : clssId.name,
  }
  try {
    let response = await fetch(BASE_URL + 'update/' + clssId, {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(formData)
    })
    return await response.json();
  } catch (err) {
    throw new Error(err.message);
  }
}

export default {
  getAll,
  getAllAdmin,
  getClasses,
  getCollabs,
  getOne,
  enroll,
  getMine,
  updateOne
}