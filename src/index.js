const express = require('express');
const cors = require('cors');

const checkJson = require('./middlewares/checkJson');
// const auth = require('./middlewares/auth');
const userRoutes = require('./routes/userRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const roleRoutes = require('./routes/roleRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(checkJson);

// app.use(auth);
app.use('/sessions', sessionRoutes);
app.use('/users', userRoutes);
app.use('/roles', roleRoutes);
app.use('/categories', categoryRoutes);
app.get('/', (req, res) => res.status(200).json({ message: 'Welcome to Bar Sell\'s API' }));

app.listen(PORT, () => {
  console.log(`listem in PORT ${PORT}`);
});
