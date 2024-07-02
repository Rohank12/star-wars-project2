import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';

// mongo initialization
dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
// we have different collections so a base one won't work

const app = express();
// Middleware to parse JSON bodies
app.use(express.json());
const PORT = 3000;

app.get('/api/characters', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection("characters");
        const chars = await collection.find({}).toArray();
        res.json(chars);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("No characters received");
    }
})

app.get('/api/planets', async (req, res) => {
    res.json({name: "Hello"})
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});