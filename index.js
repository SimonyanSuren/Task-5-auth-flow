const express = require('express');
const routesUsers = require('./routes/users.route');
const routeRegister = require('./routes/register.route')
const routeLogin = require('./routes/login.route')
const notFoundMiddleware = require('./middleware/not-found.middleware');
const errorHandlerMiddleware = require('./middleware/error-handler.middleware');


const client = require('./db/connect');


const app = express();

app.use(express.json());
app.use(routesUsers);
app.use(routeLogin)
app.use(routeRegister)
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const port = process.env.PORT;

client.connect().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on: ${port}`);
  });
}).catch(err => {
	console.log(err); 
})

process.on('exit', () => {
  client.end();
});
   