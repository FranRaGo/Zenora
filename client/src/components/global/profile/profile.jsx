import React, { useState, useEffect } from "react";

// Aquesta funció ajuda a convertir l'extensió del fitxer (jpg, png, etc.)
// en un tipus MIME vàlid, que és el que espera el navegador per mostrar la imatge.
const getMimeType = (ext) => {
    switch (ext.toLowerCase()) {
        case "jpg":
        case "jpeg":
            return "image/jpeg";
        case "png":
            return "image/png";
        case "svg":
            return "image/svg+xml";
        default:
            return "image/*"; // Tipus genèric si no es reconeix l’extensió
    }
};

const Profile = ({ userId, styleCss, color }) => {
    const [user, setUser] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        const searchUser = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/usersFilter/id/${userId}`);
                const resData = await res.json();
                const userData = resData[0];
                setUser(userData);

                if (userData.profile_picture?.data) {  // Si existeix la imatge de perfil (com a BLOB)
                    const byteArray = new Uint8Array(userData.profile_picture.data);   // Convertim l’array de bytes (data) en un Uint8Array, que és manipulable per JS
                    const mimeType = getMimeType(userData.file_type || 'jpeg'); // Calculem quin tipus MIME correspon a la imatge
                    const blob = new Blob([byteArray], { type: mimeType }); // Creem un objecte BLOB amb aquest array i tipus
                    const url = URL.createObjectURL(blob); // Generem una URL temporal per poder-la usar com a `src` a una etiqueta <img>
                    setImageUrl(url); // Guardem aquesta URL a l’estat per mostrar-la
                }
            } catch (err) {
                console.log("Error en la busqueda del usuario por su id", err);
            }
        }
        searchUser();
    }, [userId])

    console.log("El usuario  del usuario apra el perfil ", user);

    if (!user) return null;

    return (
        <div className={styleCss} style={{ backgroundColor: color }}>
            {imageUrl ? (
                <img src={imageUrl} alt="Profile img"/>
            ) : (
                <p>{user.first_name?.charAt(0).toUpperCase()}</p>
            )}
        </div>
    )
}

export default Profile;