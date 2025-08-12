import React, { useEffect, useState } from 'react';

/**
 * CookieConsent modal
 * - Muestra un modal de bienvenida con tratamiento de datos y cookies en el primer ingreso.
 * - Persiste aceptación en localStorage para no volver a mostrarlo.
 */
export default function CookieConsent() {
  const STORAGE_KEY = 'fervor_cookie_consent_v1';
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const accepted = localStorage.getItem(STORAGE_KEY);
      if (!accepted) setOpen(true);
    } catch (_) {
      // Si localStorage no está disponible, mostramos el modal por defecto
      setOpen(true);
    }
  }, []);

  const accept = () => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ accepted: true, ts: Date.now() }),
      );
    } catch (_) {
      // ignorar
    }
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={accept} />
      <div className="relative w-full max-w-lg bg-white/90 backdrop-blur-lg rounded-xl border border-white/30 shadow-2xl overflow-hidden">
        <div className="px-6 py-5">
          <h3 className="text-3xl font-bold text-primary mb-4 text-center font-bebasNeue">
            Bienvenido a Fervor 2025
          </h3>
          <p className="text-secondary text-base leading-relaxed mb-4">
            Dios te bendiga, Usamos cookies para mejorar tu experiencia y
            almacenamos de forma segura la información que registras con fines
            de organización del evento. Al continuar, aceptas nuestra política
            de tratamiento de datos y uso de cookies.
          </p>
          <ul className="list-disc pl-5 text-secondary/80 text-sm space-y-1 mb-5">
            <li>No compartimos tu información con terceros no autorizados.</li>
            <li>
              Puedes solicitar la eliminación de tus datos en cualquier momento.
            </li>
          </ul>
          <div className="flex items-center justify-center">
            <button
              onClick={accept}
              className="inline-flex items-center justify-center rounded-md px-5 py-2.5 bg-gradient-to-r from-primary to-secondary text-white font-bold shadow hover:from-primary/80 hover:to-secondary/80 transition-colors"
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
