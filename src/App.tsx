import './App.css';
import { bubbleSort } from './algorithms/algorithms';
import { Sort } from './algorithms/sort';

function App() {
  return (
    <div className="container h-100 w-100 pb-3">
      <div className="d-flex flex-column h-100 w-100">
        <div className="row">
          <Nav />
        </div>
        <div className="row flex-fill">
          <Sort sort={bubbleSort} />
        </div>
      </div>
    </div>
  );
}

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary border border-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Navbar</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Features</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Pricing</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default App;
