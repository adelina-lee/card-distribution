import React, { useState } from 'react';
import axios from 'axios';

function App() {
    // State variables
    const [numPeople, setNumPeople] = useState('');
    const [cards, setCards] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Handler for input change event
    const handleNumPeopleChange = (e) => {
        const value = e.target.value;
        setNumPeople(value);
        clearErrorMessage();
    };

    // Clear error message
    const clearErrorMessage = () => {
        setErrorMessage('');
    };

    // Validate input to ensure it's a valid positive integer
    const validateInput = () => {
        const parsedNumPeople = parseInt(numPeople);
        if (isNaN(parsedNumPeople) || parsedNumPeople < 1) {
            setErrorMessage('Input value is not a valid positive integer');
            return false;
        }
        return true;
    };

    // Function to handle card distribution
    const distributeCards = () => {
        if (!validateInput()) return;

        axios.get(`http://localhost:8000/card-distribution.php?numPeople=${numPeople}`)
            .then(handleCardDistribution)
            .catch(handleError);
    };

    // Handle successful card distribution
    const handleCardDistribution = (response) => {
        if (response.data && response.data.cards) {
            setCards(response.data.cards.replace(/\n/g, ''));
            clearErrorMessage();
        } else {
            handleError(new Error('Invalid data received from server'));
        }
    };

    // Handle errors
    const handleError = (error) => {
        console.error('Error:', error);
        if (error.response && error.response.data && error.response.data.error) {
            setErrorMessage(error.response.data.error);
        } else {
            setErrorMessage('An error occurred while distributing cards');
        }
        
        // Display "Irregularity occurred" message iin console log and terminate process
        console.error('Irregularity occurred');
        clearErrorMessage(); // Clear any existing error message
    };

    // JSX rendering
    return (
        <div>
            <h1>Card Distribution</h1>
            <input type="number" value={numPeople} onChange={handleNumPeopleChange} placeholder="Enter number of people" />
            <button onClick={distributeCards}>Distribute Cards</button>
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
            {cards && !errorMessage && (
                <div>
                    <h2>Distributed Cards</h2>
                    {cards.split('\n').map((row, index) => (
                        <div key={index}>
                            {row.split(',').map((card, idx) => (
                                <span key={idx}>{card.trim()}{idx !== row.split(',').length - 1 ? ', ' : ''}</span>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default App;
