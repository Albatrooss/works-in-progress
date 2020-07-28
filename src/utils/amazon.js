const BASE_URL = '/api/upload/';


const uploadAndCreateDanceClass = async (data) => {
  const formData = new FormData();
  formData.append('image', data.file)
  let response = await fetch(BASE_URL + 'class-video', {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'multipart/form-data' }),
    body: formData
  });
  if (response.ok) {
    let img = response.imageUrl;
    let classResponse = await fetch('/api/classes/add', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: {
        name: data.name,
        dueDate: data.dueDate,
        img
      }
    })
    if (classResponse.ok) {
      return classResponse.json();
    }
  }
}

export default {
  uploadAndCreateDanceClass
}