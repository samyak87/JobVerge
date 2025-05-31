// error middleare to handle errors || next function

const errorMiddleware = (err, req, res, next) => {
  console.error(err); 

  // Set the response status code and send a JSON response with the error message
  res.status(500).send({
    success: false,
    message: 'Internal Server Error',
    err
  });
}

export default errorMiddleware;