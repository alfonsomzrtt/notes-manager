import React, {useState} from 'react';
import api from '../api';

export default function EditNote({ note, refresh }) {
    
    const [ title, setTitle] = useState(note.title);
    const [ content, setContent] = useState(note.content);

    const updateNote = async () => {

        await api.put(`/note${note.id}`, {
            title,
            content
        });
        refresh;
    };

    return(
        <div>

            <input
                value = {title}
                onChange = {e => setTitle(e.target.value)}
            />

            <input
                value={content}
                onChange={e => setContent(e.target.value)}
            />

            <button onClick={updateNote}>
                Update
            </button>

        </div>
    );
}