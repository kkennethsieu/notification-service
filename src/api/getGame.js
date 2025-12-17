const gameUrl = process.env.CATALOG_SERVICE_URL || "http://localhost:3002";
export const getGame = async (gameId) => {
  const res = await fetch(`${gameUrl}/games/id/${gameId}`);
  if (!res.ok) throw new Error("Erro fetching game");
  return res.json();
};
