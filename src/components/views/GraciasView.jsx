import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Instagram, CheckCircle, ArrowRight } from 'lucide-react';

const GraciasView = ({ onContinue }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto max-w-2xl text-center"
    >
      <Card className="overflow-hidden rounded-2xl border border-primary/[0.06] bg-white shadow-[0_20px_60px_rgba(0,22,42,0.08)]">
        <CardContent className="p-8 sm:p-12">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, duration: 0.5, type: 'spring', stiffness: 200 }}
            className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-celestial shadow-[0_12px_30px_rgba(0,22,42,0.2)]"
          >
            <CheckCircle className="h-10 w-10 text-terceary" />
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="mb-3 font-bebasNeue text-3xl tracking-wide text-primary sm:text-4xl"
          >
            ¡Registro confirmado!
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="mb-8 text-sm leading-6 text-primary/50"
          >
            Tu asistencia ha sido registrada. Esperamos que durante este evento Dios transforme tu vida.
          </motion.p>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5 }}
            className="mb-8 rounded-xl border border-primary/[0.06] bg-primary/[0.02] p-5"
          >
            <p className="mb-4 text-[10px] font-montserratBold uppercase tracking-[0.3em] text-primary/40">
              Síguenos en redes
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-6">
              <a
                href="https://www.instagram.com/fervor.oficial?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-montserratMedium text-primary/60 transition-colors hover:text-terceary"
              >
                <Instagram className="h-4 w-4" />
                @fervor.oficial
              </a>
              <a
                href="https://www.instagram.com/conquistadores9?igsh=MXB2bjJ5ZW1nMXlhaw=="
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-montserratMedium text-primary/60 transition-colors hover:text-terceary"
              >
                <Instagram className="h-4 w-4" />
                @conquistadores9
              </a>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.5 }}
          >
            <Button
              onClick={onContinue}
              className="group rounded-xl bg-gradient-to-r from-primary to-celestial px-10 py-5 text-sm font-montserratBold uppercase tracking-[0.12em] text-white shadow-[0_10px_30px_rgba(0,22,42,0.2)] transition-all duration-300 hover:shadow-[0_15px_40px_rgba(0,22,42,0.3)] hover:brightness-110"
            >
              Continuar
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default GraciasView;
