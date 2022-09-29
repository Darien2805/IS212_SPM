import express from "express";

const mysql = require('mysql')
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"spm" 
})

module.exports = db;