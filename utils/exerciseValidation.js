const validate = ({description, duration, date}) => {
  let result = {};
  const regExpDescription = /^[a-z ,.'-]+$/i;

  if(!regExpDescription.test(description)) {
    result.status = 404;
    result.message = "Invalid description";
    return result;
  }

  if(!Number(duration)) {
    result.status = 404;
    result.message = "Invalid duration";
    return result;
  }

  if(date !== '') {
    if (new Date(date).toDateString() === 'Invalid Date') {
      result.status = 404;
      result.message = "Invalid date";
      return result;
    }
  }
  return result;
}

module.exports = validate;