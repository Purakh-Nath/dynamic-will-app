import React from 'react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import useFormStore from '../hooks/useFormStore';

const styles = StyleSheet.create({
  page: {
    fontSize: 12,
    padding: 32,
    backgroundColor: '#fff',
    color: '#222',
    lineHeight: 1.5,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1f2937',
    marginBottom: 8,
  },
  subheading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    margin: '28px 0 10px 0',
    textDecoration: 'underline',
  },
  section: {
    marginBottom: 18,
  },
  para: {
    margin: '8px 0',
    textAlign: 'justify',
  },
  table: {
    display: 'table',
    width: '100%',
    marginVertical: 10,
    borderStyle: 'solid',
    borderColor: '#e5e7eb',
  },
  tableRow: {
    flexDirection: 'row',
    minHeight: 28,
    alignItems: 'center',
  },
  tableHeader: {
    backgroundColor: '#f3f4f6',
  },
  tableCell: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 6,
    fontSize: 12,
    flex: 1,
    textAlign: 'left',
    minHeight: 28,
    justifyContent: 'center',
    display: 'flex',
  },
  tableCellHeader: {
    fontWeight: 'bold',
    color: '#1f2937',
    backgroundColor: '#f3f4f6',
    fontSize: 13,
  },
  signBlock: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 14,
  },
  witnessBlock: {
    marginTop: 18,
    fontWeight: 'bold',
    color: '#1d4ed8',
  },
  pageBreak: {
    marginTop: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    borderBottomStyle: 'solid',
  },
});

