const userUrl = process.env.USER_SERVICE || "http://localhost:3001";
export const getUser = async (userId) => {
  const res = await fetch(`${userUrl}/auth/user/${userId}`);
  if (!res.ok) throw new Error("Erro fetching user");
  return res.json();
};
