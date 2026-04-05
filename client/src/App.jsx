import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const API = "/api";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);


  //To clear up the form
  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setContent("");
  };


  //GET all notes
  const getNotes = async () => {
    try {
      const res = await axios.get(`${API}/notes`);
      setNotes(res.data);
    } catch (err) {
      toast.error("Failed to fetch notes❌");
    }
  };

  //CREATE a note
  const createNote = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error("Fill all fields✍️");
      return;
    }
    try{
          await axios.post(`${API}/notes`, { title, content });
          toast.success("Note created ✔️");
          setTitle("");
          setContent("");
          getNotes();
    } catch(err) {
      toast.error("Error creating note");
    }
  };

  const updateNote = async () => {
    try{
      await axios.put(`${API}/notes/${editingId}`, {
        title,
        content,
      });
      toast.success("Note updated ✏️");
      resetForm();
      getNotes();
  
      setEditingId(null);
      setTitle("");
      setContent("");
    } catch(err) {
      toast.error("Update failed");
    }
  };

  //DELETE note
  const deleteNote = async (id) => {
    if(!window.confirm("Are you sure?")) return;
    try{
      await axios.delete(`${API}/notes/${id}`);
      toast.success("Note deleted 🗑️");
      getNotes();
    } catch(err) {
      toast.error("Delete failed");
    }
  };


  const startEdit = (note) => {
    setEditingId(note.id);
    setTitle(note.title);
    setContent(note.content);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div style={styles.container}>
      <Toaster position="top-right" />

      <h1 style={styles.title}>📝 Notes Manager</h1>
      <h3 style={styles.title}>Alfonso Mayzart</h3>
      
      <div style={styles.form}>
        <input
          style={styles.input}
          placeholder="Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          style={styles.textarea}
          placeholder="Write your note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div style={{ display: "flex", gap: "10px" }}>
          {editingId ? (
            <>
              <button style={{...styles.updateBtn, flex: 2}} onClick={updateNote}>
                Update Note
              </button>
              <button style={{...styles.cancelBtn, flex: 1}} onClick={resetForm}>
                Cancel
              </button>
            </>
          ) : (
            <button style={styles.addBtn} onClick={createNote}>
              + Add Note
            </button>
          )}
        </div>
      </div>


      <div style={styles.notesGrid}>
        {notes.map((note) => (
          <div key={note.id} style={styles.card}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>

            <div style={styles.actions}>
              <button
                style={styles.editBtn}
                onClick={() => startEdit(note)}
              >
                Edit
              </button>

              <button
                style={styles.deleteBtn}
                onClick={() => deleteNote(note.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "900px",
    margin: "auto",
    padding: "20px",
    fontFamily: "'Courier New', Courier, monospace",  },

  title: {
    textAlign: "center",
    marginBottom: "20px",
    fontFamily:"inherit",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "30px",
  },

  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid",
    fontFamily: "inherit",
  },

  textarea: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid",
    minHeight: "80px",
    fontFamily: "inherit",
    // backgroundColor:"#3b3b3b",
  },

  addBtn: {
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontFamily: "inherit",
  },

  updateBtn: {
    padding: "10px",
    backgroundColor: "#2196F3",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontFamily: "inherit",
  },

  cancelBtn: {
    padding: "12px",
    backgroundColor: "#eee",
    color: "#000",
    border: "2px solid #000",
    borderRadius: "4px",
    cursor: "pointer",
    fontFamily: "inherit",
  },

  notesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "15px",
  },

  card: {
    border: "2px solid #ddd",
    borderRadius: "8px",
    padding: "15px",
    backgroundColor: "#",
    boxShadow: "4px 4px 0px #000", // Hard shadow like their buttonsShadow: "0 2px 5px rgba(0,0,0,0.1)",

    wordBreak: "break-word",
    overflowWrap: "anywhere",
    
    flexDirection: "column",
    justifyContent: "space-between",
  },

  actions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
    gap: "10px",
  },

  editBtn: {
    backgroundColor: "#ffc107",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
    fontFamily:"inherit",
    fontWeight: "bold",
    flex: 1,
  },

  deleteBtn: {
    backgroundColor: "#f44336",
    color: "black",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
    fontFamily:"inherit",
    fontWeight: "bold",
    flex: 1,
  },
};