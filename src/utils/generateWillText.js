
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function generateWillText(data) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const prompt = `
You're a legal assistant AI trained to draft legally sound Last Wills. Generate a complete, formal, and neatly formatted Will in HTML (ready to render and convert into PDF) using the following details:

- Output Requirements:
- Use HTML headings for sections (h2, h3)
- Format assets and beneficiaries as clean <table> elements
- Use <p> for paragraph content
- Keep layout PDF-friendly and clean
- No external CSS (use inline styles or Tailwind classes if needed)

-------------------------------------
Testator Details:
- Name: ${data.personalInfo.name}
- Father's Name: ${data.personalInfo.fatherName}
- Address: ${data.personalInfo.address}
- Date: ${data.personalInfo.date}

Beneficiaries:
${data.beneficiaries.map((b, i) => (
    `  ${i + 1}. ${b.name}, ${b.relationship}, ${b.age} yrs, ${b.idNo}, ${b.address}`
)).join("\n")}

Assets:
Bank Accounts: ${JSON.stringify(data.assets.bankAccounts)}
Insurance Policies: ${JSON.stringify(data.assets.insurance)}
Stocks: ${JSON.stringify(data.assets.stocks)}
Mutual Funds: ${JSON.stringify(data.assets.mutualFunds)}
Jewellery: ${JSON.stringify(data.assets.jewellery)}
House: ${JSON.stringify(data.assets.house)}
Land: ${JSON.stringify(data.assets.land)}

Other Details:
Residue Clause: ${data.otherDetails.residueClause}
Guardian: ${data.otherDetails.guardianName} (${data.otherDetails.guardianRelation})
Executors: ${data.otherDetails.executor1}, ${data.otherDetails.executor2}

Witnesses:
1. ${data.otherDetails.witness1?.name}, ${data.otherDetails.witness1?.address}, ${data.otherDetails.witness1?.date}
2. ${data.otherDetails.witness2?.name}, ${data.otherDetails.witness2?.address}, ${data.otherDetails.witness2?.date}

-------------------------------------
Generate the Will in formal tone and structure using proper HTML formatting.
Do not add extra text or commentary — just return the complete HTML content inside <div>.
`;


  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    return response.text(); 
  } catch (err) {
    console.error("Gemini error:", err);
    return "⚠️ Could not generate Will. Try again later.";
  }
}

