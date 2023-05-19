import express from 'express';
import fs from 'fs';

// -----------------------------------

const app = express();
const port = 3005;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('It`s working!');
})

// ------------------------------------

let todos = [];

app.get('/todos', async (req, res) => {
    try {
        res.json(todos);
    } catch (error) {
        console.error(error)
        res.status(500).send('Oh, what is happened?!');
    }
});

app.get('/todos/:id', async (req, res) => {
    const { id } = req.params;
    const todo = todos.find(todo => todo.id === id);

    if (!todo) {
        res.status(404).json({ error: 'Todo not found' });
    } else {
        res.json(todo);
    }
});


app.post('/todos', async (req, res) => {
    const data = await readFile('data.json');
    console.log(JSON.parse(data));
    let todosId = data.todos.length;
    todosId++;
    const newTodo = req.body;
    todos.push(newTodo);
    res.json(newTodo);
})

// ------------------------------------

app.listen(port, () => {
    console.log(`Here we go on port ${port}`);
})