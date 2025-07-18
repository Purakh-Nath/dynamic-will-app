import useFormStore from '../hooks/useFormStore';
import { forwardRef } from 'react';

const orange = '#ff6600';
const heading = {
  fontSize: '24px',
  fontWeight: 'bold',
  textAlign: 'center',
  color: orange,
  margin: '0 0 10px 0',
  textDecoration: 'underline',
};
const subheading = {
  fontSize: '16px',
  fontWeight: 'bold',
  color: orange,
  margin: '18px 0 8px 0',
  textDecoration: 'underline',
};
const para = {
  margin: '10px 0',
  textAlign: 'justify',
  fontSize: '13px',
  lineHeight: 1.6,
};
const tableStyle = {
  borderCollapse: 'collapse',
  width: '100%',
  margin: '10px 0 18px 0',
  fontSize: '13px',
  pageBreakInside: 'avoid', //avoid breaking table across pages
};
const th = {
  border: '1px solid #bbb',
  padding: '4px 8px',
  textAlign: 'left',
  background: '#eee',
  fontWeight: 'bold',
};
const td = {
  border: '1px solid #bbb',
  padding: '4px 8px',
  textAlign: 'left',
};
const signBlock = {
  marginTop: 40,
  textAlign: 'center',
  fontSize: '14px',
};
const line = {
  display: 'inline-block',
  borderBottom: '1px solid #222',
  width: '180px',
  margin: '0 10px',
};
const witnessLabel = {
  color: orange,
  fontWeight: 'bold',
  marginTop: 24,
};
const sectionLabel = {
  color: orange,
  fontWeight: 'bold',
  margin: '14px 0 6px 0',
  fontSize: '15px',
};
const subSectionLabel = {
  color: orange,
  fontWeight: 'bold',
  margin: '8px 0 4px 0',
  fontSize: '13px',
};

