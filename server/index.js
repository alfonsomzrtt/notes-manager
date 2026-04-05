import express from 'express';
import cors from 'cors';
import pool from './db.js';

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

/*CREATE NOTE */

app.post("/notes", async (req, res) => {
    try {
        const { title, content } = req.body;

        const newNote = await pool.query(
            "INSERT INTO notes (title, content) VALUES ($1, $2) RETURNING *",
            [title, content]
        );

        res.json(newNote.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

/* Getting all the notes*/
app.get("/notes", async (req, res) => {
  try {
    const allNotes = await pool.query("SELECT * FROM notes ORDER BY id DESC");

    res.json(allNotes.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get a single note
app.get("/notes/:id", async (req, res) => {
    try{
        const { id } = req.params;

        const note = await pool.query(
            "SELECT * FROM notes WHERE id = $1",
            [id]
        );
        res.json(note.rows[0]);
    }
    catch(err) {
        console.error(err.message);
    }
});

/* Update note*/
app.put("/notes/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        await pool.query("UPDATE notes SET title = $1, content = $2 WHERE id = $3", 
        [title, content, id]
        );

        res.json("Note updated");
    }
    catch(err) {
        console.error(err.message);
    }
});

/* deleting the notes*/
app.delete("/notes/:id", async (req, res) => {
    try {
        const { id } = req.params;
        
        await pool.query(
            "DELETE FROM notes WHERE id = $1",
            [id]
        );

        res.json("Note deleted");
    } catch(err) {
        console.error(err.message);
    }
});

app.listen(port,'0.0.0.0', () => {
    console.log("Server running on http://0.0.0.0:" + port);
})
