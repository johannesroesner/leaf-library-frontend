import type { Session } from "$lib/types/frontend-specific-types";
import { currentUser } from "$lib/runes.svelte";

export const util = {
  saveSession(session: Session) {
    currentUser.id = session._id;
    currentUser.role = session.role;
    currentUser.name = session.name;
    currentUser.email = session.email;
    currentUser.token = session.token;
    localStorage.leafLibrary = JSON.stringify(currentUser);
  },

  restoreSession() {
    const savedSession = localStorage.leafLibrary;
    if (savedSession) {
      const session: Session = JSON.parse(savedSession);
      currentUser.id = session._id;
      currentUser.role = session.role;
      currentUser.name = session.name;
      currentUser.email = session.email;
      currentUser.token = session.token;
    }
  },

  clearSession() {
    currentUser.id = "";
    currentUser.role = "";
    currentUser.name = "";
    currentUser.email = "";
    currentUser.token = "";
    localStorage.removeItem("leafLibrary");
  }
};
