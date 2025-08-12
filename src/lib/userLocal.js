// Utilities to manage persisted user profile in localStorage
// We keep backward compatibility with existing keys used in the app.

const USER_KEY = 'app.user';
const LEGACY_REG_KEY = 'registroData';

export function getUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    if (raw) return JSON.parse(raw);

    // Fallback to legacy registroData shape from Supabase insert
    const legacyRaw = localStorage.getItem(LEGACY_REG_KEY);
    if (legacyRaw) {
      const d = JSON.parse(legacyRaw);
      return {
        id: d.id ?? d?.registro_id ?? null,
        nombre: d.nombre ?? '',
        telefono: d.telefono ?? '',
        distrito: d.distrito ?? '',
        congregacion: d.congregacion ?? '',
        asistencia: d.asistencia ?? 'presencial',
        createdAt: d.created_at ?? d.createdAt ?? null,
      };
    }
  } catch (_) {}
  return null;
}

export function setUser(user) {
  try {
    if (!user) return;
    localStorage.setItem(USER_KEY, JSON.stringify(user));
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
