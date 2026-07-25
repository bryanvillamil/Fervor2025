import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import {
  Users,
  Phone,
  House,
  Contact,
  MapPin,
  Calendar,
  Handshake,
  ArrowRight,
} from 'lucide-react';
import { useForm } from '@/hooks/useForm';
import { getCurrentYear } from '@/lib/utils';

const RegistroView = ({ onSubmit, onRegisterSuccess }) => {
  const [formData, handleInputChange] = useForm({
    nombre: '',
    telefono: '',
    distrito: '',
    congregacion: '',
    asistencia: 'presencial',
    edad: '',
    bautizadoEnNombreDeJesus: 'SI',
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

  const fieldVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.06 * i, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  const inputClass = (field) =>
    `h-[48px] rounded-xl border bg-primary/[0.03] font-montserratMedium text-sm text-primary placeholder:text-primary/30 focus:border-terceary focus:ring-1 focus:ring-terceary/30 transition-colors ${
      errors[field]
        ? 'border-red-400 ring-1 ring-red-400/30'
        : 'border-primary/10'
    }`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto max-w-2xl"
    >
      <Card className="overflow-hidden rounded-2xl border border-primary/[0.06] bg-white shadow-[0_20px_60px_rgba(0,22,42,0.08)] mt-28">
        {/* Header */}
        <CardHeader className="relative overflow-hidden border-b border-primary/[0.06] bg-gradient-to-br from-primary via-primary to-celestial px-6 py-8 text-center sm:px-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_120%,rgba(5,219,242,0.15),transparent)]" />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5, type: 'spring' }}
            className="relative mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-terceary/15 ring-1 ring-terceary/20"
          >
            <Users className="h-6 w-6 text-terceary" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="relative font-bebasNeue text-3xl tracking-wide text-white"
          >
            Registro de asistencia
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="relative mt-2 text-[10px] font-montserratBold uppercase tracking-[0.3em] text-terceary/80"
          >
            FERVOR {getCurrentYear()} · IDENTIDAD CELESTIAL
          </motion.p>
        </CardHeader>

        {/* Form */}
        <CardContent className="p-6 sm:p-10">
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {[
              {
                id: 'nombre',
                label: 'Nombre Completo',
                icon: Contact,
                placeholder: 'Tu nombre completo',
                type: 'text',
                idx: 0,
              },
              {
                id: 'telefono',
                label: 'Celular',
                icon: Phone,
                placeholder: 'Tu número de celular',
                type: 'tel',
                idx: 1,
              },
              {
                id: 'distrito',
                label: '¿A qué Distrito perteneces?',
                icon: MapPin,
                placeholder: 'Tu distrito',
                type: 'tel',
                idx: 2,
              },
              {
                id: 'congregacion',
                label: 'Nombre de tu Congregación',
                icon: House,
                placeholder: 'Tu congregación',
                type: 'text',
                idx: 3,
              },
            ].map(({ id, label, icon: Icon, placeholder, type, idx }) => (
              <motion.div
                key={id}
                custom={idx}
                initial="hidden"
                animate="visible"
                variants={fieldVariants}
                className="space-y-2"
              >
                <Label
                  htmlFor={id}
                  className="flex items-center gap-2 text-sm font-montserratBold text-primary/70"
                >
                  <Icon className="h-4 w-4 text-terceary" />
                  {label} *
                </Label>
                <Input
                  id={id}
                  name={id}
                  type={type}
                  value={formData[id]}
                  onChange={(e) => {
                    if (errors[id])
                      setErrors((prev) => ({ ...prev, [id]: undefined }));
                    handleInputChange(e);
                  }}
                  aria-invalid={!!errors[id]}
                  className={inputClass(id)}
                  placeholder={placeholder}
                  required
                />
                {errors[id] && (
                  <p className="text-xs font-montserratBold text-red-500">
                    {errors[id]}
                  </p>
                )}
              </motion.div>
            ))}

            {/* Edad */}
            <motion.div
              custom={4}
              initial="hidden"
              animate="visible"
              variants={fieldVariants}
              className="space-y-2"
            >
              <Label
                htmlFor="edad"
                className="flex items-center gap-2 text-sm font-montserratBold text-primary/70"
              >
                <Calendar className="h-4 w-4 text-terceary" />
                Edad (rango)
              </Label>
              <select
                id="edad"
                name="edad"
                value={formData.edad}
                onChange={handleInputChange}
                className="h-[48px] w-full rounded-xl border border-primary/10 bg-primary/[0.03] px-3 font-montserratMedium text-sm text-primary transition-colors focus:border-terceary focus:ring-1 focus:ring-terceary/30 focus:outline-none"
              >
                <option value="">Selecciona tu rango de edad</option>
                <option value="Menor de 14">Menor de 14 Años</option>
                <option value="15–18">15–18 Años</option>
                <option value="19–29">19–29 Años</option>
                <option value="30–45">30–45 Años</option>
                <option value="45–64">45–64 Años</option>
                <option value="65 o más">65 o más</option>
              </select>
            </motion.div>

            {/* Bautizado */}
            <motion.div
              custom={5}
              initial="hidden"
              animate="visible"
              variants={fieldVariants}
              className="space-y-3"
            >
              <Label className="text-sm font-montserratBold text-primary/70">
                ¿Estás bautizado en el Nombre de Jesús?
              </Label>
              <div className="flex items-center gap-5">
                {['SI', 'NO'].map((val) => (
                  <label
                    key={val}
                    className="flex cursor-pointer items-center gap-2"
                  >
                    <input
                      type="radio"
                      name="bautizadoEnNombreDeJesus"
                      value={val}
                      checked={formData.bautizadoEnNombreDeJesus === val}
                      onChange={handleInputChange}
                      className="h-4 w-4 accent-terceary"
                    />
                    <span className="text-sm font-montserratMedium text-primary">
                      {val === 'SI' ? 'Sí' : 'No'}
                    </span>
                  </label>
                ))}
              </div>
            </motion.div>

            {/* Asistencia */}
            <motion.div
              custom={6}
              initial="hidden"
              animate="visible"
              variants={fieldVariants}
              className="space-y-3"
            >
              <Label className="flex items-center gap-2 text-sm font-montserratBold text-primary/70">
                <Handshake className="h-4 w-4 text-terceary" />
                Asistencia *
              </Label>
              <div className="flex items-center gap-3">
                {[
                  { val: 'presencial', label: 'Presencial' },
                  { val: 'virtual', label: 'Virtual' },
                ].map(({ val, label }) => (
                  <label
                    key={val}
                    className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-3 transition-all duration-200 ${
                      formData.asistencia === val
                        ? 'border-terceary bg-terceary/[0.06] text-primary'
                        : 'border-primary/10 bg-primary/[0.02] text-primary/40 hover:border-primary/20'
                    }`}
                  >
                    <input
                      type="radio"
                      name="asistencia"
                      value={val}
                      checked={formData.asistencia === val}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <span className="text-sm font-montserratBold">{label}</span>
                  </label>
                ))}
              </div>
            </motion.div>

            {/* Submit */}
            <motion.div
              custom={7}
              initial="hidden"
              animate="visible"
              variants={fieldVariants}
              className="pt-3"
            >
              <Button
                type="submit"
                className="group w-full rounded-xl bg-gradient-to-r from-primary to-celestial py-6 text-sm font-montserratBold uppercase tracking-[0.12em] text-white shadow-[0_10px_30px_rgba(0,22,42,0.2)] transition-all duration-300 hover:shadow-[0_15px_40px_rgba(0,22,42,0.3)] hover:brightness-110"
              >
                Confirma tu Asistencia
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RegistroView;
