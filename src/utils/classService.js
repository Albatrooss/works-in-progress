import tokenService from './tokenService';

const BASE_URL = '/api/classes/';

const getAll = async () => {
  try {
    let response = await fetch(BASE_URL, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
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
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
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
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
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
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    })
    return await response.json();
  } catch (err) {
    return err
  }
}

const getMoveBDs = async () => {
  try {
    let response = await fetch(BASE_URL + 'move-bds', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
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
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    });
    return await response.json();
  } catch (err) {
    return err
  }
}

const getOneAdmin = async id => {
  try {
    let response = await fetch(BASE_URL + 'admin/' + id, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    });
    return await response.json();
  } catch (err) {
    return err
  }
}

const enroll = async (clssId, userId) => {
  try {
    let response = await fetch(BASE_URL + `enroll/${clssId}`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        id: userId
      })
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
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        id: user._id
      })
    })
    if (response.ok) return await response.json();
    let message = await response.json();
    throw new Error(message.message);
  } catch (err) {
    throw new Error(err.message)
  }
}

const unEnroll = async (clss, userId) => {
  try {
    let response = await fetch(BASE_URL + 'unenroll/' + clss._id, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        id: userId
      })
    })
    if (response.ok) {
      return await response.json()
    } else {
      throw new Error('Something went wrong..')
    }
  } catch (err) {
    return err
  }
}

// const updateOne = async (formData, clssId) => {
//   let body = {
//     name: formData.className ? formData.className : clssId.name,
//     instructor: formData.instructor ? formData.instructor : clssId.instructor,
//     description: formData.description ? formData.description : clssId.description,
//     type: formData.type ? formData.type : clssId.type,
//     name: formData.className ? formData.className : clssId.name,
//   }
//   try {
//     let response = await fetch(BASE_URL + 'update/' + clssId, {
//       method: 'POST',
//       headers: new Headers({ 'Content-Type': 'application/json' }),
//       body: JSON.stringify(formData)
//     })
//     return await response.json();
//   } catch (err) {
//     throw new Error(err.message);
//   }
// }

const getOneLive = async id => {
  const token = tokenService.getToken();
  try {
    let response = await fetch(BASE_URL + 'admin/live/' + id, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      'Authorization': 'Bearer: ' + token
    })
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(response.err);
    }
  } catch (err) {
    return err;
  }
}

const getAllLive = async () => {
  const token = tokenService.getToken();
  try {
    let response = await fetch(BASE_URL + 'admin/live/', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      'Authorization': 'Bearer: ' + token
    })
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(response.err);
    }
  } catch (err) {
    return err;
  }
}

const enrollLive = async id => {
  const token = tokenService.getToken();
  const userId = tokenService.getUserFromToken()._id;

  try {
    let response = await fetch(BASE_URL + 'live/enroll/' + id, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        id: userId
      })
    })
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(response.err);
    }
  } catch (err) {
    return err;
  }
}

const deleteOne = async id => {
  try {
    let response = await fetch(BASE_URL + 'delete/' + id, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    if (response.ok) {
      return response;
    } else {
      throw new Error(response.err);
    }
  } catch (err) {
    return err;
  }
}

export default {
  getAll,
  getAllAdmin,
  getClasses,
  getCollabs,
  getMoveBDs,
  getOne,
  getOneAdmin,
  enroll,
  unEnroll,
  enrollLive,
  getMine,
  getOneLive,
  getAllLive,
  // updateOne
  deleteOne
}