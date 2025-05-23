// src/utils/getUserSpaces.js
export const getUserSpaces = async (userId) => {
    if (!userId) return [];
  
    try {
      const res = await fetch(`http://localhost:3000/api/spaceUser/${userId}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Error al obtener espacios del usuario", err);
      return [];
    }
  };
  