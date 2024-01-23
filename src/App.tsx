import './App.css';
import { MergeSort } from './algorithms/merge-sort/components';
import { BubbleSort } from './algorithms/bubble-sort/components';
import { Link, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="container h-100 w-100 pb-3">
      <div className="d-flex flex-column h-100 w-100">
        <div className="row">
          <Nav />
        </div>
        <div className="row flex-fill">
          <Routes>
            <Route path="/" element={<div />} />
            <Route path="/bubble-sort" element={<BubbleSort />} />
            <Route path="/merge-sort" element={<MergeSort />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-lg rounded-bottom-3">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link active" aria-current="page">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/merge-sort" className="nav-link">Merge Sort</Link>
            </li>
            <li className="nav-item">
              <Link to="/bubble-sort" className="nav-link">Bubble Sort</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default App;
