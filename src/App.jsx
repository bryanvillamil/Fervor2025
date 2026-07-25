import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/Toaster';
import { useEventData } from '@/hooks/useEventData';
import { getCurrentYear } from '@/lib/utils';

import LoadingView from '@/components/views/LoadingView';
import RegistroView from '@/components/views/RegistroView';
import GraciasView from '@/components/views/GraciasView';
import OpcionesView from '@/components/views/OpcionesView';
import TestimonioView from '@/components/views/LLenoEspirituSantoView';
import TestimonioTextoView from '@/components/views/TestimonioView';
import AcompanamientoView from '@/components/views/AcompanamientoView';

function App() {
  const [currentView, setCurrentView] = useState('loading');
  const {
    checkRegistration,
    handleRegistroSubmit,
    handleEspirituSantoSubmit,
    handleTestimonioTextoSubmit,
    handleAcompanamientoSubmit,
  } = useEventData();

  useEffect(() => {
    const registered = checkRegistration();
    if (registered) {
      setCurrentView('opciones');
    } else {
      setCurrentView('registro');
    }
  }, [checkRegistration]);

  const renderView = () => {
    switch (currentView) {
      case 'registro':
        return (
          <RegistroView
            onSubmit={handleRegistroSubmit}
            onRegisterSuccess={() => setCurrentView('gracias')}
          />
        );
      case 'gracias':
        return <GraciasView onContinue={() => setCurrentView('opciones')} />;
      case 'opciones':
        return <OpcionesView onSelectView={setCurrentView} />;
      case 'testimonio':
        return (
          <TestimonioView
            onSubmit={handleEspirituSantoSubmit}
            onBack={() => setCurrentView('opciones')}
          />
        );
      case 'acompanamiento':
        return (
          <AcompanamientoView
            onSubmit={handleAcompanamientoSubmit}
            onBack={() => setCurrentView('opciones')}
          />
        );
      case 'testimonioTexto':
        return (
          <TestimonioTextoView
            onSubmit={handleTestimonioTextoSubmit}
            onBack={() => setCurrentView('opciones')}
          />
        );
      case 'loading':
      default:
        return <LoadingView />;
    }
  };
  //   bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900
  return (
    <div className="h-full">
      <Helmet>
        <title>{`Registro Fervor ${getCurrentYear()} — Identidad Celestial`}</title>
        <meta name="description" content={`Regístrate en Fervor ${getCurrentYear()} — Identidad Celestial`} />
        <meta property="og:title" content={`Fervor ${getCurrentYear()} — Identidad Celestial`} />

        <meta
          property="og:description"
          content={`Regístrate en Fervor ${getCurrentYear()} — Identidad Celestial`}
        />
      </Helmet>

      <div className="mx-auto">
        {renderView()}
      </div>

      <Toaster />
    </div>
  );
}

export default App;
