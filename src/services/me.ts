import init from ".";

export const getMe = async () => {
  try {
    const response = await init.get("/users/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
}