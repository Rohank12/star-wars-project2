import express from 'express';

const app = express();
// Middleware to parse JSON bodies
app.use(express.json());
const PORT = 3000;

app.get('/api/planets', async (req, res) => {
    res.json({name: "Hello"})
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});