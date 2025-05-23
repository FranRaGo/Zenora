

export const getActiveSpace = async () => {
    const apiURL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("activeSpace");
    if (!token) return null;
  
    try {
      const res = await fetch(`${apiURL}/api/space/token/${token}`);
      if (!res.ok) throw new Error(`Error HTTP ${res.status}`);

      const data = await res.json();
      return data[0];
    } catch (err) {
      console.error("Error al obtener el espacio activo", err);
      return null;
    }
  };
  