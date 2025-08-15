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
import { Flame } from 'lucide-react';
import { useForm } from '@/hooks/useForm';
import { getActiveUser, getUser } from '@/lib/userLocal';

const TestimonioView = ({ onSubmit, onBack }) => {
  const user = getActiveUser() || getUser();
  const [formData, handleInputChange, reset] = useForm({
    nombre: user?.nombre || '',
    recibielespiritusanto: false,
    telefono: user?.telefono || '',
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
      className="max-w-2xl mx-auto md:mt-8"
    >
      <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl text-primary font-bold flex items-center justify-center gap-3">
            <Flame className="w-8 h-8" />
            Fui lleno con el Espíritu Santo
          </CardTitle>
          <CardDescription className="text-gray-700 text-base font-bold">
            Comparte tu experiencia
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="testimonioNombre"
                className="text-gray-700 font-bold"
              >
                Nombre Completo*
              </Label>
              <Input
                id="testimonioNombre"
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
                htmlFor="recibielespiritusanto"
                className="text-gray-700 font-bold"
              >
                ¿Recibiste el Espíritu Santo?*
              </Label>
              <div className="flex items-center gap-3">
                <input
                  id="recibielespiritusanto"
                  name="recibielespiritusanto"
                  type="checkbox"
                  checked={!!formData.recibielespiritusanto}
                  onChange={handleInputChange}
                  className="h-5 w-5 accent-primary"
                  required
                />
                <span className="text-gray-700 font-bold">Sí</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="testimonioTelefono"
                className="text-gray-700 font-bold"
              >
                Teléfono*
              </Label>
              <Input
                id="testimonioTelefono"
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
                htmlFor="testimonioDistrito"
                className="text-gray-700 font-bold"
              >
                Distrito*
              </Label>
              <Input
                id="testimonioDistrito"
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
                htmlFor="testimonioCongregacion"
                className="text-gray-700 font-bold"
              >
                Congregación*
              </Label>
              <Input
                id="testimonioCongregacion"
                name="congregacion"
                value={formData.congregacion}
                onChange={handleInputChange}
                className="bg-white border-white/30 text-secondary font-bold placeholder:text-secondary/50 h-[48px]"
                placeholder="Tu congregación"
                required
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
                Enviar Testimonio
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TestimonioView;
