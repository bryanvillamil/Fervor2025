import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { HeartHandshake } from 'lucide-react';
import { useForm } from '@/hooks/useForm';
import { getUser } from '@/lib/userLocal';

const AcompanamientoView = ({ onSubmit, onBack }) => {
  const user = getUser();
  const [formData, handleInputChange, reset] = useForm({
    nombre: user?.nombre || '',
    telefono: user?.telefono || '',
    tipoAcompanamiento: '',
    mensaje: '',
    ciudad: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formData, registroId: user?.id ?? null };
    const success = await onSubmit(payload);
    if (success) {
      reset();
      onBack();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-2xl mx-auto md:mt-8"
    >
      <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-primary font-bold flex items-center justify-center gap-3">
            <HeartHandshake className="w-8 h-8" />
            Solicitar Acompañamiento
          </CardTitle>
          <CardDescription className="text-gray-700 text-base font-bold ">
            Estamos aquí para acompañarte en tu caminar espiritual
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="acompanamientoNombre"
                className="text-gray-700 font-bold"
              >
                Nombre *
              </Label>
              <Input
                id="acompanamientoNombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                className="bg-white border-white/30 text-secondary font-bold placeholder:text-secondary/50 h-[48px]"
                placeholder="Tu nombre"
                required
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="acompanamientoTelefono"
                className="text-gray-700 font-bold"
              >
                Teléfono *
              </Label>
              <Input
                id="acompanamientoTelefono"
                name="telefono"
                type="tel"
                value={formData.telefono}
                onChange={handleInputChange}
                className="bg-white border-white/30 text-secondary font-bold placeholder:text-secondary/50 h-[48px]"
                placeholder="Tu teléfono"
                required
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="tipoAcompanamiento"
                className="text-gray-700 font-bold"
              >
                Tipo de Acompañamiento *
              </Label>
              <select
                id="tipoAcompanamiento"
                name="tipoAcompanamiento"
                value={formData.tipoAcompanamiento}
                onChange={handleInputChange}
                className="w-full p-3 bg-white border border-white/30 rounded-md text-secondary font-bold text-[12px] h-[48px]"
                required
              >
                <option value="" className="text-gray-800">
                  Selecciona una opción
                </option>
                <option value="Deseo ser bautizado" className="text-gray-800">
                  Deseo ser bautizado
                </option>
                <option
                  value="Deseo volver a los caminos del Señor"
                  className="text-gray-800"
                >
                  Deseo volver a los caminos del Señor
                </option>
                <option
                  value="Deseo saber donde congregarme en mi barrio o ciudad"
                  className="text-gray-800"
                >
                  Deseo saber donde congregarme en mi barrio o ciudad
                </option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="mensaje" className="text-gray-700 font-bold">
                Mensaje (opcional)
              </Label>
              <textarea
                id="mensaje"
                name="mensaje"
                value={formData.mensaje}
                onChange={handleInputChange}
                className="w-full min-h-24 p-3 bg-white border border-white/30 rounded-md text-secondary font-bold placeholder:text-secondary/50 resize-none"
                placeholder="Cuéntanos más sobre tu solicitud..."
              />
            </div>
            <div className="flex gap-4">
              <Button
                type="button"
                onClick={onBack}
                variant="outline"
                className="flex-1 border-secondary/30 text-secondary hover:bg-secondary/10 py-6 font-bold"
              >
                Volver
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-primary/50 hover:to-secondary/50 text-white font-bold py-6"
              >
                Enviar Solicitud
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AcompanamientoView;
