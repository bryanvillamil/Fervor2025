import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Heart, Users } from 'lucide-react';
import { clearUser } from '@/lib/userLocal';

const OpcionesView = ({ onSelectView }) => {
  const [confirmReRegister, setConfirmReRegister] = useState(false);

  const handleReRegister = () => {
    try {
      // Limpiar datos locales para permitir un nuevo registro en el mismo dispositivo
      localStorage.removeItem('eventoIglesiaRegistrado');
      localStorage.removeItem('registroData');
      clearUser();
    } catch (_) {}
    onSelectView('registro');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-primary mb-4">
          ¿Cómo podemos ayudarte hoy?
        </h2>
        <p className="text-gray-700 text-lg">
          Selecciona una opción para continuar
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Card
            className="bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-lg border-white/20 shadow-2xl cursor-pointer h-full"
            onClick={() => onSelectView('testimonio')}
          >
            <CardContent className="p-8 text-center h-full flex flex-col justify-center">
              <div className="bg-gradient-to-br from-slate-600 to-slate-800 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center ring-1 ring-white/20 shadow-lg">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Dios me Tocó
              </h3>
              <p className="text-secondary text-base mb-6">
                Comparte tu testimonio de cómo Dios obró en tu vida durante el
                evento
              </p>
              <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/50 hover:to-secondary/50 text-white font-bold">
                Compartir Testimonio
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Card
            className="bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-lg border-white/20 shadow-2xl cursor-pointer h-full"
            onClick={() => onSelectView('acompanamiento')}
          >
            <CardContent className="p-8 text-center h-full flex flex-col justify-center">
              <div className="bg-gradient-to-br from-slate-600 to-slate-800 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center ring-1 ring-white/20 shadow-lg">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Deseo Acompañamiento
              </h3>
              <p className="text-secondary text-base mb-6">
                Solicita acompañamiento espiritual, oración o consejería
                pastoral
              </p>
              <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/50 hover:to-secondary/50 text-white font-bold">
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
            <p className="text-gray-700 mb-4">
              ¿Deseas registrar a otra persona desde este dispositivo?
            </p>
            <Button
              className="bg-terceary text-white hover:opacity-90"
              onClick={() => setConfirmReRegister(true)}
            >
              Registrar a otra persona
            </Button>
          </>
        ) : (
          <div className="max-w-xl mx-auto bg-white/10 border border-white/20 rounded-lg p-6">
            <p className="text-secondary mb-4">
              Esto limpiará el registro guardado en este dispositivo para
              permitir un nuevo registro. ¿Deseas continuar?
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                className="bg-gradient-to-r from-terceary/80 to-terceary/50 hover:from-terceary/50 hover:to-terceary/80 text-white font-bold"
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
