import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';

// mongo initialization
dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const dbCollections = ['characters', 'planets', 'films', 
    'films_characters', 'films_planets']

const app = express();
// Middleware to parse JSON bodies
app.use(express.json());
const PORT = 3000;

app.get('/api/characters', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(dbCollections[0]);
        const chars = await collection.find({}).toArray();
        res.json(chars);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("No characters received");
    }
})

app.get('/api/films', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(dbCollections[2]);
        const films = await collection.find({}).toArray();
        res.json(films);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("No films received");
    }
})

app.get('/api/planets', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(dbCollections[1]);
        const planets = await collection.find({}).toArray();
        res.json(planets);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("No planets received");
    }
})

app.get('/api/characters/:id', async (req, res) => {
    try {
        const { id } = req.params
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(dbCollections[0]);
        const chars = await collection.findOne({"id": +id});
        res.json(chars);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Character not found");
    }
})

app.get('/api/films/:id', async (req, res) => {
    try {
        const { id } = req.params
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(dbCollections[2]);
        const films = await collection.findOne({"id": +id});
        res.json(films);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Film not found");
    }
})

app.get('/api/planets/:id', async (req, res) => {
    try {
        const { id } = req.params
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(dbCollections[1]);
        const planets = await collection.findOne({"id": +id});
        res.json(planets);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Planet not found");
    }
})

app.get('/api/films/:id/characters', async (req, res) => {
    // get all characters associated with a certain film id
    try {
        const { id } = req.params
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        let collection = db.collection(dbCollections[3]);
        const filmAndChar = await collection.find({'film_id': +id}).toArray();
        const char_ids = filmAndChar.map(x => x.character_id)
        collection = db.collection(dbCollections[0]); // swap to character collection
        const chars = await collection.find({'id': {$in: char_ids}}).toArray();
        res.json(chars)
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Cannot find any characters associated with film");
    }
})

app.get('/api/films/:id/planets', async (req, res) => {
    // get all planets associated with a certain film id
    try {
        const { id } = req.params
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        let collection = db.collection(dbCollections[4]);
        const filmAndPlanet = await collection.find({'film_id': +id}).toArray();
        const planet_ids = filmAndPlanet.map(x => x.planet_id)
        collection = db.collection(dbCollections[1]); // swap to planet collection
        const planets = await collection.find({'id': {$in: planet_ids}}).toArray();
        res.json(planets)
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Cannot find any planets associated with film");
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});