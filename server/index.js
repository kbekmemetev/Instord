require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors')
const router = require('./routers/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')
const fileUpload = require('express-fileupload')

 
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use(`/api`, router)

app.use(errorHandler)

app.listen(process.env.PORT, () => {
    console.log(`server is listening on ${process.env.PORT}`)
});