const renderAssetTable = (title, rows, headers, fields, snLabel = 'S.N', extraStyle = {}) => (
  <div style={{ marginBottom: 10, ...extraStyle }}>
    <div style={subSectionLabel}>{title}</div>
    <table style={tableStyle}>
      <thead>
        <tr>
          <th style={th}>{snLabel}</th>
          {headers.map((h, i) => (
            <th key={i} style={th}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows && rows.length > 0 && rows.some(r => Object.values(r).some(Boolean)) ? (
          rows.map((row, i) => (
            <tr key={i}>
              <td style={td}>{i + 1}</td>
              {fields.map((f, j) => (
                <td key={j} style={td}>{row[f] || ''}</td>
              ))}
            </tr>
          ))
        ) : (
          <tr><td colSpan={fields.length + 1} style={{ ...td, color: '#888', fontStyle: 'italic' }}>No records provided.</td></tr>
        )}
      </tbody>
    </table>
  </div>
);

const WillPlainPreview = forwardRef((props, ref) => {
  const { personalInfo, beneficiaries, assets, otherDetails } = useFormStore();

  if (!personalInfo.name || !personalInfo.fatherName || !personalInfo.date) {
    return (
      <div ref={ref}>
        Please fill in at least the basic information (Name, Father's Name, and Date) to preview the will.
      </div>
    );
  }

  return (
    <div ref={ref} style={{ fontFamily: 'Arial, sans-serif', color: '#222', background: '#fff', padding: 32, width: '190mm', minHeight: '270mm' }}>
      <div style={heading}>Will of <span style={{ fontWeight: 'bold' }}>{personalInfo.name}</span> <span style={{ fontWeight: 'normal', color: '#222', fontSize: '18px' }}>(Testator)</span></div>
      <div style={para}>
        I, <span style={{ fontWeight: 'bold' }}>{personalInfo.name}</span> son of <span style={{ fontWeight: 'bold' }}>{personalInfo.fatherName}</span> residing at <span style={{ fontWeight: 'bold' }}>{personalInfo.address}</span> declare this to be my LAST WILL being made on <span style={{ fontWeight: 'bold' }}>{personalInfo.date}</span>.
      </div>
      <div style={para}>
        I revoke all prior wills, codicils & testamentary dispositions previously made by me. I am in good health and of sound mind, and am not making this will under any persuasion or coercion.
      </div>
      <div style={para}>
        I give, devise and bequeath all remaining movable and immovable assets, financial and physical assets owned by me and belonging to no one else to the following Beneficiaries as mentioned in this Will:
      </div>
      <div style={sectionLabel}>List of Beneficiaries</div>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={th}>S.N</th>
            <th style={th}>Name of Beneficiary</th>
            <th style={th}>Relationship to the Testator</th>
            <th style={th}>PAN / Aadhar No</th>
            <th style={th}>Place of Residence</th>
            <th style={th}>Age</th>
          </tr>
        </thead>
        <tbody>
          {(beneficiaries || []).map((b, i) => (
            <tr key={i}>
              <td style={td}>{i + 1}</td>
              <td style={td}>{b.name || ''}</td>
              <td style={td}>{b.relationship || ''}</td>
              <td style={td}>{b.idNo || ''}</td>
              <td style={td}>{b.address || ''}</td>
              <td style={td}>{b.age || ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={para}>Below is the list of Assets and Percentage Share of each asset I would like to transfer to the above Beneficiaries:</div>
      <div style={sectionLabel}>I. Movable Assets (Financial Assets)</div>
      {renderAssetTable('a. Bank Accounts', assets.bankAccounts, ['Bank Name', 'Account Number', 'Type / Remark', "Beneficiary's Name", '% Share'], ['bankName', 'accountNumber', 'remark', 'beneficiary', 'share'])}
      {renderAssetTable('b. Insurance Policies', assets.insurance, ['Name of the Policy', 'Policy Number', 'Type / Remark', "Beneficiary's Name", '% Share'], ['name', 'number', 'remark', 'beneficiary', 'share'])}
      {renderAssetTable('c. Stocks', assets.stocks, ['Brokerage Firm', 'Account No', 'Type / Remark', "Beneficiary's Name", '% Share'], ['broker', 'accountNumber', 'remark', 'beneficiary', 'share'])}
      {renderAssetTable('d. Mutual Funds', assets.mutualFunds, ['MF Distributor', 'Account No', 'Type / Remark', "Beneficiary's Name", '% Share'], ['distributor', 'accountNumber', 'remark', 'beneficiary', 'share'])}
      <div style={sectionLabel}>II. Movable Assets (Physical Assets)</div>
      {renderAssetTable('e. Jewellery', assets.jewellery, ['Type of Jewellery', 'Invoice Number', 'Type / Remark', "Beneficiary's Name", '% Share'], ['type', 'invoice', 'remark', 'beneficiary', 'share'], 'Sr. No', { marginTop: 30 })}
      <div style={sectionLabel}>III. Immovable Assets</div>
      {renderAssetTable('f. House', assets.house, ['Name of the Property', 'Registration Number', 'Type / Remark', "Beneficiary's Name", '% Share'], ['name', 'registration', 'remark', 'beneficiary', 'share'])}
      {renderAssetTable('g. Land', assets.land, ['Name of the Land', 'Registration Number', 'Type / Remark', "Beneficiary's Name", '% Share'], ['name', 'registration', 'remark', 'beneficiary', 'share'])}
      <div style={sectionLabel}>Residue Assets:</div>
      <div style={para}>{otherDetails.residueClause || 'I have mentioned all the assets that I possess. In case if anything is left out or if I purchase anything after this Will is made then it should transferred to my wife, completely.'}</div>
      <div style={sectionLabel}>Guardian:</div>
      <div style={para}>If my wife <span style={{ fontWeight: 'bold' }}>{otherDetails.guardianName || ''}</span> predeceases me, I appoint my elder brother <span style={{ fontWeight: 'bold' }}>{otherDetails.guardianName || ''}</span> as the guardian for my children till they turn age 21. He shall be responsible for taking care of assets till age 21 and handing over the assets.</div>
      <div style={sectionLabel}>Discharge of Liabilities:</div>
      <div style={para}>On my death, the beneficiaries shall equally bear the administration expenses of Will Execution. And shall discharge my debts / liabilities from respective assets attached to the liabilities if any.</div>
      <div style={sectionLabel}>Executors:</div>
      <div style={para}>I appoint my elder brother <span style={{ fontWeight: 'bold' }}>{otherDetails.executor1 || ''}</span> son of <span style={{ fontWeight: 'bold' }}>{personalInfo.fatherName || ''}</span> resident of <span style={{ fontWeight: 'bold' }}>{personalInfo.address || ''}</span> to be the executor of this will. If <span style={{ fontWeight: 'bold' }}>{otherDetails.executor1 || ''}</span> predeceases before me, my younger sister <span style={{ fontWeight: 'bold' }}>{otherDetails.executor2 || ''}</span> daughter of <span style={{ fontWeight: 'bold' }}>{personalInfo.fatherName || ''}</span> resident of <span style={{ fontWeight: 'bold' }}>{personalInfo.address || ''}</span> will be the executor of this will.</div>
      <div style={para}>I hereby sign this will on <span style={{ fontWeight: 'bold' }}>{personalInfo.date || ''}</span> at <span style={{ fontWeight: 'bold' }}>{personalInfo.address || ''}</span> in the presence of the following persons who have witnessed this will in my presence:</div>
      <div style={witnessLabel}>Witness 1 (Sign)</div>
      <div><strong>Name:</strong> {otherDetails.witness1?.name || '____________________'}</div>
      <div><strong>Address:</strong> {otherDetails.witness1?.address || '____________________'}</div>
      <div><strong>Date:</strong> {otherDetails.witness1?.date || '____________________'}</div>
      <div style={witnessLabel}>Witness 2 (Sign)</div>
      <div><strong>Name:</strong> {otherDetails.witness2?.name || '____________________'}</div>
      <div><strong>Address:</strong> {otherDetails.witness2?.address || '____________________'}</div>
      <div><strong>Date:</strong> {otherDetails.witness2?.date || '____________________'}</div>
      <div style={witnessLabel}>Testator (Sign)</div>
      <div><strong>Name:</strong> {personalInfo.name || '____________________'}</div>
      <div><strong>Address:</strong> {personalInfo.address || '____________________'}</div>
      <div><strong>Date:</strong> {personalInfo.date || '____________________'}</div>
    </div>
  );
});

export default WillPlainPreview; 