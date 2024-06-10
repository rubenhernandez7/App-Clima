const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = 3000;


// Middlewares
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://dostefoll4:v2t1oZAzfHi8Rmo2@reciclar.1aslleb.mongodb.net/Clima', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

// Routes
const climaRoutes = require('./routes/clima-route');
app.use('/api/clima', climaRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});