const express = require('express');
const app = express();
const cors = require("cors");
const allowed = ['https://mango-mud-0f2f49210.5.azurestaticapps.net'];

app.use(cors({
	origin: allowed,
	methods: ['GET', 'POST'],
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
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/roll', (req, res) => {
	const numberOfDice = parseInt(req.query.numberOfDice) || 1;
	const results = rollDice(numberOfDice);
	res.status(200).json({ results });
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log('Server is running');
});
app.get('/api/ping', (req, res) => {
	res.send('pong');
});

app.use(express.static(__dirname));
