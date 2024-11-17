import React, { useState, useEffect } from "react";
import styles from "./Life.module.css";
import { useNavbarContext } from "../Navbar/NavbarContext";
import axios from "axios";
import { Gallery } from "react-grid-gallery";

// Function to format the month/year from the uploaded date
const getMonthYear = (date) => {
  const d = new Date(date);
  const month = d.toLocaleString("default", { month: "long" });
  const year = d.getFullYear();
  return `${month} ${year}`;
};

export const Life = () => {
  // Get navbar height to offset page contents
  const { navbarHeight } = useNavbarContext();

  // For connecting to contentful cms
  const SPACE_ID = import.meta.env.VITE_SPACE_ID_LIFE;
  const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN_LIFE;

  // Function to fetch images from contentful
  const fetchLifeImages = async () => {
    try {
      const response = await axios.get(
        `https://cdn.contentful.com/spaces/${SPACE_ID}/entries`,
        {
          params: {
            access_token: ACCESS_TOKEN,
            content_type: "lifeImages",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching data from Contentful:", error);
      return null;
    }
  };

  // Initialize array to store images
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [groupedImages, setGroupedImages] = useState({});

  // Fetch & store images in the images array
  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      const data = await fetchLifeImages();

      if (data) {
        const assets = data.includes?.Asset || [];
        const entries = data.items || [];

        // Group images by month & year
        const newGroupedImages = {};

        // Map entries to create an array containing image URLs and uploadedAt timings
        const parsedImages = entries.map((entry) => {
          const imageId = entry.fields.lifeImages?.sys?.id;
          const imageAsset = assets.find((asset) => asset.sys.id === imageId);

          // Get month and year of each image
          const uploadedAt = entry.fields.uploadedAt || "Unknown";
          const monthYear = getMonthYear(uploadedAt);

          const image = {
            src: `https:${imageAsset.fields.file.url}`,
            width: imageAsset.fields.file.details.image.width,
            height: imageAsset.fields.file.details.image.height,
            customOverlay: <div className="image-overlay">Custom Overlay</div>,
            uploadedAt,
          };

          // Group images by month/year
          if (!newGroupedImages[monthYear]) {
            newGroupedImages[monthYear] = [];
          }
          newGroupedImages[monthYear].push(image);

          return image;
        });
        console.log(groupedImages);
        setImages(parsedImages);
        setGroupedImages(newGroupedImages);
      }
      setLoading(false);
    };

    fetchImages();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <section
      className={`${styles.lifeImagesSection} p-4 w-full min-h-screen flex flex-col text-center justify-center`}
      style={{
        paddingTop: `${navbarHeight + 40}px`,
      }}
    >
      {/* Title */}
      <h1 className={`${styles.title} text-2xl md:text-4xl`}>Life Recently</h1>

      {/* Gallery */}
      {Object.keys(groupedImages)
        .sort((a, b) => new Date(b) - new Date(a))
        .map((monthYear) => (
          <div key={monthYear}>
            <h2 className="pt-8 text-xl font-semibold">{monthYear}</h2>
            <Gallery
              images={groupedImages[monthYear]}
              enableImageSelection={false}
              rowHeight={400}
              margin={5}
            />
          </div>
        ))}
    </section>
  );
};
