const validate = (name) => {
  if (!name) {
    return false;
  }
  return users.find((person) => person.username === name);
}

module.exports = validate;