const express = require('express');
const router = express.Router();
const {addUserToSession,loadUserSessions,saveSession,loadSession} = require('../controllers/whiteboardController');
const { authenticate } = require('../middleware/authenticate');

// Add a user to a session
router.post('/join', authenticate, addUserToSession);

// Load all sessions for a user
router.get('/sessions/:userId', authenticate, loadUserSessions);

// Save a session
router.post('/save', authenticate, saveSession);

// Load a specific session
router.get('/session/:roomId', authenticate, loadSession);

module.exports = router;
