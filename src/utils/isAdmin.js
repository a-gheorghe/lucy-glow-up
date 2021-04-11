export const isAdmin = (user) => {
  return user && user.roles.includes("admin");
};
