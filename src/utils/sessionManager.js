import { v4 as uuidv4 } from 'uuid';

const SESSION_KEY = 'fashionai_session_id';

export default {
  getSessionId() {
    let sessionId = localStorage.getItem(SESSION_KEY);

    if (!sessionId) {
      sessionId = uuidv4();
      localStorage.setItem(SESSION_KEY, sessionId);
    }

    return sessionId;
  },

  clearSession() {
    localStorage.removeItem(SESSION_KEY);
  },

  createNewSession() {
    const newSessionId = uuidv4();
    localStorage.setItem(SESSION_KEY, newSessionId);
    return newSessionId;
  }
};