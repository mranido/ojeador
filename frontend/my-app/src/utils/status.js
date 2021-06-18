export const status = (contactStatus) => {
  if (contactStatus === 0) {
    return "Rechazado";
  } else if (contactStatus === 1) {
    return "Aceptado";
  } else {
    return "Pendiente";
  }
};
