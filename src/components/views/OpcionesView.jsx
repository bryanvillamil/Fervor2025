import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Heart, Users } from 'lucide-react';
import {
  getUsers,
  getActiveUser,
  setActiveUserId,
  clearUsers,
} from '@/lib/userLocal';

const OpcionesView = ({ onSelectView }) => {
  const [confirmReRegister, setConfirmReRegister] = useState(false);

  const users = useMemo(() => getUsers(), []);
  const active = useMemo(() => getActiveUser(), []);

  const handleSelectActive = (e) => {
    const id = e.target.value || null;
    setActiveUserId(id);
    // no navigation here; just set active profile
  };

  const handleClearActive = () => {
    setActiveUserId(null);
  };

  const handleReRegister = () => {
    // No borramos perfiles anteriores; solo desactivamos el actual (si alguno)
    try {
      setActiveUserId(null);
      // No tocar app.users ni registros previos
    } catch (_) {}
    onSelectView('registro');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      {/* Selector de persona guardada (solo si hay dos o más personas) */}
      {users.length >= 2 && (
        <div className="mb-8 flex flex-wrap sm:flex-row items-center justify-center gap-3 bg-white p-4 rounded-md -mt-8">
          <label className="text-sm text-gray-700 font-semibold w-full">
            Persona Activa:
          </label>
          <select
            onChange={handleSelectActive}
            defaultValue={active?.id ? String(active.id) : ''}
            className="bg-gray-200 border border-white/30 rounded-md px-3 py-2 text-gray-700 font-bold h-[48px] w-full "
          >
            <option value="">Sin seleccionar</option>
            {users.map((u) => (
              <option key={u.id} value={String(u.id)}>
                👤 {u.nombre || 'Sin nombre'} - 📞{' '}
                {u.telefono || 'Sin telefono'}
              </option>
            ))}
          </select>
          {/* <Button
            variant="outline"
            className="border-white/30 text-white bg-red-700 hover:bg-red-600 w-[40%] h-[48px]"
            onClick={handleClearActive}
          >
            Quitar Usuario
          </Button> */}
        </div>
      )}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-primary mb-2">
          Queremos que nos cuentes si has tenido una experiencia con Dios esta
          noche.
        </h2>
        <p className="text-gray-700 text-lg">
          Selecciona una opción para continuar
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Card
            className="backdrop-blur-sm border-white/20 shadow-2xl cursor-pointer h-full"
            onClick={() => onSelectView('testimonio')}
          >
            <CardContent className="p-8 text-center h-full flex flex-col justify-center">
              <div className="bg-gradient-to-br from-red-500 to-red-800 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center ring-1 ring-white/20 shadow-lg">
                <Heart className="w-10 h-10 text-white " />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Fui bautizad@ con poder el Espiritu Santo
              </h2>
              <h3 className="text-lg font-bold italic text-gray-700">
                ¡Queremos celebrar contigo lo que Dios está haciendo!
              </h3>
              <p className="text-secondary text-base mb-6">
                Nos alegra saber que el Señor sigue bautizando con su Espíritu y
                obrando de manera poderosa.Este es el comienzo de un hermoso
                camino, y estamos aquí para acompañarte.
              </p>
              <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/50 hover:to-secondary/50 text-white font-bold text-base py-6">
                Compartir Testimonio
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Card
            className="bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-sm border-white/20 shadow-2xl cursor-pointer h-full"
            onClick={() => onSelectView('acompanamiento')}
          >
            <CardContent className="p-8 text-center h-full flex flex-col justify-center">
              <div className="bg-gradient-to-br from-slate-600 to-slate-800 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center ring-1 ring-white/20 shadow-lg">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Deseo Acompañamiento
              </h3>
              <p className="text-secondary text-base mb-6">
                Solicita acompañamiento espiritual, oración o consejería
                pastoral
              </p>
              <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/50 hover:to-secondary/50 text-white font-bold text-base py-6">
                Solicitar Acompañamiento
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Sección para registrar a otra persona */}
      <div className="mt-10 text-center">
        {!confirmReRegister ? (
          <>
            <p className="text-gray-600 italic font-bold mb-4">
              ¿Deseas registrar a otra persona desde este dispositivo?
            </p>
            <Button
              className="bg-terceary text-gray-700 hover:bg-terceary/80 text-base font-bold py-6"
              onClick={() => setConfirmReRegister(true)}
            >
              Registrar a otra persona
            </Button>
          </>
        ) : (
          <div className="max-w-xl mx-auto bg-white/10 border border-white/20 rounded-lg p-6">
            <p className="text-secondary mb-4">
              Podrás registrar a otra persona sin borrar a las ya guardadas en
              este dispositivo. ¿Deseas continuar?
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                className="bg-gradient-to-r from-terceary/80 to-terceary/50 hover:from-terceary/50 hover:to-terceary/80 text-gray-700 font-bold"
                onClick={handleReRegister}
              >
                Sí, registrar de nuevo
              </Button>
              <Button
                variant="outline"
                className="border-white/30 text-white bg-secondary hover:bg-white/10"
                onClick={() => setConfirmReRegister(false)}
              >
                Volver
              </Button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default OpcionesView;
