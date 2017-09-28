function getNow() {
  let today = new Date();
  let month = today.getMonth() > 8 ? today.getMonth() + 1 : "0" + (today.getMonth() + 1)
  let date = "" + today.getFullYear() + month + today.getDate(); 
  let now = date + (today.getHours() * 2 + (today.getMinutes() >= 30 ? 1 : 0))
  return now;
}

export { getNow };
