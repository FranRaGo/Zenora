export const getActiveUser = async () => {
    const apiURL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("activeToken");
    if (!token) return null;
  
    try {
      const res = await fetch(`${apiURL}/api/usersFilter/token/${token}`);
      if (!res.ok) throw new Error(`Error HTTP ${res.status}`);

      const data = await res.json();
      return data[0];
    } catch (err) {
      console.error("Error al obtener el usuario activo", err);
      return null;
    }
  };
  