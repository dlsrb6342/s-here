function getNow() {
  let today = new Date();
  let date = today.toJSON().slice(0,10).split('-').join('');
  let now = date + (today.getHours() * 2 + (today.getMinutes() >= 30 ? 1 : 2))
  return now;
}

export { getNow };
