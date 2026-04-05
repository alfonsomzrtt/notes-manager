import React, { useState } from 'react';
import CreateNote from './components/createNote';
import NoteList from './components/NoteList';

function App() {
    const [refreshFlag, setRefreshFlag] = useState(false);

    const refresh  = () => {
        setRefreshFlag(!refreshFlag);
    };

    return (
        <div style = {{width:"600px", margin:"auto"}}>
            <h1>Notes Manager</h1>

            <CreateNote refresh = {refresh} />
            <NoteList refreshFlag = {refreshFlag} />
        </div>
    );
}

export default App;