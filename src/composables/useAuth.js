// auth composable - uses localStorage key ticketapp_session
export function login(user) {
  localStorage.setItem("ticketapp_session", JSON.stringify(user));
}

export function logout() {
  localStorage.removeItem("ticketapp_session");
}

export function getUser() {
  return JSON.parse(localStorage.getItem("ticketapp_session"));
}

export function isAuthenticated() {
  return !!localStorage.getItem("ticketapp_session");
}
