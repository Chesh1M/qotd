import React, { useState } from "react";
import styles from "./Testimonials.module.css";
import Modal from "react-modal";
import { Document, Page, pdfjs } from "react-pdf";

// Importing Assets (company logos)
import anext_bank_logo from "../../assets/anext_logo.png";
import great_eastern_logo from "../../assets/ge_logo.png";
import nlb_logo from "../../assets/nlb_logo.jpg";

// Define data array (for the pdf files and logos)
const lettersData = [
  {
    file: "/Recommendation_Letter_ANEXT_Bank.pdf",
    thumbnail: anext_bank_logo,
    title: "ANEXT Bank - Letter of Recommendation",
  },
  {
    file: "/Recommendation_Letter_Great_Eastern.pdf",
    thumbnail: great_eastern_logo,
    title: "Great Eastern - Letter of Recommendation",
  },
  {
    file: "/Recommendation_Letter_NLB.pdf",
    thumbnail: nlb_logo,
    title: "NLB - Letter of Recommendation",
  },
];

// Set up the worker for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

// Set the app element for react-modal to avoid accessibility issues
Modal.setAppElement("#root");

export const Testimonials = () => {
  const [modallsOpen, setModallsOpen] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [numPages, setNumPages] = useState(null);

  const openModal = (pdfUrl) => {
    console.log("Opening PDF:", pdfUrl);
    setSelectedPdf(pdfUrl);
    setModallsOpen(true);
  };

  const closeModal = () => {
    setModallsOpen(false);
    setSelectedPdf(null);
    setNumPages(null); // Reset page count when closed
  };

  // Function called by pdf-react when document loads
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div className={`${styles.recommendationsContainer}`}>
      <h2 className={`text-3xl`}>Recommendation Letters</h2>
      <div className={`${styles.lettersGrid}`}>
        {lettersData.map((letter, index) => (
          <div
            key={index}
            className={`${styles.letterItem}`}
            onClick={() => openModal(letter.file)}
          >
            {/* THUMBNAIL CODE START */}
            <img
              src={letter.thumbnail}
              alt={`Recommendation Letter ${index + 1}`}
              className={`${styles.letterThumbnail}`}
            />
            <p>{letter.title}</p>
            {/* THUMBNAIL CODE END */}
          </div>
        ))}
      </div>

      {/* MODAL CODE START */}
      <Modal
        isOpen={modallsOpen}
        // Function to call when the user clicks the overlay or presses ESC
        onRequestClose={closeModal}
        className={`${styles.pdfModal}`}
        overlayClassName={`${styles.pdfModalOverlay}`}
        contentLabel="PDF Viewer Modal"
      >
        <button
          onClick={closeModal}
          className={`${styles.closeButton}`}
          aria-label="Close PDF Viewer"
        >
          &times;
        </button>

        {selectedPdf && (
          <div className={`${styles.pdfViewerContainer}`}>
            <Document
              file={selectedPdf}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={(err) => console.error("React-PDF failed:", err)}
            >
              {[...Array(numPages)].map((_, index) => (
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  width={
                    window.innerWidth * 0.75 > 800
                      ? 800
                      : window.innerWidth * 0.75
                  }
                />
              ))}
            </Document>
          </div>
        )}
      </Modal>
      {/* MODAL CODE END */}
    </div>
  );
};

export default Testimonials;
