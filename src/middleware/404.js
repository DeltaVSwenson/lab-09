'use strict';


// eslint-disable-next-line no-unused-vars
module.exports = (req,res,next) => {
  let error = { error: 'Resource Not Found' };
  res.status(404).json(error).end();
};
