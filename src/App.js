import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [numPeople, setNumPeople] = useState('');
    const [cards, setCards] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleNumPeopleChange = (e) => {
        setNumPeople(e.target.value);
        setErrorMessage('');
    };

    const distributeCards = () => {
        if (numPeople < 0) {
            setErrorMessage('Number of people cannot be negative');
            return;
        }

        axios.get(`http://localhost:8000/card-distribution.php?numPeople=${numPeople}`)
            .then(response => setCards(response.data.cards))
            .catch(error => console.error('Error:', error));
    };

    return (
        <div>
            <h1>Card Distribution</h1>
            <input type="number" value={numPeople} onChange={handleNumPeopleChange} placeholder="Enter number of people" />
            <button onClick={distributeCards}>Distribute Cards</button>
            {errorMessage && (
                <div style={{ color: 'red' }}>{errorMessage}</div>
            )}
            {cards && (
                <div>
                    <h2>Distributed Cards</h2>
                    <pre>{cards}</pre>
                </div>
            )}
        </div>
    );
}

export default App;
