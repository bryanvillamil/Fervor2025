import { useState, useCallback } from 'react';
import { toast } from '@/components/ui/use-toast';
import { getSupabase } from '@/lib/supabaseClient';
import { setUser } from '@/lib/userLocal';
import { getCurrentYear } from '@/lib/utils';

export const useEventData = () => {
  const [isRegistered, setIsRegistered] = useState(() => {
    return !!localStorage.getItem('eventoIglesiaRegistrado');
  });

  const checkRegistration = useCallback(() => {
    const registered = !!localStorage.getItem('eventoIglesiaRegistrado');
    setIsRegistered(registered);
    return registered;
  }, []);

  // Nuevo: enviar testimonios de texto simples
  const handleTestimonioTextoSubmit = useCallback(async (data) => {
    // Validación: requiere únicamente el texto del testimonio
    if (!data?.testimonio || !String(data.testimonio).trim()) {
      toast({
        title: 'Campos requeridos',
        description: 'Por favor escribe tu testimonio',
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
        registro_id: data?.registroId ?? null,
        testimonio: String(data.testimonio).trim(),
      };

      const { error } = await supabase.from('testimonios').insert([payload]);
      if (error) {
        console.error('Error insertando testimonio de texto:', error);
        toast({
          title: 'Error al enviar testimonio',
          description: 'No pudimos guardar tu testimonio. Intenta de nuevo.',
          variant: 'destructive',
        });
        return false;
      }
    } catch (e) {
      console.error('Excepción al enviar testimonio de texto:', e);
      toast({
        title: 'Error inesperado',
        description: 'Ocurrió un error inesperado al enviar tu testimonio.',
        variant: 'destructive',
      });
      return false;
    }

    toast({
      title: '¡Testimonio enviado! 🙏',
      description: 'Gracias por compartir lo que Dios hizo en tu vida',
      variant: 'success',
    });
    return true;
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
        bautizado_en_el_nombre:
          formData?.bautizadoEnNombreDeJesus === 'SI' ? 'SI' : 'NO',
      };

      const { data, error } = await supabase
        .from('registros')
        .insert([payload])
        .select()
        .single();

      if (error) {
        console.error('Error insertando en Supabase:', error);
        const msg = String(error?.message || '').toLowerCase();
        const isDuplicate =
          error?.code === '23505' ||
          msg.includes('duplicate key') ||
          msg.includes('unique constraint');

        if (isDuplicate) {
          toast({
            title: 'Registro ya realizado',
            description:
              'Solo puedes llenar el formulario con tus datos una vez.',
            variant: 'warning',
          });
        } else {
          const details =
            import.meta.env.DEV && error?.message
              ? ` Detalle: ${error.message}`
              : '';
          toast({
            title: 'Error al registrar',
            description: `No pudimos guardar tu registro. Intenta de nuevo en unos minutos.${details}`,
            variant: 'destructive',
          });
        }
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
      description: `Gracias por registrarte a Fervor ${getCurrentYear()}. ¡Dios Te bendiga!`,
      variant: 'success',
    });
    return true;
  }, []);

  const handleEspirituSantoSubmit = useCallback(async (testimonioData) => {
    if (
      !testimonioData?.nombre ||
      !String(testimonioData.nombre).trim() ||
      !testimonioData?.telefono ||
      !String(testimonioData.telefono).trim() ||
      !testimonioData?.recibielespiritusanto
    ) {
      toast({
        title: 'Campos requeridos',
        description:
          'Por favor completa tu nombre, teléfono y confirma si recibiste el Espíritu Santo',
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
        telefono: String(testimonioData.telefono).trim(),
        distrito: testimonioData?.distrito
          ? String(testimonioData.distrito).trim()
          : null,
        congregacion: testimonioData?.congregacion
          ? String(testimonioData.congregacion).trim()
          : null,
        recibielespiritusanto: testimonioData?.recibielespiritusanto
          ? 'SI'
          : 'NO',
      };

      const { error } = await supabase
        .from('llenosdelespiritusanto')
        .insert([payload]);

      if (error) {
        console.error('Error insertando en llenosdelespiritusanto:', error);
        const msg = String(error?.message || '').toLowerCase();
        const isDuplicate =
          error?.code === '23505' ||
          msg.includes('duplicate key') ||
          msg.includes('unique constraint');

        if (isDuplicate) {
          toast({
            title: 'Registro ya realizado',
            description:
              'Solo puedes llenar el formulario con tus datos una vez.',
            variant: 'warning',
          });
        } else {
          const details =
            import.meta.env.DEV && error?.message
              ? ` Detalle: ${error.message}`
              : '';
          toast({
            title: 'Error al registrar',
            description: `No pudimos guardar tu registro. Intenta de nuevo.${details}`,
            variant: 'destructive',
          });
        }
        return false;
      }
    } catch (e) {
      console.error('Excepción al registrar llenura del Espíritu Santo:', e);
      toast({
        title: 'Error inesperado',
        description: 'Ocurrió un error inesperado al enviar tu registro.',
        variant: 'destructive',
      });
      return false;
    }

    toast({
      title: '¡Registro enviado! 🙏',
      description: 'Gracias por compartir que recibiste el Espíritu Santo',
      variant: 'success',
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
        tipo_acompanamiento: String(
          acompanamientoData.tipoAcompanamiento,
        ).trim(),
        mensaje: acompanamientoData?.mensaje
          ? String(acompanamientoData.mensaje).trim()
          : null,
        distrito: acompanamientoData?.distrito
          ? String(acompanamientoData.distrito).trim()
          : null,
        congregacion: acompanamientoData?.congregacion
          ? String(acompanamientoData.congregacion).trim()
          : null,
      };

      const { error } = await supabase
        .from('acompanamientos')
        .insert([payload]);

      if (error) {
        console.error('Error insertando acompañamiento:', error);
        const msg = String(error?.message || '').toLowerCase();
        const isDuplicate =
          error?.code === '23505' ||
          msg.includes('duplicate key') ||
          msg.includes('unique constraint');

        if (isDuplicate) {
          toast({
            title: '!Registro ya realizado',
            description:
              'Solo puedes llenar el formulario con tus datos una vez.',
            variant: 'destructive',
          });
        } else {
          const details =
            import.meta.env.DEV && error?.message
              ? ` Detalle: ${error.message}`
              : '';
          toast({
            title: 'Error al enviar solicitud',
            description: `No pudimos guardar tu solicitud. Intenta de nuevo.${details}`,
            variant: 'destructive',
          });
        }
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
      variant: 'success',
    });
    return true;
  }, []);

  return {
    isRegistered,
    checkRegistration,
    handleRegistroSubmit,
    handleEspirituSantoSubmit,
    handleAcompanamientoSubmit,
    handleTestimonioTextoSubmit,
  };
};
