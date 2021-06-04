export const getAge = (birthday) => {
  const birthDate = new Date(birthday);
  const difference = Date.now() - birthDate.getTime();
  const age = new Date(difference);
  if (!birthday) {
    return "...Cargando";
  } else {
    return Math.abs(age.getUTCFullYear() - 1970);
  }
};
