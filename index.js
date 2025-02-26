const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let manga = [
    { id: 1, title: "One Piece", author: "Eiichiro Oda", price: 9.99, stock: 15 },
    { id: 2, title: "Attack on Titan", author: "Hajime Isayama", price: 12.99, stock: 8 },
    { id: 3, title: "Naruto", author: "Masashi Kishimoto", price: 10.99, stock: 12 },
    { id: 4, title: "Death Note", author: "Tsugumi Ohba", price: 11.99, stock: 10 },
    { id: 5, title: "Demon Slayer", author: "Koyoharu Gotouge", price: 13.99, stock: 7 }
];

app.get("/manga", (req, res) => {
    res.json(manga);
});

app.get("/manga/:id", (req, res) => {
    const selectedManga = manga.find(m => m.id === parseInt(req.params.id));
    selectedManga ? res.json(selectedManga) : res.status(404).json({ message: "Manga not found" });
});

app.post("/manga", (req, res) => {
    const newManga = { id: manga.length + 1, ...req.body };
    manga.push(newManga);
    res.status(201).json(newManga);
});

app.put("/manga/:id", (req, res) => {
    const selectedManga = manga.find(m => m.id === parseInt(req.params.id));
    if (selectedManga) {
        Object.assign(selectedManga, req.body);
        res.json(selectedManga);
    } else {
        res.status(404).json({ message: "Manga not found" });
    }
});

app.delete("/manga/:id", (req, res) => {
    manga = manga.filter(m => m.id !== parseInt(req.params.id));
    res.json({ message: "Manga deleted" });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
