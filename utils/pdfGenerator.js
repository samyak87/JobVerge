import PDFDocument from 'pdfkit'; 
import getStream from 'get-stream';

export const generateModifiedPDF = async (resumeText) => {
  const doc = new PDFDocument();

  doc.fontSize(14).text("✨ Improved Resume", { align: 'center' });
  doc.moveDown();
  doc.fontSize(12).text(resumeText || 'No content found.');

  doc.end();

  // Convert PDF stream to buffer to send as download
  const pdfBuffer = await getStream.buffer(doc);
  return pdfBuffer;
};