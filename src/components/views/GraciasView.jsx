import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Clock, CheckCircle } from 'lucide-react';

const GraciasView = ({ onContinue }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-2xl mx-auto text-center"
    >
      <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
        <CardContent className="p-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="mb-6"
          >
            <CheckCircle className="w-24 h-24 text-green-400 mx-auto" />
          </motion.div>
          <h2 className="text-4xl font-bold text-white mb-4">
            ¡Gracias por Registrarte! 🎉
          </h2>
          <p className="text-xl text-purple-200 mb-8">
            Tu registro ha sido confirmado. ¡Te esperamos en este evento especial donde Dios transformará vidas!
          </p>
          <div className="bg-white/20 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-center gap-2 text-yellow-400 mb-2">
              <Clock className="w-5 h-5" />
              <span className="font-semibold">Información del Evento</span>
            </div>
            <p className="text-white">
              Mantente atento a tu teléfono y email para más detalles sobre el evento
            </p>
          </div>
          <Button
            onClick={onContinue}
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-3 px-8 text-lg"
          >
            Continuar
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default GraciasView;