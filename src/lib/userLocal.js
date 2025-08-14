// Utilities to manage persisted user profiles in localStorage
// Backward compatible with existing single-user keys used in the app.

const USER_KEY = 'app.user'; // single-user (legacy)
const LEGACY_REG_KEY = 'registroData'; // legacy supabase response snapshot

// New multi-user keys
const USERS_KEY = 'app.users'; // array of users
const ACTIVE_USER_ID_KEY = 'app.activeUserId';

function safeParse(json) {
  try {
    return JSON.parse(json);
  } catch (_) {
    return null;
  }
}

function normalizeUser(u) {
  if (!u) return null;
  return {
    id: u.id ?? u.registro_id ?? null,
    nombre: u.nombre ?? '',
    telefono: u.telefono ?? '',
    distrito: u.distrito ?? '',
    congregacion: u.congregacion ?? '',
    asistencia: u.asistencia ?? 'presencial',
    edad: u.edad ?? '',
    createdAt: u.createdAt ?? u.created_at ?? null,
  };
}

export function getUser() {
  try {
    // Prefer active multi-user if available
    const active = getActiveUser();
    if (active) return active;

    const raw = localStorage.getItem(USER_KEY);
    if (raw) return safeParse(raw);

    // Fallback to legacy registroData shape from Supabase insert
    const legacyRaw = localStorage.getItem(LEGACY_REG_KEY);
    if (legacyRaw) return normalizeUser(safeParse(legacyRaw));
  } catch (_) {}
  return null;
}

export function setUser(user) {
  try {
    if (!user) return;
    // Keep legacy single-user key updated for compatibility
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    // Also insert/update under multi-user store and set active
    addOrUpdateUser(user);
    if (user?.id != null) setActiveUserId(String(user.id));
    // Also keep legacy key for compatibility if resembles registro
    const legacyCandidate = {
      id: user.id ?? null,
      nombre: user.nombre ?? '',
      telefono: user.telefono ?? '',
      distrito: user.distrito ?? '',
      congregacion: user.congregacion ?? '',
      asistencia: user.asistencia ?? 'presencial',
      created_at: user.createdAt ?? null,
    };
    localStorage.setItem(LEGACY_REG_KEY, JSON.stringify(legacyCandidate));
  } catch (_) {}
}

export function clearUser() {
  try {
    localStorage.removeItem(USER_KEY);
  } catch (_) {}
}

// ---------- Multi-user API ----------

export function getUsers() {
  const raw = localStorage.getItem(USERS_KEY);
  const arr = safeParse(raw);
  return Array.isArray(arr) ? arr.map(normalizeUser).filter(Boolean) : [];
}

export function setUsers(users) {
  try {
    const list = Array.isArray(users) ? users.map(normalizeUser) : [];
    localStorage.setItem(USERS_KEY, JSON.stringify(list));
  } catch (_) {}
}

export function addOrUpdateUser(user) {
  try {
    const u = normalizeUser(user);
    if (!u) return;
    const list = getUsers();
    const idx = list.findIndex((x) => String(x.id) === String(u.id));
    if (idx >= 0) list[idx] = { ...list[idx], ...u };
    else list.push(u);
    localStorage.setItem(USERS_KEY, JSON.stringify(list));
  } catch (_) {}
}

export function setActiveUserId(id) {
  try {
    if (id == null) {
      localStorage.removeItem(ACTIVE_USER_ID_KEY);
    } else {
      localStorage.setItem(ACTIVE_USER_ID_KEY, String(id));
    }
  } catch (_) {}
}

export function getActiveUser() {
  try {
    const id = localStorage.getItem(ACTIVE_USER_ID_KEY);
    if (!id) return null;
    const list = getUsers();
    return list.find((x) => String(x.id) === String(id)) ?? null;
  } catch (_) {
    return null;
  }
}

export function removeUser(id) {
  try {
    const list = getUsers();
    const next = list.filter((x) => String(x.id) !== String(id));
    localStorage.setItem(USERS_KEY, JSON.stringify(next));
    const active = localStorage.getItem(ACTIVE_USER_ID_KEY);
    if (active && String(active) === String(id)) {
      localStorage.removeItem(ACTIVE_USER_ID_KEY);
    }
  } catch (_) {}
}

export function clearUsers() {
  try {
    localStorage.removeItem(USERS_KEY);
    localStorage.removeItem(ACTIVE_USER_ID_KEY);
  } catch (_) {}
}
