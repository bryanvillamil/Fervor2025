import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import { useEventData } from '@/hooks/useEventData';

import Header from '@/components/views/Header';
import LoadingView from '@/components/views/LoadingView';
import RegistroView from '@/components/views/RegistroView';
import GraciasView from '@/components/views/GraciasView';
import OpcionesView from '@/components/views/OpcionesView';
import TestimonioView from '@/components/views/TestimonioView';
import AcompanamientoView from '@/components/views/AcompanamientoView';

function App() {
  const [currentView, setCurrentView] = useState('loading');
  const { 
    isRegistered, 
    checkRegistration,
    handleRegistroSubmit,
    handleTestimonioSubmit,
    handleAcompanamientoSubmit
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
        return <RegistroView onSubmit={handleRegistroSubmit} onRegisterSuccess={() => setCurrentView('gracias')} />;
      case 'gracias':
        return <GraciasView onContinue={() => setCurrentView('opciones')} />;
      case 'opciones':
        return <OpcionesView onSelectView={setCurrentView} />;
      case 'testimonio':
        return <TestimonioView onSubmit={handleTestimonioSubmit} onBack={() => setCurrentView('opciones')} />;
      case 'acompanamiento':
        return <AcompanamientoView onSubmit={handleAcompanamientoSubmit} onBack={() => setCurrentView('opciones')} />;
      case 'loading':
      default:
        return <LoadingView />;
    }
  };
//   bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900
  return (
    <div className="min-h-screen  bg-[#FBEDD7]">
      <Helmet>
        <title>Evento Especial - Iglesia</title>
        <meta name="description" content="Únete a nuestro evento especial de la iglesia. Regístrate y comparte tu experiencia con Dios." />
        <meta property="og:title" content="Evento Especial - Iglesia" />
        <meta property="og:description" content="Únete a nuestro evento especial de la iglesia. Regístrate y comparte tu experiencia con Dios." />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <Header />
        {renderView()}
      </div>

      <Toaster />
    </div>
  );
}

export default App;