import express from 'express';
import { engine } from 'express-handlebars';
import userRoutes from './server/routes/user.js';
import dotenv from 'dotenv';
dotenv.config();

import db from './db.js';

const app = express();

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

// view engine
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', './views');

//routes

app.use('/', userRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server is listening on ${PORT}`));
