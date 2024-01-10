import BasicInfo from '@/components/apply/BasicInfo';
import CardInfo from '@/components/apply/CardInfo';
import Terms from '@/components/apply/Terms';
import { useState } from 'react';

function Apply() {
  const [step, setStep] = useState(1);

  return (
    <div>
      {step === 0 ? <Terms /> : null}
      {step === 1 ? <BasicInfo /> : null}
      {step === 2 ? <CardInfo /> : null}
    </div>
  );
}

export default Apply;
