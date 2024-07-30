const app = require('./app');
const dotenv = require('dotenv');
const DbConnection = require('./config/mogoose.connection');

//Environment variables
dotenv.config({
    path: './.env'
});

//Database Connection
DbConnection()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server is running at port : ${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log(err);
        process.exit(1);
    });