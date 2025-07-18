import { useState } from 'react';
import StepPersonalInfo from './components/StepPersonalInfo';
import StepBeneficiaries from './components/StepBeneficiaries';
import StepAssets from './components/StepAssets';
import StepAdditionalDetails from './components/StepAdditionalDetails';
import StepPreview from './components/StepPreview';

function App() {
  const [step, setStep] = useState(0);
  const steps = [StepPersonalInfo, StepBeneficiaries, StepAssets, StepAdditionalDetails, StepPreview];
  const Current = steps[step];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
        <Current onNext={() => setStep(step + 1)} onBack={() => setStep(step - 1)} />
      </div>
    </div>
  );
}

export default App;
