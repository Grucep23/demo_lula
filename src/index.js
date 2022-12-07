// const express = require('express')
import express from 'express'
import configViewEngine from './configs/viewEngine'

const app = express();
const port = 8080;

configViewEngine(app);
app.get('/haha', (req, res) => {
    res.render('home')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})