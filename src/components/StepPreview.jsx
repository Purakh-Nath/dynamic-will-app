import { useState } from 'react';
import useFormStore from '../hooks/useFormStore';
import WillPreview from './WillPreview';

export default function StepPreview({ onBack }) {
  const [generatedText, setGeneratedText] = useState('');
  const data = useFormStore();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Final Will Preview</h2>

      <div className="bg-white">
        <WillPreview />
      </div>

      <div className="flex gap-4">
        <button onClick={onBack} className="bg-gray-400 text-white px-4 py-2 rounded">
          Back
        </button>
        <button 
          // onClick={async () => {
          //   setLoading(true);
          //   const text = await generateWillText(data);
          //   setGeneratedText(text);
          //   setLoading(false);
          // }} 
          className="bg-green-600 text-white px-4 py-2 rounded"
          disabled={false}
        >
          Generate with AI (Not implemented)
        </button>
      </div>

      {generatedText && (
        <div className="mt-6 p-4 border rounded bg-gray-50 whitespace-pre-wrap">
          <h3 className="font-semibold mb-2">LLM Generated Will:</h3>
          {generatedText}
        </div>
      )}
    </div>
  );
}
