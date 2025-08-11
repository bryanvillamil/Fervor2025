import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Users } from 'lucide-react';
import { useForm } from '@/hooks/useForm';

const AcompanamientoView = ({ onSubmit, onBack }) => {
  const [formData, handleInputChange, reset] = useForm({
    nombre: '',
    telefono: '',
    email: '',
    tipoAcompanamiento: '',
    mensaje: ''
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
            <Users className="w-8 h-8 text-blue-400" />
            Solicitar Acompañamiento
          </CardTitle>
          <CardDescription className="text-purple-200 text-lg">
            Estamos aquí para acompañarte en tu caminar espiritual
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="acompanamientoNombre" className="text-white font-medium">Nombre *</Label>
              <Input id="acompanamientoNombre" name="nombre" value={formData.nombre} onChange={handleInputChange} className="bg-white/20 border-white/30 text-white placeholder:text-purple-200" placeholder="Tu nombre" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="acompanamientoTelefono" className="text-white font-medium">Teléfono *</Label>
              <Input id="acompanamientoTelefono" name="telefono" type="tel" value={formData.telefono} onChange={handleInputChange} className="bg-white/20 border-white/30 text-white placeholder:text-purple-200" placeholder="Tu teléfono" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="acompanamientoEmail" className="text-white font-medium">Email</Label>
              <Input id="acompanamientoEmail" name="email" type="email" value={formData.email} onChange={handleInputChange} className="bg-white/20 border-white/30 text-white placeholder:text-purple-200" placeholder="tu@email.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tipoAcompanamiento" className="text-white font-medium">Tipo de Acompañamiento *</Label>
              <select id="tipoAcompanamiento" name="tipoAcompanamiento" value={formData.tipoAcompanamiento} onChange={handleInputChange} className="w-full p-3 bg-white/20 border border-white/30 rounded-md text-white" required>
                <option value="" className="text-gray-800">Selecciona una opción</option>
                <option value="oracion" className="text-gray-800">Oración</option>
                <option value="consejeria" className="text-gray-800">Consejería Pastoral</option>
                <option value="discipulado" className="text-gray-800">Discipulado</option>
                <option value="visitaPastoral" className="text-gray-800">Visita Pastoral</option>
                <option value="otro" className="text-gray-800">Otro</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="mensaje" className="text-white font-medium">Mensaje (opcional)</Label>
              <textarea id="mensaje" name="mensaje" value={formData.mensaje} onChange={handleInputChange} className="w-full min-h-24 p-3 bg-white/20 border border-white/30 rounded-md text-white placeholder:text-purple-200 resize-none" placeholder="Cuéntanos más sobre tu solicitud..." />
            </div>
            <div className="flex gap-4">
              <Button type="button" onClick={onBack} variant="outline" className="flex-1 border-white/30 text-white hover:bg-white/10">Volver</Button>
              <Button type="submit" className="flex-1 bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-white font-bold">Enviar Solicitud</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AcompanamientoView;