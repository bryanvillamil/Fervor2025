import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Instagram, CheckCircle } from 'lucide-react';

const GraciasView = ({ onContinue }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-2xl mx-auto text-center"
    >
      <Card className="bg-white/10 bg-white backdrop-blur-lg border-white/20 shadow-2xl">
        <CardContent className="p-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="mb-6"
          >
            <CheckCircle className="w-20 h-20 text-primary mx-auto" />
          </motion.div>
          <h2 className="text-3xl font-bold text-terceary mb-4">
            ¡Gracias por registrar tu asistencia! 🎉🙏🏻
          </h2>
          <p className="text-base text-primary font-medium mb-4">
            Tu registro ha sido confirmado. ¡Esperamos que durante este evento
            Dios transforme tu vida!
          </p>

          <div className="text-gray-700 mb-4">
            <p>Síguenos en nuestras redes sociales</p>
            <div className="flex justify-center items-center gap-6 my-4">
              <a
                href="https://www.instagram.com/fervor.oficial?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center font-bold justify-center my-4 text-primary"
              >
                <Instagram />
                @fervor.oficial
              </a>
              <a
                href="https://www.instagram.com/conquistadores9?igsh=MXB2bjJ5ZW1nMXlhaw=="
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center font-bold justify-center text-primary"
              >
                <Instagram />
                @conquistadores9
              </a>
            </div>
          </div>
          {/* <div className="bg-white/20 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-center gap-2 text-secondary mb-2">
              <Clock className="w-5 h-5" />
              <span className="font-semibold">Información del Evento</span>
            </div>
            <p className="text-secondary">
              Mantente atento a tu teléfono y email para más detalles sobre el
              evento
            </p>
          </div> */}
          <Button
            onClick={onContinue}
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary/50 hover:to-secondary/50 text-white font-bold py-3 px-8 text-lg"
          >
            Continuar
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default GraciasView;
