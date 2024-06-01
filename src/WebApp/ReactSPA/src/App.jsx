import { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [meet, setMeet] = useState();

    useEffect(() => {
        getMeet();
    }, []);

    const contents = meet === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <div>{meet.name}</div>;

    return (
        <div>
            <h1 id="tabelLabel">Weather forecast3</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
        </div>
    );
    
    async function getMeet() {
        const response = await fetch('api/meet/1');
        const data = await response.json();
        setMeet(data);
    }
}

export default App;