export const status = (contactStatus) => {
  if (contactStatus === 2) {
    return "Rechazado";
  } else if (contactStatus === 1) {
    return "Aceptado";
  } else if (!contactStatus) {
    return "Pendiente";
  }
};
