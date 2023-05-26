
import express from 'express';
import cors from 'cors';
import { FileHandler } from "./Model.js";

// -----------------------------------


const app = express();
const port = 3004;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('It`s working!');
});


const path = './data/todos.json';

// ---- MODEL -------------------------


const TodosModel = await FileHandler(
    new URL(path, (import.meta.url))
);

// ---- GET ~/todos -------------------


app.get('/todos', async (req, res) => {
    const data = TodosModel.getData();
    res.send(data);
});


// ---- GET ~/todos/:id ---------------


app.get('/todos/:id', (req, res) => {
    const id = req.params.id;
    const data = TodosModel.getOne(id);
    res.send(data);
});


// ---- POST ~/todos ------------------


app.post('/todos', (req, res) => {
    const data = req.body;
    TodosModel.addDataEntry(data);
    // console.log(data);
    res.send(data);
})


// ----- PUT ~/todos/:id --------------


app.put('/todos/:id', (req, res) => {
    const updateData = req.body;
    const id = req.params.id;
    const result = TodosModel.updateOne(id, updateData);
    console.log(result);
    res.send(result);
});


// ----- DELETE ~/todos/:id -----------


app.delete('/todos/:id', (req, res) => {
    const id = req.params.id;
    TodosModel.deleteOne(id);
    res.send("Deleted");
})


// -------------------


app.listen(port, () => {
    console.log(`Here we go on port ${port}`);
})

