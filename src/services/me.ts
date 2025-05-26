import init from ".";

export const getMe = async () => {
  const response = await init.get("/users/me", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response;
};
