export const getLoggedUsers = async () => {
    const apiURL = import.meta.env.VITE_API_URL;
    const tokens = JSON.parse(localStorage.getItem("loggedTokens"));
    if (!tokens) return [];
  
    const users = [];
  
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      try {
        const res = await fetch(`${apiURL}/api/usersFilter/token/${token}`);
        if (!res.ok) throw new Error(`Error HTTP ${res.status}`);
  
        const data = await res.json();
        if (data && data.length > 0) {
          users.push(data[0]);
        }
      } catch (err) {
        console.error(`Error al obtener el usuario con token ${token}:`, err);
      }
    }
  
    return users;
  };
  