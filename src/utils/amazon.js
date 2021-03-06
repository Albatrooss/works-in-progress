import tokenServices from './tokenService';

const BASE_URL = '/api/upload/';

const uploadAndCreateDanceClass = async (data) => {
  let response = await uploadToAmazon(data.file, 'class-video');
  if (response.ok) {
    let video = await response.json();
    let dueDate = data.type === 'C' ? new Date(`${data.date} ${data.time}`) : null;
    let classResponse = await fetch('/api/classes/add', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      'Authorization': 'Bearer ' + tokenServices.getToken(),
      body: JSON.stringify({
        name: data.className,
        type: data.type,
        description: data.description,
        instructor: data.instructor,
        dueDate: dueDate,
        video: video.videoUrl,
        icon: data.icon
      })
    })
    if (classResponse.ok) {
      console.log('here')
      return classResponse.json();
    } else {
      return classResponse.json();
    }
  }
  return response.json()
}

const createLiveClass = async (data) => {
  try {
    let classResponse = await fetch('/api/classes/admin/live/add', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      'Authorization': 'Bearer ' + tokenServices.getToken(),
      body: JSON.stringify(data)
    })
    if (classResponse.ok) {
      return classResponse.json();
    } else {
      return classResponse.json();
    }
  } catch (err) {
    return err;
  }
}

const uploadFromUser = async (file, userId, classId) => {
  let response = await uploadToAmazon(file, 'user-upload');
  if (response.ok) {
    let video = response.json();
    let vidResponse = await fetch('/api/upload/user-save', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      'Authorization': 'Bearer ' + tokenServices.getToken(),
      body: JSON.stringify({
        user: userId,
        class: classId,
        file: video.videoUrl
      })
    });
    if (vidResponse.ok) {
      return vidResponse.json();
    } else {
      return vidResponse.json();
    }
  }
  return response.json
}

async function uploadToAmazon(file, where) {
  let formData = new FormData();
  formData.append('video', file);
  let response = await fetch(BASE_URL + where, {
    method: 'POST',
    body: formData
  });
  return response
}

const checkUpload = async (classId) => {
  let userId = tokenServices.getUserFromToken()._id;
  try {
    let response = await fetch(BASE_URL + 'check', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      'Authorization': 'Bearer ' + tokenServices.getToken(),
      body: JSON.stringify({
        user: userId,
        class: classId
      })
    });
    let resJSON = await response.json()
    if (resJSON.uploaded) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
}

export default {
  uploadAndCreateDanceClass,
  createLiveClass,
  uploadFromUser,
  checkUpload
}