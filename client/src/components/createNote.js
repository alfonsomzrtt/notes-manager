import React, { useState } from 'react';
import api from '../api';

export default function CreateNote({ refresh }) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();

        await api.post("/notes", { title, content });

        setTitle("");
        setContent("");
        refresh();
    };

    return (
        <form onSubmit={onSubmit}>
            <h2>Create Note</h2>

            <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Title"
            />

            <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Content"
            />

            <button type = "submit">Add</button>
        </form>
    );
}