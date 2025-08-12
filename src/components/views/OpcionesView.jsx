import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Heart, Users } from 'lucide-react';

const OpcionesView = ({ onSelectView }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-terceary mb-4">
          ¿Cómo podemos ayudarte hoy?
        </h2>
        <p className="text-gray-700 text-lg">
          Selecciona una opción para continuar
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Card
            className="bg-gradient-to-br from-yellow-400/20 to-orange-500/20 backdrop-blur-lg border-yellow-400/30 shadow-2xl cursor-pointer h-full"
            onClick={() => onSelectView('testimonio')}
          >
            <CardContent className="p-8 text-center h-full flex flex-col justify-center">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Dios me Tocó
              </h3>
              <p className="text-purple-200 text-lg mb-6">
                Comparte tu testimonio de cómo Dios obró en tu vida durante el
                evento
              </p>
              <Button className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold">
                Compartir Testimonio
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Card
            className="bg-gradient-to-br from-blue-400/20 to-purple-500/20 backdrop-blur-lg border-blue-400/30 shadow-2xl cursor-pointer h-full"
            onClick={() => onSelectView('acompanamiento')}
          >
            <CardContent className="p-8 text-center h-full flex flex-col justify-center">
              <div className="bg-gradient-to-r from-blue-400 to-purple-500 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Deseo Acompañamiento
              </h3>
              <p className="text-purple-200 text-lg mb-6">
                Solicita acompañamiento espiritual, oración o consejería
                pastoral
              </p>
              <Button className="bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-white font-bold">
                Solicitar Acompañamiento
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default OpcionesView;
