/* eslint-disable quotes */
/* eslint-disable quote-props */
const express = require('express');
const cors = require('cors');

const checkJson = require('./middlewares/checkJson');
// const auth = require('./middlewares/auth');
const userRoutes = require('./routes/userRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const roleRoutes = require('./routes/roleRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const cardRoutes = require('./routes/cardRoutes');
const billRoutes = require('./routes/billRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(checkJson);
app.use(cors());

// app.use(auth);
app.use('/sessions', sessionRoutes);
app.use('/users', userRoutes);
app.use('/roles', roleRoutes);
app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);
app.use('/cards', cardRoutes);
app.use('/bills', billRoutes);
app.get('/', (req, res) => res.status(200).json({ message: 'Welcome to Bar Sell\'s API' }));

app.listen(PORT, () => {
  console.log(`listem in PORT ${PORT}`);
});
