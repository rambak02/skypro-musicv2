const baseUrl = "https://webdev-music-003b5b991590.herokuapp.com/";
export async function getTracks() {
  const response = await fetch(baseUrl + "catalog/track/all/", {
    method: "GET",
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }
  return response.json();
}
