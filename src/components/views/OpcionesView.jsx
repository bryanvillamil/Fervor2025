import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Heart, Users, MessageSquare, ArrowRight } from 'lucide-react';
import {
  getUsers,
  getActiveUser,
  setActiveUserId,
} from '@/lib/userLocal';

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 * i, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  }),
};

const OPCIONES = [
  {
    key: 'testimonio',
    icon: Heart,
    gradient: 'from-secondary to-celestial',
    ring: 'ring-secondary/10',
    title: 'Fui lleno con el Espíritu Santo',
    desc: 'Nos alegra saber que el Señor sigue bautizando con su Espíritu y obrando de manera poderosa. Estamos aquí para acompañarte.',
    cta: 'Recibí el Espíritu Santo',
  },
  {
    key: 'acompanamiento',
    icon: Users,
    gradient: 'from-primary to-celestial',
    ring: 'ring-primary/10',
    title: 'Deseo acompañamiento',
    desc: 'Solicita acompañamiento espiritual, oración o consejería pastoral. No tienes que caminar solo.',
    cta: 'Solicitar acompañamiento',
  },
  {
    key: 'testimonioTexto',
    icon: MessageSquare,
    gradient: 'from-terceary to-secondary',
    ring: 'ring-terceary/10',
    title: 'Compártenos tu testimonio',
    desc: 'Cuéntanos brevemente una experiencia vivida durante esta noche de FERVOR.',
    cta: 'Compartir testimonio',
  },
];

const OpcionesView = ({ onSelectView }) => {
  const [confirmReRegister, setConfirmReRegister] = useState(false);

  const users = useMemo(() => getUsers(), []);
  const active = useMemo(() => getActiveUser(), []);

  const handleSelectActive = (e) => {
    const id = e.target.value || null;
    setActiveUserId(id);
  };

  const handleReRegister = () => {
    try {
      setActiveUserId(null);
    } catch (_) {}
    onSelectView('registro');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto max-w-5xl"
    >
      {/* Profile selector */}
      {users.length >= 2 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="mb-8 rounded-2xl border border-primary/[0.06] bg-white p-5 shadow-[0_4px_20px_rgba(0,22,42,0.04)]"
        >
          <label className="mb-2 block text-xs font-montserratBold uppercase tracking-[0.2em] text-primary/40">
            Persona Activa
          </label>
          <select
            onChange={handleSelectActive}
            defaultValue={active?.id ? String(active.id) : ''}
            className="h-[44px] w-full rounded-xl border border-primary/10 bg-primary/[0.03] px-3 font-montserratMedium text-sm text-primary focus:border-terceary focus:ring-1 focus:ring-terceary/30 focus:outline-none"
          >
            <option value="">Sin seleccionar</option>
            {users.map((u) => (
              <option key={u.id} value={String(u.id)}>
                {u.nombre || 'Sin nombre'} — {u.telefono || 'Sin telefono'}
              </option>
            ))}
          </select>
        </motion.div>
      )}

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="mb-10 text-center"
      >
        <span className="mb-4 inline-block rounded-full border border-terceary/15 bg-terceary/[0.05] px-4 py-1.5 text-[10px] font-montserratBold uppercase tracking-[0.4em] text-terceary/80">
          Tu experiencia importa
        </span>
        <h2 className="mx-auto mt-4 max-w-2xl font-bebasNeue text-3xl leading-tight tracking-wide text-primary sm:text-4xl">
          Queremos que nos cuentes si has tenido una experiencia con Dios esta noche
        </h2>
        <p className="mt-4 text-xs font-montserratBold uppercase tracking-[0.2em] text-primary/35">
          Selecciona una opción
        </p>
      </motion.div>

      {/* Cards */}
      <div className="grid gap-5 md:grid-cols-3">
        {OPCIONES.map((op, i) => {
          const Icon = op.icon;
          return (
            <motion.div
              key={op.key}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={cardVariant}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className="group h-full cursor-pointer overflow-hidden rounded-2xl border border-primary/[0.06] bg-white transition-all duration-300 hover:border-terceary/20 hover:shadow-[0_20px_50px_rgba(0,22,42,0.1)]"
                onClick={() => onSelectView(op.key)}
              >
                <CardContent className="flex h-full flex-col p-7 text-center">
                  <div className={`mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${op.gradient} shadow-lg ring-4 ${op.ring} transition-transform duration-300 group-hover:scale-105`}>
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="mb-3 font-bebasNeue text-2xl tracking-wide text-primary">
                    {op.title}
                  </h3>
                  <p className="mb-6 flex-1 text-sm leading-6 text-primary/45">
                    {op.desc}
                  </p>
                  <Button className="group/btn w-full rounded-xl bg-gradient-to-r from-primary to-celestial py-4 text-xs font-montserratBold uppercase tracking-[0.1em] text-white shadow-[0_6px_20px_rgba(0,22,42,0.15)] transition-all duration-300 hover:brightness-110">
                    {op.cta}
                    <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Re-register */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="mt-10 text-center"
      >
        {!confirmReRegister ? (
          <>
            <p className="mb-3 text-sm text-primary/40">
              ¿Deseas registrar a otra persona desde este dispositivo?
            </p>
            <button
              onClick={() => setConfirmReRegister(true)}
              className="text-sm font-montserratBold text-terceary/70 underline underline-offset-4 transition-colors hover:text-terceary"
            >
              Registrar a otra persona
            </button>
          </>
        ) : (
          <div className="mx-auto max-w-md rounded-2xl border border-primary/[0.06] bg-white p-6 shadow-[0_10px_30px_rgba(0,22,42,0.06)]">
            <p className="mb-5 text-sm text-primary/50">
              Podrás registrar a otra persona sin borrar a las ya guardadas en este dispositivo.
            </p>
            <div className="flex gap-3 justify-center">
              <Button
                className="rounded-xl bg-gradient-to-r from-primary to-celestial px-6 py-3 text-xs font-montserratBold uppercase tracking-[0.1em] text-white transition-all hover:brightness-110"
                onClick={handleReRegister}
              >
                Sí, continuar
              </Button>
              <Button
                variant="outline"
                className="rounded-xl border-primary/15 px-6 py-3 text-xs font-montserratBold uppercase tracking-[0.1em] text-primary/50 hover:bg-primary/[0.03]"
                onClick={() => setConfirmReRegister(false)}
              >
                Cancelar
              </Button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default OpcionesView;
