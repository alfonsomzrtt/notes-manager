import React, { useEffect, useState } from 'react';
import api from '../api';
import EditNote from './EditNote';

export default function NoteList({ refreshFlag }) {
    
    const [notes, setNotes] = useState([]);

    const getNotes = async () => {
        const res = await api.get("/notes");
        setNotes(res.data);
    };

    const deleteNote = async (id) => {
        await api.delete(`/notes/${id}`);
        getNotes();
    };

    useEffect(() => {
        getNotes();
    }, [refreshFlag]);

    return(
        <div>
          <h2>Notes</h2> 

          {
            notes.map(note => (
                <div key={note.id} style={{border: "1px solid #ccc", margin:"10px", padding:"10px"}}>

                    <h3>{note.title}</h3>
                    <p>{note.content}</p>

                    <EditNote note = {note} refresh = {getNotes}/>

                    <button onClick = {() => deleteNote(note.id)}>
                        Delete
                    </button>

                </div>
            ))}
        </div>
    );
}