import { Link, useNavigate } from 'react-router-dom';

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the tokens from localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    // Redirect to the login page or any other desired page
    navigate('/login');

    // You can display a logout success message if needed
    alert('You have successfully logged out!');
  };

  return (
    <nav className="navbar-list">
      <ul className="navbar-list">
        <li className="dropdown">
          <button className="dropdown-toggle">ABOUT US 👇👇👇👇</button>
          <ul className="dropdown-menu">
            <li>
              <Link to="/home">HOME 😊</Link>
            </li>
            <li>
              <Link to="/exercise-daily-routine">EXERCISES ROUTINE😊</Link>
            </li>
            <li>
              <Link to="/add-exercise">ADD EXERCISE FORM 😊</Link>
            </li>
            <li>
              <Link to="/comments">REVIEWS 💙😊</Link>
            </li>
            <li>
              <button className="btn btn-danger" onClick={handleLogout}>LOGOUT 💙😊</button>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;
