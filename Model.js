
import fs from 'node:fs/promises';
import { uuidv4 } from 'uuid';

// ----------------------------------

export const Filehandler = async (path) => {
    let data = await fs.readFile(path);
    data = JSON.parse(data);


    const getData = () => {
        return Object.values(data);
    }

    const getOne = (id) => {
        return data[id];
    }

    const addDataEntry = async (dataEntry) => {
        const newID = uuidv4();
        dataEntry.id = newID;
        data[newID] = dataEntry;
        fs.writeFile(path, JSON.stringify(data));
    }

    const deleteOne = (id) => {
        delete data[id];
        fs.writeFile(path, JSON.stringify(data));
    }

    const updateOne = (id, updateData) => {
        const updateTarget = data[id];
        const updatedData = { ...updateTarget, ...updateData };
        data[id] = updatedData;

        fs.writeFile(path, JSON.stringify(data));
        return updatedData;
    };

    return {
        getData,
        getOne,
        addDataEntry,
        deleteOne,
        updateOne
    };
};