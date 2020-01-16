const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const todoRoutes = express.Router();
const sentiment = express.Router();

let Todo = require('./models/todo.model');

app.use(cors());
app.use(express.json({ extended: false }));

connectDB();

todoRoutes.route('/').get(function(req, res) {
  Todo.find(function(err, todos) {
    if (err) {
      console.log(err);
    } else {
      res.json(todos);
    }
  });
});

todoRoutes.route('/:id').get(function(req, res) {
  let id = req.params.id;
  Todo.findById(id, function(err, todo) {
    res.json(todo);
  });
});

todoRoutes.route('/add').post(function(req, res) {
  let todo = new Todo(req.body);
  todo
    .save()
    .then(todo => {
      res.status(200).json({ todo: 'todo added successfully' });
    })
    .catch(err => {
      res.status(400).send('adding new todo failed');
    });
});

todoRoutes.route('/update/:id').post(function(req, res) {
  Todo.findById(req.params.id, function(err, todo) {
    if (!todo) res.status(404).send('data is not found');
    else todo.todo_description = req.body.todo_description;
    todo.todo_responsible = req.body.todo_responsible;
    todo.todo_priority = req.body.todo_priority;
    todo.todo_completed = req.body.todo_completed;

    todo
      .save()
      .then(todo => {
        res.status(200).json({ todo: 'Todo updated!' });
      })
      .catch(err => {
        res.status(400).send('Update not possible');
      });
  });
});

sentiment.route('/search_mask_sentiment_analysis').get(function(req, res) {
  // let search = req.body;
  //  console.log(search);
  res.send('you are in search mask');
  //  res.json('you are in search mask' + ` your query is: ${req.body}`);
});

//define the Routes

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/sentiment_analysis', require('./routes/api/sentiment_analysis'));

app.use('/', sentiment);
app.use('/todos', todoRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, function() {
  console.log(`Server is running on Port:  ${PORT}`);
});
