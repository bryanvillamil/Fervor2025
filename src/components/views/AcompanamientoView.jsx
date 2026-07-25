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
import { getActiveUser, getUser } from '@/lib/userLocal';

const AcompanamientoView = ({ onSubmit, onBack }) => {
  const user = getActiveUser() || getUser();
  const [formData, handleInputChange, reset] = useForm({
    nombre: user?.nombre || '',
    telefono: user?.telefono || '',
    tipoAcompanamiento: '',
    mensaje: '',
    ciudad: '',
    distrito: user?.distrito || '',
    congregacion: user?.congregacion || '',
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
      className="mx-auto max-w-2xl"
    >
      <Card className="fervor-panel overflow-hidden rounded-3xl">
        <CardHeader className="border-b border-secondary/10 bg-gradient-to-br from-primary to-celestial px-6 py-8 text-center">
          <CardTitle className="flex items-center justify-center gap-3 font-bebasNeue text-3xl tracking-wide text-white">
            <HeartHandshake className="h-8 w-8 text-terceary" />
            Solicitar Acompañamiento
          </CardTitle>
          <CardDescription className="font-montserratMedium text-sm text-white/65">
            Estamos aquí para acompañarte en tu caminar espiritual
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="acompanamientoNombre"
                className="text-gray-700 font-bold"
              >
                Nombre Completo*
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
                htmlFor="acompanamientoDistrito"
                className="text-gray-700 font-bold"
              >
                Distrito*
              </Label>
              <Input
                id="acompanamientoDistrito"
                name="distrito"
                value={formData.distrito}
                onChange={handleInputChange}
                className="bg-white border-white/30 text-secondary font-bold placeholder:text-secondary/50 h-[48px]"
                placeholder="Tu distrito"
                required
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="acompanamientoCongregacion"
                className="text-gray-700 font-bold"
              >
                Congregación*
              </Label>
              <Input
                id="acompanamientoCongregacion"
                name="congregacion"
                value={formData.congregacion}
                onChange={handleInputChange}
                className="bg-white border-white/30 text-secondary font-bold placeholder:text-secondary/50 h-[48px]"
                placeholder="Tu congregación"
                required
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="acompanamientoTelefono"
                className="text-gray-700 font-bold"
              >
                Teléfono*
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
                Tipo de Acompañamiento*
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
