'use strict';

const express = require('express');
const router = express.Router();
const couch = require('./db.js');

require('dotenv').config();

const dbName = process.env.DB_NAME;
const viewUrl = process.env.VIEW_URL

router.get('/', (req, res) => {
  couch.get(dbName, viewUrl).then(
      (data, headers, status) => res.render('index', { todos: data.data.rows }),
      err => res.send(err)
)
});

router.post('/todo/add', (req, res) => {
    const business = req.body.business;
    const date = req.body.date.split('-');

    couch.uniqid().then(ids => {
        const id = ids[0];

        couch.insert(dbName, {
            _id: id,
            business: business,
            deadline: {
                year: date[0],
                month: date[1],
                day_of_month: date[2]
            }
        }).then(
            (data, headers, status) => res.redirect('/'),
            err => res.send(err)
        );
    });
});

router.post('/todo/delete/:id', (req, res) => {
    const id = req.params.id;
    const rev = req.body.rev;

    couch.del(dbName, id, rev).then(
        (data, headers, status) => res.redirect('/'),
        err => res.send(err)
    );
});

module.exports = router;