import { useRef, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import useFormStore from '../hooks/useFormStore';
import { generateWillText } from '../utils/generateWillText';
import WillPreview from './WillPreview';
import WillPlainPreview from './WillPlainPreview';

export default function StepPreview({ onBack }) {
  const previewRef = useRef(); // for styled preview (on screen)
  const plainRef = useRef();   // for plain preview (PDF)
  const [loading, setLoading] = useState(false);
  const [generatedText, setGeneratedText] = useState('');
  const data = useFormStore();

  // Multi-page PDF logic
  const downloadPDF = async () => {
    const element = plainRef.current;
    if (!element) {
      alert("Preview not ready!");
      return;
    }
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const canvas = await html2canvas(element, { useCORS: true, scale: 2 });
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true,
      });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgProps = pdf.getImageProperties(imgData);
      const imgWidth = pageWidth;
      const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

      // Calculate pixel height for one PDF page
      const pxPerMm = canvas.width / imgWidth;
      const pageHeightPx = Math.floor(pageHeight * pxPerMm);
      let renderedHeight = 0;
      let pageNum = 0;

      // Create a temporary canvas to hold each page slice
      const pageCanvas = document.createElement('canvas');
      const pageCtx = pageCanvas.getContext('2d');
      pageCanvas.width = canvas.width;
      pageCanvas.height = pageHeightPx;

      while (renderedHeight < canvas.height) {
        pageCtx.clearRect(0, 0, pageCanvas.width, pageCanvas.height);
        // Calculate the height for this slice (last page may be shorter)
        const sliceHeight = Math.min(pageHeightPx, canvas.height - renderedHeight);
        pageCanvas.height = sliceHeight; // Set canvas height to sliceHeight for last page
        pageCtx.clearRect(0, 0, pageCanvas.width, pageCanvas.height);
        pageCtx.drawImage(
          canvas,
          0, renderedHeight, // start y-offset
          canvas.width, sliceHeight, // only draw the remaining part for last page
          0, 0,
          canvas.width, sliceHeight
        );
        const pageImgData = pageCanvas.toDataURL('image/jpeg', 1.0);
        if (pageNum > 0) pdf.addPage();
        pdf.addImage(pageImgData, 'JPEG', 0, 0, imgWidth, (sliceHeight / pxPerMm));
        renderedHeight += sliceHeight;
        pageNum++;
      }
      pdf.save('Last-Will.pdf');
    } catch (error) {
      console.error('PDF generation failed:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Final Will Preview</h2>

      <div className="bg-white">
        <WillPreview ref={previewRef} />
      </div>

      {/* Hidden plain preview for PDF generation */}
      <div style={{ position: 'absolute', left: '-9999px', top: 0, width: '210mm', background: '#fff' }} aria-hidden="true">
        <WillPlainPreview ref={plainRef} />
      </div>

      <div className="flex gap-4">
        <button onClick={onBack} className="bg-gray-400 text-white px-4 py-2 rounded">
          Back
        </button>
        <button 
          onClick={downloadPDF} 
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? 'Generating PDF...' : 'Download PDF'}
        </button>
        <button 
          // onClick={async () => {
          //   setLoading(true);
          //   const text = await generateWillText(data);
          //   setGeneratedText(text);
          //   setLoading(false);
          // }} 
          className="bg-green-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate with AI (Not implemented)'}
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
