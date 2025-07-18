import useFormStore from '../hooks/useFormStore';
import { forwardRef } from 'react';

const WillPreview = forwardRef((props, ref) => {

  const { personalInfo, beneficiaries, assets, otherDetails } = useFormStore();
  
  // Check if required fields are filled
  const hasRequiredFields = personalInfo.name && 
                          personalInfo.fatherName && 
                          personalInfo.date;

  if (!hasRequiredFields) {
    return (
      <div className="p-6 text-center text-gray-500">
        Please fill in at least the basic information (Name, Father's Name, and Date) to preview the will.
      </div>
    );
  }
  
  const renderAssetTable = (title, rows, headers, fields) => (
    <div className="mb-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
      {rows && rows.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 border-collapse text-sm">
            <thead className="bg-gray-100">
              <tr>
                {headers.map((h, i) => (
                  <th key={i} className="px-4 py-2 border border-gray-300 text-left font-medium text-gray-700">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  {fields.map((f, j) => (
                    <td key={j} className="px-4 py-2 border border-gray-300 text-gray-700">
                      {row[f] || "-"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 italic">No records provided for {title.toLowerCase()}.</p>
      )}
    </div>
  )

return (
  <div 
    ref={ref} 
    className="bg-white"
    style={{ 
      backgroundColor: '#ffffff',
      width: '210mm',
      minHeight: '297mm',
      padding: '20mm',
      margin: 'auto'
    }}
  >
    <div className="will-preview-content" style={{ color: '#1f2937' }}>
      {/* Header */}
      <div className="text-center mb-10">
        <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>
          Last Will & Testament
        </h1>
        <h2 style={{ fontSize: '1.5rem', color: '#374151' }}>
          of <span style={{ fontWeight: 'bold' }}>{personalInfo.name || "____________________"}</span>
        </h2>
        <div style={{ width: '6rem', height: '2px', backgroundColor: '#d1d5db', margin: '1rem auto' }}></div>
      </div>

      {/* Introduction */}
      <section className="mb-8 text-gray-700 leading-relaxed">
        <p className="mb-4">
          I, <strong className="text-gray-800">{personalInfo.name || "____________________"}</strong>, son of{" "}
          <strong className="text-gray-800">{personalInfo.fatherName || "____________________"}</strong>, residing at{" "}
          <strong className="text-gray-800">{personalInfo.address || "____________________________________"}</strong>,
          declare this to be my LAST WILL made on{" "}
          <strong className="text-gray-800">{personalInfo.date || "____________________"}</strong>.
        </p>
        <p>
          I revoke all prior wills, codicils & testamentary dispositions previously made by me. I am in good health
          and of sound mind, and am not making this will under any persuasion or coercion.
        </p>
      </section>

      {/* Beneficiaries Table */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">List of Beneficiaries</h2>
        {beneficiaries && beneficiaries.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 border-collapse text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border border-gray-300 text-left font-medium text-gray-700">S.N</th>
                  <th className="px-4 py-2 border border-gray-300 text-left font-medium text-gray-700">Name</th>
                  <th className="px-4 py-2 border border-gray-300 text-left font-medium text-gray-700">Relation</th>
                  <th className="px-4 py-2 border border-gray-300 text-left font-medium text-gray-700">PAN/Aadhar</th>
                  <th className="px-4 py-2 border border-gray-300 text-left font-medium text-gray-700">Residence</th>
                  <th className="px-4 py-2 border border-gray-300 text-left font-medium text-gray-700">Age</th>
                </tr>
              </thead>
              <tbody>
                {beneficiaries.map((b, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-4 py-2 border border-gray-300 text-gray-700">{i + 1}</td>
                    <td className="px-4 py-2 border border-gray-300 text-gray-700">{b.name || "-"}</td>
                    <td className="px-4 py-2 border border-gray-300 text-gray-700">{b.relationship || "-"}</td>
                    <td className="px-4 py-2 border border-gray-300 text-gray-700">{b.idNo || "-"}</td>
                    <td className="px-4 py-2 border border-gray-300 text-gray-700">{b.address || "-"}</td>
                    <td className="px-4 py-2 border border-gray-300 text-gray-700">{b.age || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 italic">No beneficiaries provided.</p>
        )}
      </section>

      {/* Movable Financial Assets */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Movable Assets (Financial)</h2>
        {renderAssetTable(
          "Bank Accounts",
          assets.bankAccounts,
          ["Bank Name", "Account No", "Remark", "Beneficiary", "% Share"],
          ["bankName", "accountNumber", "remark", "beneficiary", "share"],
        )}
        {renderAssetTable(
          "Insurance Policies",
          assets.insurance,
          ["Policy Name", "Policy No", "Remark", "Beneficiary", "% Share"],
          ["name", "number", "remark", "beneficiary", "share"],
        )}
        {renderAssetTable(
          "Stocks",
          assets.stocks,
          ["Broker", "Account No", "Remark", "Beneficiary", "% Share"],
          ["broker", "accountNumber", "remark", "beneficiary", "share"],
        )}
        {renderAssetTable(
          "Mutual Funds",
          assets.mutualFunds,
          ["Distributor", "Account No", "Remark", "Beneficiary", "% Share"],
          ["distributor", "accountNumber", "remark", "beneficiary", "share"],
        )}
      </section>

      {/* Movable Physical Assets */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Movable Assets (Physical)</h2>
        {renderAssetTable(
          "Jewellery",
          assets.jewellery,
          ["Type", "Invoice No", "Remark", "Beneficiary", "% Share"],
          ["type", "invoice", "remark", "beneficiary", "share"],
        )}
      </section>

      {/* Immovable Assets */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Immovable Assets</h2>
        {renderAssetTable(
          "House",
          assets.house,
          ["Name", "Registration No", "Remark", "Beneficiary", "% Share"],
          ["name", "registration", "remark", "beneficiary", "share"],
        )}
        {renderAssetTable(
          "Land",
          assets.land,
          ["Name", "Registration No", "Remark", "Beneficiary", "% Share"],
          ["name", "registration", "remark", "beneficiary", "share"],
        )}
      </section>

      {/* Additional Sections */}
      <section className="mb-8 text-gray-700 leading-relaxed">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Residue Assets</h2>
        <p className="mb-6">
          {otherDetails.residueClause ||
            "Any remaining or future-acquired assets shall be transferred to my wife completely."}
        </p>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">Guardian</h2>
        <p className="mb-6">
          If my wife predeceases me, I appoint{" "}
          <strong className="text-gray-800">{otherDetails.guardianName || "____________________"}</strong> as guardian
          for my children. They shall manage assets until the children turn 21.
        </p>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">Discharge of Liabilities</h2>
        <p className="mb-6">
          On my death, the beneficiaries shall equally bear the execution costs and discharge any outstanding
          liabilities from the respective assets.
        </p>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">Executors</h2>
        <p className="mb-6">
          I appoint <strong className="text-gray-800">{otherDetails.executor1 || "____________________"}</strong> as
          executor. If unavailable, then{" "}
          <strong className="text-gray-800">{otherDetails.executor2 || "____________________"}</strong> shall act as
          executor.
        </p>
      </section>

      {/* Witnesses */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Witnesses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-700 leading-relaxed">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Witness 1</h3>
            <p>
              Name: <strong className="text-gray-800">{otherDetails.witness1?.name || "____________________"}</strong>
            </p>
            <p>
              Address:{" "}
              <strong className="text-gray-800">{otherDetails.witness1?.address || "____________________"}</strong>
            </p>
            <p>
              Date: <strong className="text-gray-800">{otherDetails.witness1?.date || "____________________"}</strong>
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Witness 2</h3>
            <p>
              Name: <strong className="text-gray-800">{otherDetails.witness2?.name || "____________________"}</strong>
            </p>
            <p>
              Address:{" "}
              <strong className="text-gray-800">{otherDetails.witness2?.address || "____________________"}</strong>
            </p>
            <p>
              Date: <strong className="text-gray-800">{otherDetails.witness2?.date || "____________________"}</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Sign-off */}
      <section className="mt-10 text-gray-700 leading-relaxed text-center">
        <p className="mb-4">
          I hereby sign this will on{" "}
          <strong className="text-gray-800">{personalInfo.date || "____________________"}</strong> at{" "}
          <strong className="text-gray-800">{personalInfo.address || "____________________"}</strong> in the presence
          of witnesses.
        </p>
        <div className="mt-8 text-lg font-semibold text-gray-800">
          <p>_________________________</p>
          <p>Signature of Testator</p>
        </div>
      </section>
    </div>
  </div>
  );
});

export default WillPreview;
