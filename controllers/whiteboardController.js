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


const loadSession = async (req, res) => {
  const { roomId } = req.params;

  try {
    const session = await WhiteboardSession.findOne({ where: { roomId } });
    if (session) {
      res.status(200).json({ success: true, drawData: session.drawData });
    } else {
      res.status(404).json({ success: false, message: 'Session not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getUserSessions = async (req, res) => {
  const userId = req.user.id;

  try {
    const sessions = await WhiteboardSession.findAll({ where: { userId } });
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
