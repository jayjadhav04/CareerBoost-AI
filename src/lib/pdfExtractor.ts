import pdf from 'pdf-parse';

/**
 * Extracts plain text from a PDF Buffer.
 * This runs on the server side (Node.js environment).
 * 
 * @param buffer - The raw Buffer of the PDF file.
 * @returns The extracted text content.
 */
export async function extractTextFromPdf(buffer: Buffer): Promise<string> {
  try {
    const parsedData = await pdf(buffer);
    
    if (!parsedData || !parsedData.text) {
      throw new Error('No text content found in the PDF.');
    }
    
    return parsedData.text;
  } catch (error) {
    console.error('Error parsing PDF in extractTextFromPdf:', error);
    throw new Error('Failed to parse PDF resume. Please ensure the PDF is not password-protected and contains readable text.');
  }
}
