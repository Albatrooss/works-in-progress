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

const uploadFromUser = async (file, userId) => {
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
  console.log('here')
  return response;
}

export default {
  uploadAndCreateDanceClass,
  uploadFromUser,
  checkUpload
}