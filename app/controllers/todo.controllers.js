const Todo = require('../models/todo.model.js');

//Create and Save a new Todo
exports.create = (req, res) => {
    //Validate request
    if (!req.body.description) { //Description cannot be empty
        return res.status(400).send({
            message: "Todo description can not be empty"
        })
    }

    //Create a Todo
    const todo = new Todo({
        name: req.body.name || "Untitled Todo",
        description: req.body.description
    })

    //Save Todo in the database
    todo.save()
        .then(data => {
            res.send(data)
        }).catch(error => {
            res.status(500).send({
                message: error.message || "Some error occurred while creating the Todo."
            })
        })
}

//Retreive all Todos
exports.findAll = (req, res) => {
    Todo.find()
        .then(todos => {
            res.send(todos)
        }).catch(error => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving todos."
            })
        })
}

//Retreive one Todo by Id
exports.findOne = (req, res) => {
    Todo.findById(req.params.id)
        .then(todo => {
            if (!todo) {
                return res.status(404).send({
                    message: "Todo not found with id " + req.params.id
                })
            }
            res.send(todo)
        }).catch(error => {
            if (error.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Todo not found with id " + req.params.id
                })
            }

            return res.status(500).send({
                message: "Error retrieving todo with id " + req.params.id
            })
        })
}

//Update Todo by Id
exports.update = (req, res) => {
    if (!req.body.description) {
        return res.status(400).send({
            message: "Todo description can not be empty"
        })
    }

    Todo.findByIdAndUpdate(req.params.id, {
        title: req.body.name || "Untitled Todo",
        description: req.body.description
    }, { new: true })
        .then(todo => {
            if (!todo) {
                return res.status(400).send({
                    message: "Todo not found with id " + req.params.id
                })
            }
            return res.send(todo)
        }).catch(error => {
            if (error.kind === 'ObjectId') {
                return res.status(400).send({
                    message: "Todo not found with id " + req.params.id
                })
            }
            return res.status(500).send({
                message: "Error updating todo with id " + req.params.id
            })

        })
}

//Delete Todo by Id
exports.delete = (req, res) => {
    Todo.findByIdAndRemove(req.params.id)
        .then(todo => {
            if (!todo) {
                return res.status(404).send({
                    message: "Todo not found with id " + req.params.id
                })
            }
            res.send({ message: "Todo deleted successfully!" })
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Todo not found with id " + req.params.todo
                });
            }
            return res.status(500).send({
                message: "Could not delete todo with id " + req.params.id
            })
        })
}