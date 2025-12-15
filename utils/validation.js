const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidFullName = (fullName) => {
  return typeof fullName === "string" && fullName.trim().length > 0;
};
const isValidPassword = (password) => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  return typeof password === "string" && passwordRegex.test(password);
};

module.exports = { isValidEmail, isValidFullName, isValidPassword };
