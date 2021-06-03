function LogOut() {
  localStorage.clear();
  window.location = "http://localhost:3000/login";
}
export default LogOut;
