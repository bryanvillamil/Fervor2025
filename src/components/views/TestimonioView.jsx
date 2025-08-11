import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Heart } from 'lucide-react';
import { useForm } from '@/hooks/useForm';

const TestimonioView = ({ onSubmit, onBack }) => {
  const [formData, handleInputChange, reset] = useForm({
    nombre: '',
    testimonio: '',
    telefono: '',
    email: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await onSubmit(formData);
    if (success) {
      reset();
      onBack();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-2xl mx-auto"
    >
      <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl text-white flex items-center justify-center gap-3">
            <Heart className="w-8 h-8 text-yellow-400" />
            Comparte tu Testimonio
          </CardTitle>
          <CardDescription className="text-purple-200 text-lg">
            Cuéntanos cómo Dios obró en tu vida
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="testimonioNombre" className="text-white font-medium">Nombre *</Label>
              <Input id="testimonioNombre" name="nombre" value={formData.nombre} onChange={handleInputChange} className="bg-white/20 border-white/30 text-white placeholder:text-purple-200" placeholder="Tu nombre" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="testimonio" className="text-white font-medium">Tu Testimonio *</Label>
              <textarea id="testimonio" name="testimonio" value={formData.testimonio} onChange={handleInputChange} className="w-full min-h-32 p-3 bg-white/20 border border-white/30 rounded-md text-white placeholder:text-purple-200 resize-none" placeholder="Comparte cómo Dios te tocó durante el evento..." required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="testimonioTelefono" className="text-white font-medium">Teléfono (opcional)</Label>
              <Input id="testimonioTelefono" name="telefono" type="tel" value={formData.telefono} onChange={handleInputChange} className="bg-white/20 border-white/30 text-white placeholder:text-purple-200" placeholder="Tu teléfono" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="testimonioEmail" className="text-white font-medium">Email (opcional)</Label>
              <Input id="testimonioEmail" name="email" type="email" value={formData.email} onChange={handleInputChange} className="bg-white/20 border-white/30 text-white placeholder:text-purple-200" placeholder="tu@email.com" />
            </div>
            <div className="flex gap-4">
              <Button type="button" onClick={onBack} variant="outline" className="flex-1 border-white/30 text-white hover:bg-white/10">Volver</Button>
              <Button type="submit" className="flex-1 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold">Enviar Testimonio</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TestimonioView;