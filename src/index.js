import bodyParser from 'body-parser'
import express from 'express'
import { routes } from './routes/routes.js' 
import { db } from './config/Db.config.js'
import { errorHandler } from './middleware/ErrorHandler.middleware.js'
import * as eventIndex from './events/index.js'
import dotenv from 'dotenv'

const app = express()

dotenv.config()
const PORT = process.env.PORT

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/uploads', express.static('uploads'));

routes(app);

app.use(errorHandler);

app.listen(PORT, () => { console.log(`Server started on port ${PORT} `) });
