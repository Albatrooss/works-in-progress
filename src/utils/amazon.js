const BASE_URL = '/api/upload/';


const uploadAndCreateDanceClass = async (data) => {
  let formData = new FormData();
  formData.append('video', data.file);
  let response = await fetch(BASE_URL + 'class-video', {
    method: 'POST',
    body: formData
  });
  if (response.ok) {
    let video = await response.json();
    let classResponse = await fetch('/api/classes/add', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({
        name: data.className,
        description: data.description,
        instructor: data.instructor,
        dueDate: new Date(data.dueDate),
        video: video.videoUrl
      })
    })
    if (classResponse.ok) {
      return classResponse.json();
    }
  }
  return response.json()
}

export default {
  uploadAndCreateDanceClass
}