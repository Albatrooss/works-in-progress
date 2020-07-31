const months = [null, 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export function convertDate(date) {
  let dateStr = new Date(date).toLocaleString();
  // return dateStr
  let half = dateStr.split(', ');
  let split = half[0].split('/')
  return `${months[split[0]]} ${split[1]}, ${split[2]}: ${half[1]}`
}

export function properNoun(name) {
  let arr = name.split(' ');
  let properArr = []
  arr.forEach(word => {
    let proper = word[0].toUpperCase();
    for (let i = 1; i < word.length; i++) {
      proper += word[i].toLowerCase();
    }
    properArr.push(proper);
  })
  return properArr.join(' ');
}

export default {
  convertDate
}