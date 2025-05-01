export const getActiveUser = async () => {
    const token = localStorage.getItem("activeToken");
    if (!token) return null;
  
    try {
      const res = await fetch(`http://localhost:3000/api/usersFilter/token/${token}`);
      if (!res.ok) throw new Error(`Error HTTP ${res.status}`);

      const data = await res.json();
      console.log("Api para coger el usuario" + JSON.stringify(data));
      return data[0];
    } catch (err) {
      console.error("Error al obtener el usuario activo", err);
      return null;
    }
  };
  