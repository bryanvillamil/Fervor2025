import React, { useState } from 'react';
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
import {
  Users,
  Phone,
  House,
  Contact,
  MapPin,
  Calendar,
  Handshake,
} from 'lucide-react';
import { useForm } from '@/hooks/useForm';

const RegistroView = ({ onSubmit, onRegisterSuccess }) => {
  const [formData, handleInputChange] = useForm({
    nombre: '',
    telefono: '',
    distrito: '',
    congregacion: '',
    asistencia: 'presencial',
    edad: '',
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.nombre || !formData.nombre.trim()) {
      newErrors.nombre = 'Agrega tu Nombre Completo';
    }
    const tel = (formData.telefono || '').trim();
    if (!tel) {
      newErrors.telefono = 'Agrega tu numero de celular';
    } else if (!/^[0-9+()\-.\s]{7,}$/.test(tel)) {
      newErrors.telefono = 'Ingresa un numero de celular válido';
    }
    if (!formData.distrito || !formData.distrito.trim()) {
      newErrors.distrito = 'Agrega el # de tu distrito';
    }
    if (!formData.congregacion || !formData.congregacion.trim()) {
      newErrors.congregacion = 'Agrega tu Congregacion';
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

  // bg-brand-gradient

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-2xl mx-auto bg-champagne rounded-2xl md:mt-8"
    >
      <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl ">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl text-terceary font-bold flex items-center justify-center gap-3 mb-4">
            <Users className="w-6 h-6" />
            Registro de asistencia
          </CardTitle>
          <CardDescription className="text-primary text-sm font-medium">
            Aquí empieza tu momento con el Señor… ¡Bienvenido a Fervor!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="nombre"
                  className="text-gray-900 font-bold flex items-center gap-2"
                >
                  <Contact className="w-5 h-5" />
                  Nombre Completo *
                </Label>
                <Input
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={(e) => {
                    if (errors.nombre)
                      setErrors((prev) => ({ ...prev, nombre: undefined }));
                    handleInputChange(e);
                  }}
                  aria-invalid={!!errors.nombre}
                  className={`bg-white border-white/30 text-secondary font-bold placeholder:text-secondary/50 ${
                    errors.nombre
                      ? 'border-red-500 ring-1 ring-red-500 placeholder:text-red-200'
                      : ''
                  }`}
                  placeholder="Tu nombre"
                />
                {errors.nombre && (
                  <p className="text-red-500 font-bold text-[12px]">
                    {errors.nombre}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="telefono"
                className="text-gray-900 font-bold flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Celular *
              </Label>
              <Input
                id="telefono"
                name="telefono"
                type="tel"
                value={formData.telefono}
                onChange={(e) => {
                  if (errors.telefono)
                    setErrors((prev) => ({ ...prev, telefono: undefined }));
                  handleInputChange(e);
                }}
                aria-invalid={!!errors.telefono}
                className={`bg-white border-white/30 text-secondary font-bold placeholder:text-secondary/50 ${
                  errors.telefono
                    ? 'border-red-500 ring-1 ring-red-500 placeholder:text-red-200'
                    : ''
                }`}
                placeholder="Tu número de celular"
                required
              />
              {errors.telefono && (
                <p className="text-red-500 font-bold text-[12px]">
                  {errors.telefono}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="distrito"
                className="text-gray-900 font-bold flex items-center gap-2"
              >
                <MapPin className="w-5 h-5" />A qué Distrito perteneces? *
              </Label>
              <Input
                id="distrito"
                name="distrito"
                type="tel"
                value={formData.distrito}
                onChange={(e) => {
                  if (errors.distrito)
                    setErrors((prev) => ({ ...prev, distrito: undefined }));
                  handleInputChange(e);
                }}
                aria-invalid={!!errors.distrito}
                className={`bg-white border-white/30 text-secondary font-bold placeholder:text-secondary/50 ${
                  errors.distrito
                    ? 'border-red-500 ring-1 ring-red-500 placeholder:text-red-200'
                    : ''
                }`}
                placeholder="Tu distrito"
                required
              />
              {errors.distrito && (
                <p className="text-red-500 font-bold text-[12px]">
                  {errors.distrito}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="congregacion"
                className="text-gray-900 font-bold flex items-center gap-2"
              >
                <House className="w-5 h-5" />
                Nombre de tu Congregación *
              </Label>
              <Input
                id="congregacion"
                name="congregacion"
                value={formData.congregacion}
                onChange={(e) => {
                  if (errors.congregacion)
                    setErrors((prev) => ({ ...prev, congregacion: undefined }));
                  handleInputChange(e);
                }}
                aria-invalid={!!errors.congregacion}
                className={`bg-white border-white/30 text-secondary font-bold placeholder:text-secondary/50 ${
                  errors.congregacion
                    ? 'border-red-500 ring-1 ring-red-500 placeholder:text-red-200'
                    : ''
                }`}
                placeholder="Tu congregación"
                required
              />
              {errors.congregacion && (
                <p className="text-red-500 font-bold text-[12px]">
                  {errors.congregacion}
                </p>
              )}
            </div>
            {/* Edad por rangos (opcional) */}
            <div className="space-y-2">
              <Label
                htmlFor="edad"
                className="text-gray-900 font-bold flex items-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Edad (rango)
              </Label>
              <select
                id="edad"
                name="edad"
                value={formData.edad}
                onChange={handleInputChange}
                className="bg-white w-full border-white/30 text-secondary font-bold placeholder:text-secondary/50 placeholder:text-[12px] rounded-md h-11 px-3 text-[12px]"
              >
                <option value="" className="text-[11px]">
                  Selecciona tu rango de edad
                </option>
                <option value="Menor de 14">Menor de 14 Años 👦🏻</option>
                <option value="15–18">15–18 Años 🧑🏻‍🦱</option>
                <option value="19–29">19–29 Años 🧑🏻</option>
                <option value="30–45">30–45 Años 👨🏻</option>
                <option value="45–64">45–64 Años 🧔🏻‍♂️</option>
                <option value="65 o más">65 o más 👴🏻</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label className="text-gray-900 font-bold flex items-center gap-2">
                <Handshake className="w-5 h-5" />
                Asistencia *
              </Label>
              <div className="flex items-center gap-6 text-primary font-bold">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="asistencia"
                    value="presencial"
                    checked={formData.asistencia === 'presencial'}
                    onChange={handleInputChange}
                    className="text-primary font-bold"
                  />
                  <span className="text-[12px]">Presencial</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="asistencia"
                    value="virtual"
                    checked={formData.asistencia === 'virtual'}
                    onChange={handleInputChange}
                    className="text-primary font-bold"
                  />
                  <span className="text-[12px]">Virtual</span>
                </label>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/50 hover:to-secondary/50 text-white font-bold py-6 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <Calendar className="w-5 h-5 mr-2" />
              !Confirma tu Asistencia!
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RegistroView;
