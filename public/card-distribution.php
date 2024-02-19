<?php
    // Allow requests from http://localhost:3000
    header("Access-Control-Allow-Origin: http://localhost:3000");

    // Function to send error response with specified message and terminate the process
    function sendIrregularityResponse() {
        echo json_encode(array('error' => 'Irregularity occurred')); // Send JSON-encoded error message
        exit; // Terminate script execution
    }

    // Function to distribute cards among a given number of people
    function distributeCards($numPeople) {
        $totalCards = 52; // Total number of cards in a deck
        $cards = array(); // Array to store distributed cards
        $suits = array('S', 'H', 'D', 'C'); // Array of card suits
        $values = array('A', 2, 3, 4, 5, 6, 7, 8, 9, 'X', 'J', 'Q', 'K'); // Array of card values

        $cardsPerPerson = $totalCards / $numPeople; // Calculate number of cards per person
        for ($i = 0; $i < $numPeople; $i++) {
            $personCards = array(); // Array to store cards for current person
            for ($j = 0; $j < $cardsPerPerson; $j++) {
                // Randomly select a suit and value to create a card
                $suit = $suits[rand(0, 3)];
                $value = $values[rand(0, 12)];
                $personCards[] = "$suit-$value"; // Add card to person's cards array
            }
            $cards[] = implode(',', $personCards); // Concatenate person's cards and add to main cards array
        }
        return $cards; // Return distributed cards
    }

    // Main code execution starts here

    // Check if 'numPeople' parameter exists in request and is a valid positive integer
    if (!isset($_GET['numPeople']) || !is_numeric($_GET['numPeople']) || $_GET['numPeople'] < 1) {
        sendIrregularityResponse(); // Irregularity occurred, terminate process
    }

    $numPeople = intval($_GET['numPeople']); // Get number of people as an integer
    if ($numPeople < 1) {
        sendIrregularityResponse(); // Irregularity occurred, terminate process
    }

    $cards = distributeCards($numPeople); // Distribute cards among specified number of people
    echo json_encode(array('cards' => implode(PHP_EOL, $cards))); // Send JSON response with distributed cards
?>
