// Authentication buttons
const Button = ({
  currentUser,
  handleLogout,
  setShowLogin,
  setShowRegistration,
}) => {
  return (
    <>
      {currentUser ? (
        <button onClick={handleLogout} className="button logout">
          Log Out
        </button>
      ) : (
        <div className="buttons">
          <button
            className="button login"
            onClick={() => {
              setShowLogin((prevState) => !prevState);
              setShowRegistration(false);
            }}
          >
            Log In
          </button>
          <button
            className="button register"
            onClick={() => {
              setShowRegistration((prevState) => !prevState);
              setShowLogin(false);
            }}
          >
            Register
          </button>
        </div>
      )}
    </>
  );
};

export default Button;
