import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Users, Phone, Mail, MapPin, Calendar } from 'lucide-react';
import { useForm } from '@/hooks/useForm';

const RegistroView = ({ onSubmit, onRegisterSuccess }) => {
  const [formData, handleInputChange] = useForm({
    nombre: '',
    telefono: '',
    distrito: '',
    congregacion: '',
    asistencia: 'presencial',
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.nombre || !formData.nombre.trim()) {
      newErrors.nombre = 'Este campo es obligatorio';
    }
    const tel = (formData.telefono || '').trim();
    if (!tel) {
      newErrors.telefono = 'Este campo es obligatorio';
    } else if (!/^[0-9+()\-.\s]{7,}$/.test(tel)) {
      newErrors.telefono = 'Ingresa un teléfono válido';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstKey = Object.keys(newErrors)[0];
      const el = document.getElementById(firstKey);
      if (el && typeof el.scrollIntoView === 'function') {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    const success = await onSubmit(formData);
    if (success) {
      onRegisterSuccess();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-2xl mx-auto bg-gray-900 rounded-2xl"
    >
      <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl ">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl text-white flex items-center justify-center gap-3">
            <Users className="w-8 h-8 text-yellow-400" />
            Registro de Asistencia
          </CardTitle>
          <CardDescription className="text-purple-200 text-lg">
            Completa tu registro para confirmar tu asistencia al evento
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="nombre" className="text-white font-medium">Nombre Completo *</Label>
                <Input
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={(e) => {
                    if (errors.nombre) setErrors((prev) => ({ ...prev, nombre: undefined }));
                    handleInputChange(e);
                  }}
                  aria-invalid={!!errors.nombre}
                  className={`bg-white/20 border-white/30 text-white placeholder:text-purple-200 ${errors.nombre ? 'border-red-500 ring-1 ring-red-500 placeholder:text-red-200' : ''}`}
                  placeholder="Tu nombre"
                  required
                />
                {errors.nombre && (
                  <p className="text-red-400 text-sm">{errors.nombre}</p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="telefono" className="text-white font-medium flex items-center gap-2"><Phone className="w-4 h-4" />Celular *</Label>
              <Input
                id="telefono"
                name="telefono"
                type="tel"
                value={formData.telefono}
                onChange={(e) => {
                  if (errors.telefono) setErrors((prev) => ({ ...prev, telefono: undefined }));
                  handleInputChange(e);
                }}
                aria-invalid={!!errors.telefono}
                className={`bg-white/20 border-white/30 text-white placeholder:text-purple-200 ${errors.telefono ? 'border-red-500 ring-1 ring-red-500 placeholder:text-red-200' : ''}`}
                placeholder="Tu número de celular"
                required
              />
              {errors.telefono && (
                <p className="text-red-400 text-sm">{errors.telefono}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="distrito" className="text-white font-medium flex items-center gap-2"><MapPin className="w-4 h-4" />A qué Distrito perteneces?</Label>
              <Input id="distrito" name="distrito" type="tel" value={formData.distrito} onChange={handleInputChange} className="bg-white/20 border-white/30 text-white placeholder:text-purple-200" placeholder="Tu distrito" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="congregacion" className="text-white font-medium flex items-center gap-2"><MapPin className="w-4 h-4" />Nombre de tu Congregación</Label>
              <Input id="congregacion" name="congregacion" value={formData.congregacion} onChange={handleInputChange} className="bg-white/20 border-white/30 text-white placeholder:text-purple-200" placeholder="Tu congregación" />
            </div>
            <div className="space-y-2">
              <Label className="text-white font-medium flex items-center gap-2">
                <MapPin className="w-4 h-4" />Asistencia
              </Label>
              <div className="flex items-center gap-6 text-white">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="asistencia"
                    value="presencial"
                    checked={formData.asistencia === 'presencial'}
                    onChange={handleInputChange}
                    className="accent-brand-500"
                  />
                  <span>Presencial</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="asistencia"
                    value="virtual"
                    checked={formData.asistencia === 'virtual'}
                    onChange={handleInputChange}
                    className="accent-brand-500"
                  />
                  <span>Virtual</span>
                </label>
              </div>
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold py-3 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
              <Calendar className="w-5 h-5 mr-2" />
              Confirmar Asistencia
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RegistroView;