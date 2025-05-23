import React, { useState, useEffect } from "react";

const apiURL = import.meta.env.VITE_API_URL;

const SpaceIcon = ({ spaceId, styleCss }) => {
  const [space, setSpace] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (!spaceId) return;

    const searchSpace = async () => {
      try {
        const res = await fetch(`${apiURL}/api/space/id/${spaceId}`);
        const resData = await res.json();
        const spaceData = resData[0];
        setSpace(spaceData);

        if (spaceData.logo?.data) {
          const byteArray = new Uint8Array(spaceData.logo.data);
          const mimeType = spaceData.file_type || "image/jpeg";
          const blob = new Blob([byteArray], { type: mimeType });
          const url = URL.createObjectURL(blob);
          setImageUrl(url);
        }
      } catch (err) {
        console.log("Error en la búsqueda del space por su id:", err);
      }
    };

    searchSpace();
  }, [spaceId]);

  if (!space) return null;

  return (
    <div className={styleCss} style={{ backgroundColor: space.color }}>
      {imageUrl ? (
        <img src={imageUrl} alt="Space img" />
      ) : (
        <p>{space.name?.charAt(0).toUpperCase()}</p>
      )}
    </div>
  );
};

export default SpaceIcon;
