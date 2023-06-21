import React from 'react';

const validateMessage = (message) => {
  console.log(message.toString().length);
  return message.toString().length > 500 ? false : true;
};

export default validateMessage;
