import { useState, useCallback } from 'react';
import { toast } from '@/components/ui/use-toast';
import { getSupabase } from '@/lib/supabaseClient';
import { setUser } from '@/lib/userLocal';

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
    if (
      !formData?.nombre ||
      !String(formData.nombre).trim() ||
      !formData?.telefono ||
      !String(formData.telefono).trim()
    ) {
      toast({
        title: 'Campos requeridos',
        description: 'Por favor completa tu Nombre y Celular',
        variant: 'destructive',
      });
      return false;
    }

    try {
      const supabase = getSupabase();
      if (!supabase) {
        toast({
          title: 'Configuración faltante',
          description:
            'No se detectaron las variables PUBLIC_SUPABASE_URL/ANON_KEY. Contacta al administrador.',
          variant: 'destructive',
        });
        return false;
      }
      const payload = {
        nombre: String(formData.nombre).trim(),
        telefono: String(formData.telefono).trim(),
        distrito: formData.distrito ? String(formData.distrito).trim() : null,
        congregacion: formData.congregacion
          ? String(formData.congregacion).trim()
          : null,
        asistencia: formData.asistencia || 'presencial',
        edad: formData.edad ? String(formData.edad).trim() : null,
      };

      const { data, error } = await supabase
        .from('registros')
        .insert([payload])
        .select()
        .single();

      if (error) {
        console.error('Error insertando en Supabase:', error);
        const details =
          import.meta.env.DEV && error?.message
            ? ` Detalle: ${error.message}`
            : '';
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
      localStorage.setItem('registroData', JSON.stringify(data));
      setIsRegistered(true);

      // Persistir perfil normalizado para prellenar otros formularios
      try {
        setUser({
          id: data?.id ?? null,
          nombre: data?.nombre ?? '',
          telefono: data?.telefono ?? '',
          distrito: data?.distrito ?? '',
          congregacion: data?.congregacion ?? '',
          asistencia: data?.asistencia ?? 'presencial',
          edad: data?.edad ?? '',
          createdAt: data?.created_at ?? new Date().toISOString(),
        });
      } catch (_) {}
    } catch (e) {
      console.error('Excepción al registrar en Supabase:', e);
      toast({
        title: 'Error inesperado',
        description:
          'Ocurrió un error inesperado al registrar. Intenta de nuevo.',
        variant: 'destructive',
      });
      return false;
    }

    toast({
      title: '¡Registro exitoso! ',
      description: 'Gracias por registrarte al evento. ¡Te esperamos!',
    });
    return true;
  }, []);

  const handleTestimonioSubmit = useCallback(async (testimonioData) => {
    // Validación mínima
    if (
      !testimonioData?.nombre ||
      !String(testimonioData.nombre).trim() ||
      !testimonioData?.testimonio ||
      !String(testimonioData.testimonio).trim()
    ) {
      toast({
        title: 'Campos requeridos',
        description: 'Por favor completa tu nombre y testimonio',
        variant: 'destructive',
      });
      return false;
    }

    try {
      const supabase = getSupabase();
      if (!supabase) {
        toast({
          title: 'Configuración faltante',
          description:
            'No se detectaron las variables PUBLIC_SUPABASE_URL/ANON_KEY. Contacta al administrador.',
          variant: 'destructive',
        });
        return false;
      }

      const payload = {
        registro_id: testimonioData?.registroId ?? null,
        nombre: String(testimonioData.nombre).trim(),
        telefono: testimonioData?.telefono
          ? String(testimonioData.telefono).trim()
          : null,
        testimonio: String(testimonioData.testimonio).trim(),
      };

      const { error } = await supabase.from('testimonios').insert([payload]);

      if (error) {
        console.error('Error insertando testimonio:', error);
        const details =
          import.meta.env.DEV && error?.message
            ? ` Detalle: ${error.message}`
            : '';
        toast({
          title: 'Error al enviar testimonio',
          description: `No pudimos guardar tu testimonio. Intenta de nuevo.${details}`,
          variant: 'destructive',
        });
        return false;
      }
    } catch (e) {
      console.error('Excepción al enviar testimonio:', e);
      toast({
        title: 'Error inesperado',
        description: 'Ocurrió un error inesperado al enviar tu testimonio.',
        variant: 'destructive',
      });
      return false;
    }

    toast({
      title: '¡Testimonio enviado! 🙏',
      description: 'Gracias por compartir cómo Dios te tocó',
    });
    return true;
  }, []);

  const handleAcompanamientoSubmit = useCallback(async (acompanamientoData) => {
    // Validación mínima
    if (
      !acompanamientoData?.nombre ||
      !String(acompanamientoData.nombre).trim() ||
      !acompanamientoData?.telefono ||
      !String(acompanamientoData.telefono).trim() ||
      !acompanamientoData?.tipoAcompanamiento ||
      !String(acompanamientoData.tipoAcompanamiento).trim()
    ) {
      toast({
        title: 'Campos requeridos',
        description: 'Por favor completa los campos obligatorios',
        variant: 'destructive',
      });
      return false;
    }

    try {
      const supabase = getSupabase();
      if (!supabase) {
        toast({
          title: 'Configuración faltante',
          description:
            'No se detectaron las variables PUBLIC_SUPABASE_URL/ANON_KEY. Contacta al administrador.',
          variant: 'destructive',
        });
        return false;
      }

      const payload = {
        registro_id: acompanamientoData?.registroId ?? null,
        nombre: String(acompanamientoData.nombre).trim(),
        telefono: String(acompanamientoData.telefono).trim(),
        email: acompanamientoData?.email
          ? String(acompanamientoData.email).trim()
          : null,
        tipo_acompanamiento: String(
          acompanamientoData.tipoAcompanamiento,
        ).trim(),
        mensaje: acompanamientoData?.mensaje
          ? String(acompanamientoData.mensaje).trim()
          : null,
        ciudad: acompanamientoData?.ciudad
          ? String(acompanamientoData.ciudad).trim()
          : null,
      };

      const { error } = await supabase
        .from('acompanamientos')
        .insert([payload]);

      if (error) {
        console.error('Error insertando acompañamiento:', error);
        const details =
          import.meta.env.DEV && error?.message
            ? ` Detalle: ${error.message}`
            : '';
        toast({
          title: 'Error al enviar solicitud',
          description: `No pudimos guardar tu solicitud. Intenta de nuevo.${details}`,
          variant: 'destructive',
        });
        return false;
      }
    } catch (e) {
      console.error('Excepción al enviar acompañamiento:', e);
      toast({
        title: 'Error inesperado',
        description: 'Ocurrió un error inesperado al enviar tu solicitud.',
        variant: 'destructive',
      });
      return false;
    }

    toast({
      title: '¡Solicitud enviada! 💙',
      description: 'Pronto nos pondremos en contacto contigo',
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
