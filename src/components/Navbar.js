import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/personaggi">Personaggi</Link></li>
         <li><Link to="/combattimento">Combattimento</Link></li>
        <li><Link to="/magie">Magie</Link></li>
        <li><Link to="/mostri">Mostri</Link></li>
        <li><Link to="/missioni">Missioni</Link></li>
        <li><Link to="/regole">Regole</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;