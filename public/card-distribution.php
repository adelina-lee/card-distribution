<?php

header("Access-Control-Allow-Origin: http://localhost:3000");

if (!isset($_GET['numPeople']) || !is_numeric($_GET['numPeople']) || $_GET['numPeople'] < 1) {
    http_response_code(400);
    echo json_encode(array('error' => 'Input value does not exist or value is invalid'));
    exit;
}

$numPeople = intval($_GET['numPeople']);
$totalCards = 52;

$cards = array();
$suits = array('S', 'H', 'D', 'C');
$values = array('A', 2, 3, 4, 5, 6, 7, 8, 9, 'X', 'J', 'Q', 'K');

// Distribute cards
$cardsPerPerson = $totalCards / $numPeople;
for ($i = 0; $i < $numPeople; $i++) {
    $personCards = array();
    for ($j = 0; $j < $cardsPerPerson; $j++) {
        $suit = $suits[rand(0, 3)];
        $value = $values[rand(0, 12)];
        $personCards[] = "$suit-$value";
    }
    $cards[] = implode(',', $personCards);
}

echo json_encode(array('cards' => implode(PHP_EOL, $cards)));
?>
