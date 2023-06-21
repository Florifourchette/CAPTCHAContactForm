import React from 'react';

const validateEmail = (email) => {
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  return email.match(validRegex) ? true : false;
};

export default validateEmail;
