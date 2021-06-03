const getPeople = () => {
  return fetch(`http://localhost:8000/api/v1/users/profiles/`);
};

export { getPeople };
