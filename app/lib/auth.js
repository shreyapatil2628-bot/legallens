const USERS_KEY = "legallens-users";
const SESSION_KEY = "legallens-session";

function readUsers() {
  try {
    const parsed = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function hashPassword(password, salt) {
  const data = new TextEncoder().encode(`${salt}:${password}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function randomSalt() {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  return [...bytes].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

export function getSession() {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
  } catch {
    return null;
  }
}

export function signOut() {
  localStorage.removeItem(SESSION_KEY);
}

export async function signIn(email, password) {
  const normalized = email.trim().toLowerCase();
  const user = readUsers().find((entry) => entry.email === normalized);
  if (!user) throw new Error("No account found for that email.");

  const hash = await hashPassword(password, user.salt);
  if (hash !== user.hash) throw new Error("Incorrect password.");

  const session = { name: user.name, email: user.email };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export async function signUp(name, email, password) {
  const normalized = email.trim().toLowerCase();
  const trimmedName = name.trim();
  if (trimmedName.length < 2) throw new Error("Enter your name.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) throw new Error("Enter a valid email address.");
  if (password.length < 6) throw new Error("Password must be at least 6 characters.");

  const users = readUsers();
  if (users.some((entry) => entry.email === normalized)) {
    throw new Error("An account with that email already exists.");
  }

  const salt = randomSalt();
  const hash = await hashPassword(password, salt);
  users.push({ name: trimmedName, email: normalized, salt, hash });
  localStorage.setItem(USERS_KEY, JSON.stringify(users));

  const session = { name: trimmedName, email: normalized };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}
