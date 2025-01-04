const express = require('express');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const setupSocket = require('./routes/socketRoutes');
const authRoutes = require('./routes/authRoutes');
const whiteboardRoutes = require('./routes/whiteboardRoutes');
const sequelize = require('./config/database');
const User = require('./models/user');
const WhiteboardSession = require('./models/whiteboardSession');
const UserSession = require('./models/userSession');
require('dotenv').config()
const app = express();
const server = http.createServer(app);

// Allow specific origins dynamically
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests from localhost (dev) and the mobile device's IP
    const allowedOrigins = ['http://localhost:5173', 'http://172.20.10.8:5173'];
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/whiteboard', whiteboardRoutes);

app.get("/", (req, res) => res.send("Express on Vercel"));
setupSocket(server);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(error => {
  console.error('Unable to connect to the database:', error);
});
