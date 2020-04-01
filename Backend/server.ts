import { Request, Response } from "express";

const fs = require('fs');
const bodyParser = require('body-parser');
const express = require('express');
const { Pool, Client } = require('pg');
const cors = require('cors');

const app = express();
const pool = new Pool({
    user: 'user1',
    host: 'localhost',
    database: 'employeedetails',
    password: 'pass',
    port: 5432,
})

let port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.listen(port, (err: Error) => {
    if (err)
        console.log("Error");
    else
        console.log("Listening from port 3000")
});

app.use(function (err: any, req: Request, res: Response, next: Function) {
    res.status(err.code).json({ 'message': err.message });
})

//Get data from database
app.get('/api/employees', (req: Request, res: Response, next: Function) => {

    pool.query('select u.id,u.firstname as "firstName", u.middlename as "middleName", u.lastname as "lastName", u.email, u.phone, r.name as role, u.address, c.name as customer from (user_details as u inner join roles as r on u.role_id = r.role_id ) inner join customer as c  on u.c_id = c.c_id order by u.id asc')
        .then(
            (result: any) => {
                res.status(200).json(result.rows);
            })
        .catch(next)

})

//Gets list of customers
app.get('/api/customers', (req: Request, res: Response, next: Function) => {

    pool.query('select c_id,name from customer')
        .then((result: any) => {
            console.log(result.rows);
            res.status(200).json(result.rows);
        })
        .catch(next);
})

//Gets roles
app.get('/api/roles', (req: Request, res: Response, next: Function) => {

    pool.query('select role_id,name from roles')
        .then((result: any) => {
            console.log(result.rows);
            res.status(200).json(result.rows);
        })
        .catch(next);
})

//Updates data
app.put('/api/employees/:id', (req: Request, res: Response, next: Function) => {

    const text = 'UPDATE user_details SET firstname=$1, middlename=$2, lastname=$3, email=$4, phone=$5, role_id=$6, address = $7, c_id=$8 where id= $9';

    const values = [req.body.firstName, req.body.middleName, req.body.lastName, req.body.email, req.body.phone, parseInt(req.body.role), req.body.address, parseInt(req.body.customer), req.params.id];

    pool.query(text, values)
        .then((result: any) => {
            console.log(typeof result);
            res.status(200).send()
        })
        .catch(next);
})


//Deletes data 
app.delete('/api/employees/:id', (req: Request, res: Response, next: Function) => {

    pool.query('DELETE FROM user_details where id=$1', [req.params.id])
        .then((result: any) => {
            console.log(result)
            res.status(200).send()
        }
        )
        .catch(next);
})

//Creates new Entry
app.post('/api/employees', (req: Request, res: Response, next: Function) => {

    console.log("inside post");
    const text = 'INSERT INTO user_details(firstname,middlename,lastname,email,phone,role_id,address,c_id) VALUES($1,$2,$3,$4,$5,$6,$7,$8) returning id;';

    const values = [req.body.firstName, req.body.middleName, req.body.lastName, req.body.email, req.body.phone, parseInt(req.body.role), req.body.address, parseInt(req.body.customer)];

    pool.query(text, values)
        .then((result: any) => {
            console.log(result.rows[0]);
            res.status(200).json(result.rows[0]);
        })
        .catch(next);
})

