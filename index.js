const express = require('express');
const usersRouter = require('./routes/users.route');
const authRouter = require('./routes/auth.route');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler.middleware');

const client = require('./db/connect');

const app = express();

app.use(express.json());
app.use(authRouter);
app.use(usersRouter);
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT;

client
  .connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on: ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

process.on('exit', () => {
  client.end();
});
