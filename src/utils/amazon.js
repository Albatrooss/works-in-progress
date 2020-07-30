const BASE_URL = '/api/upload/';


const uploadAndCreateDanceClass = async (data) => {
  console.log(data)
  let formData = new FormData();
  formData.append('video', data.file);
  let response = await fetch(BASE_URL + 'class-video', {
    method: 'POST',
    body: formData
  });
  if (response.ok) {
    let video = await response.json();
    let dueDate = data.type === 'C' ? new Date(`${data.date} ${data.time}`) : null;
    let classResponse = await fetch('/api/classes/add', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({
        name: data.className,
        type: data.type,
        description: data.description,
        instructor: data.instructor,
        dueDate: dueDate,
        video: video.videoUrl
      })
    })
    if (classResponse.ok) {
      console.log('here')
      return classResponse.json();
    }
  }
  console.log('there')
  return response.json()
}

export default {
  uploadAndCreateDanceClass
}