import React from 'react';

const validateMessage = (message) => {
  return message.toString().length > 500 ? false : true;
};

export default validateMessage;
