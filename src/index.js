const express = require('express');

const userRoutes = require('./routes/userRoutes');
const sessionRoutes = require('./routes/sessionRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/sessions', sessionRoutes);
app.use('/users', userRoutes);
app.get('/', (req, res) => res.status(200).json({ message: 'Welcome to Bar Sell\'s API' }));

app.listen(PORT, () => {
  console.log(`listem in PORT ${PORT}`);
});
