const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  return res.status(200).json({message: 'Welcome to Bar Sell\'s API'});
})

app.listen(PORT, () => {
  console.log(`listem in PORT ${PORT}`);
})