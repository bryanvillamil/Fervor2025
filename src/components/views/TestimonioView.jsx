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
import { Heart } from 'lucide-react';
import { useForm } from '@/hooks/useForm';
import { getUser } from '@/lib/userLocal';

const TestimonioView = ({ onSubmit, onBack }) => {
  const user = getUser();
  const [formData, handleInputChange, reset] = useForm({
    nombre: user?.nombre || '',
    testimonio: '',
    telefono: user?.telefono || '',
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
          <CardTitle className="text-2xl text-terceary font-bold flex items-center justify-center gap-3">
            <Heart className="w-6 h-6" />
            Comparte tu Testimonio
          </CardTitle>
          <CardDescription className="text-primary text-base font-medium">
            Cuéntanos cómo Dios obró en tu vida
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="testimonioNombre"
                className="text-gray-900 font-bold"
              >
                Nombre *
              </Label>
              <Input
                id="testimonioNombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                className="bg-white border-white/30 text-secondary font-bold placeholder:text-secondary/50"
                placeholder="Tu nombre"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="testimonio" className="text-gray-900 font-bold">
                Tu Testimonio *
              </Label>
              <textarea
                id="testimonio"
                name="testimonio"
                value={formData.testimonio}
                onChange={handleInputChange}
                className="w-full min-h-32 p-3 bg-white border border-white/30 rounded-md text-secondary font-bold placeholder:text-secondary/50 resize-none"
                placeholder="Comparte cómo Dios te tocó durante el evento..."
                required
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="testimonioTelefono"
                className="text-gray-900 font-bold"
              >
                Teléfono (opcional)
              </Label>
              <Input
                id="testimonioTelefono"
                name="telefono"
                type="tel"
                value={formData.telefono}
                onChange={handleInputChange}
                className="bg-white border-white/30 text-secondary font-bold placeholder:text-secondary/50"
                placeholder="Tu teléfono"
              />
            </div>
            <div className="flex gap-4">
              <Button
                type="button"
                onClick={onBack}
                variant="outline"
                className="flex-1 border-secondary/30 text-secondary hover:bg-secondary/10"
              >
                Volver
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-primary/50 hover:to-secondary/50 text-white font-bold"
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
