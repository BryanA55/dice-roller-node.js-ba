const express = require('express');
app = express();

const cors = require("cors");
const PORT = process.env.PORT || 3000;

const allowed = ['https://mango-mud-0f2f49210.5.azurestaticapps.net'];

app.use(cors({
	origin: allowed,
	method: ['GET', 'POST'],
	credentials: true
}));

function rollDice(numberOfDice) {
    const diceRolls = [];
    for (let i = 0; i < numberOfDice; i++) {
        const random = Math.floor((Math.random() * 6) + 1);
        diceRolls.push(random);
    }
    return diceRolls;
}
app.get('/', (req, res) => {
	res.status(200).send('Dice Roller');
});

app.get('/roll', (req, res) => {
	const numberOfDice = parseInt(req.query.numberOfDice) || 1;
	const results = rollDice(numberOfDice);
	res.status(200).json({ results });
});

app.listen(PORT, () => {
	console.log('Server is running');
});