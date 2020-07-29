const months = [null, 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export function convertDate(date) {
  console.log(date)
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

export default {
  convertDate
}