function renderTable(title, rows, headers, fields) {
  return (
    <View style={styles.section} wrap={false}>
      <Text style={styles.subheading}>{title}</Text>
      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={[styles.tableCell, styles.tableCellHeader]}>S.N</Text>
          {headers.map((h, i) => (
            <Text key={i} style={[styles.tableCell, styles.tableCellHeader]}>{h}</Text>
          ))}
        </View>
        {rows && rows.length > 0 && rows.some(r => Object.values(r).some(Boolean)) ? (
          rows.map((row, i) => (
            <View key={i} style={styles.tableRow}>
              <Text style={styles.tableCell}>{i + 1}</Text>
              {fields.map((f, j) => (
                <Text key={j} style={styles.tableCell}>{row[f] ? String(row[f]) : '-'}</Text>
              ))}
            </View>
          ))
        ) : (
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>-</Text>
            {headers.map((_, i) => (
              <Text key={i} style={styles.tableCell}>-</Text>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}

const WillPDFDocument = ({ data }) => {
  const { personalInfo = {}, beneficiaries = [], assets = {}, otherDetails = {} } = data;
  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        {/* Header */}
        <Text style={styles.heading}>Last Will & Testament</Text>
        <Text style={[styles.subheading, { textAlign: 'center', textDecoration: 'none', marginBottom: 16 }]}>of {personalInfo.name || '-'}</Text>
        {/* Introduction */}
        <View style={styles.section}>
          <Text style={styles.para}>
            I, <Text style={{ fontWeight: 'bold' }}>{personalInfo.name || '-'}</Text>, son of <Text style={{ fontWeight: 'bold' }}>{personalInfo.fatherName || '-'}</Text>, residing at <Text style={{ fontWeight: 'bold' }}>{personalInfo.address || '-'}</Text>, declare this to be my LAST WILL made on <Text style={{ fontWeight: 'bold' }}>{personalInfo.date || '-'}</Text>.
          </Text>
          <Text style={styles.para}>
            I revoke all prior wills, codicils & testamentary dispositions previously made by me. I am in good health and of sound mind, and am not making this will under any persuasion or coercion.
          </Text>
        </View>
        {/* Beneficiaries Table */}
        {renderTable(
          'List of Beneficiaries',
          beneficiaries,
          ['Name', 'Relation', 'PAN/Aadhar', 'Residence', 'Age'],
          ['name', 'relationship', 'idNo', 'address', 'age']
        )}
        {/* Movable Financial Assets */}
        <Text style={styles.subheading}>Movable Assets (Financial)</Text>
        {renderTable(
          'Bank Accounts',
          assets.bankAccounts || [],
          ['Bank Name', 'Account No', 'Remark', 'Beneficiary', '% Share'],
          ['bankName', 'accountNumber', 'remark', 'beneficiary', 'share']
        )}
        {renderTable(
          'Insurance Policies',
          assets.insurance || [],
          ['Policy Name', 'Policy No', 'Remark', 'Beneficiary', '% Share'],
          ['name', 'number', 'remark', 'beneficiary', 'share']
        )}
        {renderTable(
          'Stocks',
          assets.stocks || [],
          ['Broker', 'Account No', 'Remark', 'Beneficiary', '% Share'],
          ['broker', 'accountNumber', 'remark', 'beneficiary', 'share']
        )}
        {renderTable(
          'Mutual Funds',
          assets.mutualFunds || [],
          ['Distributor', 'Account No', 'Remark', 'Beneficiary', '% Share'],
          ['distributor', 'accountNumber', 'remark', 'beneficiary', 'share']
        )}
        {/* Movable Physical Assets */}
        <Text style={styles.subheading}>Movable Assets (Physical)</Text>
        {renderTable(
          'Jewellery',
          assets.jewellery || [],
          ['Type', 'Invoice No', 'Remark', 'Beneficiary', '% Share'],
          ['type', 'invoice', 'remark', 'beneficiary', 'share']
        )}
        {/* Immovable Assets */}
        <Text style={styles.subheading}>Immovable Assets</Text>
        {renderTable(
          'House',
          assets.house || [],
          ['Name', 'Registration No', 'Remark', 'Beneficiary', '% Share'],
          ['name', 'registration', 'remark', 'beneficiary', 'share']
        )}
        {renderTable(
          'Land',
          assets.land || [],
          ['Name', 'Registration No', 'Remark', 'Beneficiary', '% Share'],
          ['name', 'registration', 'remark', 'beneficiary', 'share']
        )}
        {/* Additional Sections */}
        <View style={styles.section}>
          <Text style={styles.subheading}>Residue Assets</Text>
          <Text style={styles.para}>{otherDetails.residueClause || '-'}</Text>
          <Text style={styles.subheading}>Guardian</Text>
          <Text style={styles.para}>
            If my wife predeceases me, I appoint <Text style={{ fontWeight: 'bold' }}>{otherDetails.guardianName || '-'}</Text> as guardian for my children. They shall manage assets until the children turn 21.
          </Text>
          <Text style={styles.subheading}>Discharge of Liabilities</Text>
          <Text style={styles.para}>
            On my death, the beneficiaries shall equally bear the execution costs and discharge any outstanding liabilities from the respective assets.
          </Text>
          <Text style={styles.subheading}>Executors</Text>
          <Text style={styles.para}>
            I appoint <Text style={{ fontWeight: 'bold' }}>{otherDetails.executor1 || '-'}</Text> as executor. If unavailable, then <Text style={{ fontWeight: 'bold' }}>{otherDetails.executor2 || '-'}</Text> shall act as executor.
          </Text>
        </View>
        {/* Witnesses */}
        <View style={styles.section}>
          <Text style={styles.subheading}>Witnesses</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
            <View style={{ flex: 1, marginRight: 12 }}>
              <Text style={{ fontWeight: 'bold', marginBottom: 2 }}>Witness 1</Text>
              <Text>Name: {otherDetails.witness1?.name || '-'}</Text>
              <Text>Address: {otherDetails.witness1?.address || '-'}</Text>
              <Text>Date: {otherDetails.witness1?.date || '-'}</Text>
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={{ fontWeight: 'bold', marginBottom: 2 }}>Witness 2</Text>
              <Text>Name: {otherDetails.witness2?.name || '-'}</Text>
              <Text>Address: {otherDetails.witness2?.address || '-'}</Text>
              <Text>Date: {otherDetails.witness2?.date || '-'}</Text>
            </View>
          </View>
        </View>
        {/* Sign-off */}
        <View style={styles.signBlock}>
          <Text style={{ marginBottom: 8 }}>
            I hereby sign this will on <Text style={{ fontWeight: 'bold' }}>{personalInfo.date || '-'}</Text> at <Text style={{ fontWeight: 'bold' }}>{personalInfo.address || '-'}</Text> in the presence of witnesses.
          </Text>
          <Text>_________________________</Text>
          <Text>Signature of Testator</Text>
        </View>
      </Page>
    </Document>
  );
};

const WillPreview = () => {
  const data = useFormStore();
  // Always show the preview, even if fields are missing
  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Final Will Preview</h2>
      {/* PDF Preview */}
      <div className="mb-6">
        <PDFViewer width="100%" height={600} style={{ border: '1px solid #ccc', marginBottom: 16 }}>
          <WillPDFDocument data={data} />
        </PDFViewer>
      </div>
      {/* Download Button */}
      <div className="mb-6">
        <PDFDownloadLink
          document={<WillPDFDocument data={data} />}
          fileName="Last-Will.pdf"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {({ loading }) => (loading ? 'Preparing PDF...' : 'Download PDF')}
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default WillPreview;
