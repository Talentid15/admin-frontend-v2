import React from "react";
// import { getDocument, GlobalWorkerOptions } from "pdfjs-dist/webpack";

// // Set the worker source to the latest version
// GlobalWorkerOptions.workerSrc = "pdfjs-dist/build/pdf.worker.min.js";

const parsePDF = async (file) => {
  console.log("Parsing PDF...");

  try {
    const arrayBuffer = await file.arrayBuffer();
    console.log("ArrayBuffer: ", arrayBuffer);

    const pdf = await getDocument({ data: arrayBuffer }).promise;
    console.log("PDF Loaded: ", pdf);

    let extractedText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      console.log(`Processing Page ${i}...`);

      const content = await page.getTextContent();
      const pageText = content.items.map((item) => item.str).join(" ");
      console.log(`Page ${i} Text: `, pageText);

      extractedText += pageText + "\n";
    }

    console.log("Extracted Text: ", extractedText);
    return extractedText;
  } catch (error) {
    console.error("Error in PDF Parsing: ", error);
    throw error;
  }
};

const ExtractDataFromPdf = () => {
  const handlePDFUpload = async (event) => {
    const file = event.target.files[0];
    console.log("File selected: ", file);

    if (!file) {
      console.error("No file selected!");
      return;
    }

    try {
      const extractedText = await parsePDF(file);
      console.log("Extracted Text:", extractedText);
      alert("PDF Text Extracted! Check console for details.");
    } catch (error) {
      console.error("Error while extracting text from PDF:", error);
      alert("Failed to extract text from PDF. Check console for details.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Upload PDF to Extract Text</h1>
      <input
        type="file"
        accept=".pdf"
        onChange={handlePDFUpload}
        className="border p-2"
      />
    </div>
  );
};

export default ExtractDataFromPdf;


