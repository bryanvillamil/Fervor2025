import { useState, useCallback } from 'react';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';

export const useEventData = () => {
  const [isRegistered, setIsRegistered] = useState(() => {
    return !!localStorage.getItem('eventoIglesiaRegistrado');
  });

  const checkRegistration = useCallback(() => {
    const registered = !!localStorage.getItem('eventoIglesiaRegistrado');
    setIsRegistered(registered);
    return registered;
  }, []);

  const handleRegistroSubmit = useCallback(async (formData) => {
    // Validación alineada con el formulario actual: nombre y telefono son obligatorios
    if (!formData?.nombre || !String(formData.nombre).trim() || !formData?.telefono || !String(formData.telefono).trim()) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa tu Nombre y Celular",
        variant: "destructive"
      });
      return false;
    }

    try {
      const payload = {
        nombre: String(formData.nombre).trim(),
        telefono: String(formData.telefono).trim(),
        distrito: formData.distrito ? String(formData.distrito).trim() : null,
        congregacion: formData.congregacion ? String(formData.congregacion).trim() : null,
        asistencia: formData.asistencia || 'presencial',
      };

      const { data, error } = await supabase
        .from('registros')
        .insert([payload])
        .select()
        .single();

      if (error) {
        console.error('Error insertando en Supabase:', error);
        const details = import.meta.env.DEV && error?.message ? ` Detalle: ${error.message}` : '';
        toast({
          title: 'Error al registrar',
          description: `No pudimos guardar tu registro. Intenta de nuevo en unos minutos.${details}`,
          variant: 'destructive',
        });
        return false;
      }

      console.log('Registro guardado en Supabase:', data);

      // Marcar estado local como registrado
      localStorage.setItem('eventoIglesiaRegistrado', 'true');
      setIsRegistered(true);
    } catch (e) {
      console.error('Excepción al registrar en Supabase:', e);
      toast({
        title: 'Error inesperado',
        description: 'Ocurrió un error inesperado al registrar. Intenta de nuevo.',
        variant: 'destructive',
      });
      return false;
    }

    toast({
      title: "¡Registro exitoso! ",
      description: "Gracias por registrarte al evento. ¡Te esperamos!"
    });
    return true;
  }, []);

  const handleTestimonioSubmit = useCallback(async (testimonioData) => {
    if (!testimonioData.nombre || !testimonioData.testimonio) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa tu nombre y testimonio",
        variant: "destructive"
      });
      return false;
    }

    const testimonioCompleto = {
      ...testimonioData,
      fecha: new Date().toISOString(),
      id: Date.now(),
      tipo: 'testimonio'
    };

    const testimonios = JSON.parse(localStorage.getItem('testimoniosEvento') || '[]');
    testimonios.push(testimonioCompleto);
    localStorage.setItem('testimoniosEvento', JSON.stringify(testimonios));

    toast({
      title: "¡Testimonio enviado! 🙏",
      description: "Gracias por compartir cómo Dios te tocó"
    });
    return true;
  }, []);

  const handleAcompanamientoSubmit = useCallback(async (acompanamientoData) => {
    if (!acompanamientoData.nombre || !acompanamientoData.telefono || !acompanamientoData.tipoAcompanamiento) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa los campos obligatorios",
        variant: "destructive"
      });
      return false;
    }

    const solicitudCompleta = {
      ...acompanamientoData,
      fecha: new Date().toISOString(),
      id: Date.now(),
      tipo: 'acompanamiento'
    };

    const solicitudes = JSON.parse(localStorage.getItem('solicitudesAcompanamiento') || '[]');
    solicitudes.push(solicitudCompleta);
    localStorage.setItem('solicitudesAcompanamiento', JSON.stringify(solicitudes));

    toast({
      title: "¡Solicitud enviada! 💙",
      description: "Pronto nos pondremos en contacto contigo"
    });
    return true;
  }, []);

  return {
    isRegistered,
    checkRegistration,
    handleRegistroSubmit,
    handleTestimonioSubmit,
    handleAcompanamientoSubmit,
  };
};