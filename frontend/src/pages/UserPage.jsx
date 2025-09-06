const UserPage = () => {
  const user = {
    name: "John Doe",
    email: "test@gmail.com",
  };

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default UserPage;