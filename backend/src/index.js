const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const userRoutes = require('./routes/userRoutes');
const homeRoutes = require('./routes/homeRoutes');



app.use(cors());
app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/home', homeRoutes);



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;