// const express = require('express');
import express from 'express';
import configViewEngine from './configs/viewEngine';
import webRouter from './routes/web';
import connection from './configs/connectDB';

const app = express();
const port = 8080;

app.use(express.urlencoded({ extended: true, }),);
app.use(express.json());

//config view engine
configViewEngine(app);

//init webRouter
webRouter(app);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});