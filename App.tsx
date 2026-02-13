import React, { useState } from 'react';
import { AppStep, InviteData } from './types';
import CreatorForm from './components/CreatorForm';
import AskScreen from './components/AskScreen';
import EnvelopeReveal from './components/EnvelopeReveal';
import FloatingHearts from './components/FloatingHearts';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.CREATE);
  const [inviteData, setInviteData] = useState<InviteData | null>(null);

  const handleCreateComplete = (data: InviteData) => {
    setInviteData(data);
    setStep(AppStep.ASK);
  };

  const handleAccepted = () => {
    setStep(AppStep.REVEAL);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-red-50 to-pink-100 overflow-hidden relative selection:bg-pink-200">
      <FloatingHearts />

      <main className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen relative z-10">
        {step === AppStep.CREATE && (
          <CreatorForm onComplete={handleCreateComplete} />
        )}

        {step === AppStep.ASK && inviteData && (
          <AskScreen
            receiverName={inviteData.receiverName}
            message={inviteData.message}
            onYes={handleAccepted}
          />
        )}

        {step === AppStep.REVEAL && inviteData && (
          <EnvelopeReveal data={inviteData} />
        )}
      </main>

      <footer className="absolute bottom-2 w-full text-center text-pink-300 text-xs z-0">
        Made with Love & React
      </footer>
    </div>
  );
};

export default App;
