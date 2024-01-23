export const getUserInfo = (userToken) => {
  return {
    user: userToken,
    userId: userToken.id,
    userName: userToken.user_metadata.userName
  };
};
