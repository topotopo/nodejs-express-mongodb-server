
module.exports = (app) => {

    const todos = require('../controllers/todo.controllers.js')
    //Create a new Todo
    app.post('/todos', todos.create)

    //Retrieve all Todos
    app.get('/todos', todos.findAll)

    //Retrieve a Todo by id
    app.get('/todos/:id', todos.findOne)

    //Update a Todo with id
    app.put('/todos/:id', todos.update)

    //Delete a Todo by id
    app.delete('/todos/:id', todos.delete)
}