const months = [null, 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export function convertDate(date) {
  let dateStr = new Date(date).toLocaleString();
  // return dateStr
  let nice = {
    month: months[dateStr[0]],
    day: dateStr[2] + dateStr[3],
    year: dateStr[5] + dateStr[6] + dateStr[7] + dateStr[8],
    rest: dateStr.slice(11)
  }
  return `${nice.month} ${nice.day}, ${nice.year}: ${nice.rest}`
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