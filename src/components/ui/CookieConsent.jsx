import React, { useEffect, useState } from 'react';
import { getCurrentYear } from '@/lib/utils';

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
      <div className="absolute inset-0 bg-primary/80 backdrop-blur-sm" onClick={accept} />
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-terceary/20 bg-white shadow-[0_30px_90px_rgba(0,22,42,0.4)]">
        <div className="bg-gradient-to-br from-primary to-celestial px-6 py-6 text-center">
          <img
            src="/logo-fervor-2026.png"
            alt="Fervor 2026"
            className="mx-auto mb-4 w-52 mix-blend-screen brightness-150"
          />
          <h3 className="font-bebasNeue text-3xl tracking-wide text-white">
            Bienvenido a Fervor {getCurrentYear()}
          </h3>
        </div>
        <div className="px-6 py-6">
          <p className="mb-4 text-base leading-relaxed text-primary/75">
            Dios te bendiga, Usamos cookies para mejorar tu experiencia y
            almacenamos de forma segura la información que registras con fines
            de organización del evento. Al continuar, aceptas nuestra política
            de tratamiento de datos y uso de cookies.
          </p>
          <ul className="mb-6 list-disc space-y-1 pl-5 text-sm text-primary/60">
            <li>No compartimos tu información con terceros no autorizados.</li>
            <li>
              Puedes solicitar la eliminación de tus datos en cualquier momento.
            </li>
          </ul>
          <div className="flex items-center justify-center">
            <button
              onClick={accept}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-gradient-to-r from-primary to-celestial px-7 py-2.5 font-bold text-white shadow-lg transition-transform hover:scale-[1.03]"
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
