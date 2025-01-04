const { User, WhiteboardSession, UserSession } = require('../models');

const saveSession = async (req, res) => {
  const { roomId, drawData } = req.body;
  const userId = req.user.id;

  try {
    const session = await WhiteboardSession.findOne({ where: { roomId } });

    if (!session) {
      return res.status(404).json({ success: false, message: 'Session not found' });
    }

    // Update the drawData for the session
    session.drawData = drawData;
    await session.save();

    await UserSession.findOrCreate({ where: { user_id: userId, session_id: session.id } });

    res.status(200).json({ success: true, session });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Function to create a new session/room and map the user to the session
const createSession = async (roomId, userId) => {
  const newSession = new WhiteboardSession({ roomId, drawData: [] });
  await newSession.save();

  await UserSession.findOrCreate({ where: { user_id: userId, session_id: newSession.id } });

  return newSession;
};

// Load a specific session/room
const loadSession = async (req, res) => {
  const { roomId } = req.params;
  const { mode } = req.query;
  const userId = req.user.id;

  try {
    let session = await WhiteboardSession.findOne({ where: { roomId } });

    if (!session) {
      if (mode === 'join') {
        return res.status(404).json({ success: false, message: 'Session not found' });
      }
      session = await createSession(roomId, userId);
      return res.status(200).json({ success: true, drawData: session.drawData });
    }

    res.status(200).json({ success: true, drawData: session.drawData });
  } catch (error) {
    console.error('Error loading session:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const getUserSessions = async (req, res) => {
  const userId = req.user.id;

  try {
    const sessions = await WhiteboardSession.findAll({
      include: {
        model: User,
        where: { id: userId },
      },
    });
    res.status(200).json({ success: true, sessions });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const addUserToSession = async (req, res) => {
  const { sessionId } = req.body;
  const userId = req.user.id; 

  try {
    await UserSession.findOrCreate({ where: { user_id: userId, session_id: sessionId } });
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error adding user to session:', error);
    res.status(500).json({ success: false, message: 'Error adding user to session' });
  }
};


const loadUserSessions = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findByPk(userId, {
      include: {
        model: WhiteboardSession,
        through: {
          attributes: [],
        },
      },
    });
    res.status(200).json({ success: true, sessions: user.WhiteboardSessions });
  } catch (error) {
    console.error('Error loading sessions:', error);
    res.status(500).json({ success: false, message: 'Error loading sessions' });
  }
};

module.exports = {
  saveSession,
  loadSession,
  getUserSessions,
  addUserToSession,
  loadUserSessions,
};
