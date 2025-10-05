export const dashBoardData = async () => {
  try {
    const response = await fetch(`/api/user/dashboard`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    console.log(response);
    return response;
  } catch (error) {}
};
export default dashBoardData;
