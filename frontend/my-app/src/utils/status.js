export const status = (contactStatus) => {
  if (contactStatus === 0) {
    return "Rechazada";
  } else if (contactStatus === 1) {
    return "Aceptada";
  } else {
    return "Pendiente";
  }
};
