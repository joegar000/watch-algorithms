import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import { SortControls } from './components/controls';
import { bubbleSort } from './algorithms/bubble';
import { mergeSort } from './algorithms/merge';
import { Welcome } from './components/welcome';
import { useCallback, useState } from 'react';

function App() {
  return (
    <div className="container h-100 w-100 pb-3">
      <div className="d-flex flex-column h-100 w-100">
        <div className="row">
          <Nav />
        </div>
        <div className="row flex-fill">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/bubble-sort" element={<SortControls key="bubble" algorithm={bubbleSort} />} />
            <Route path="/merge-sort" element={<SortControls key="merge" algorithm={mergeSort} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function Nav() {
  const [isDark, setIsDark] = useState(document.documentElement.dataset.bsTheme === 'dark');
  const setTheme = useCallback((theme: 'dark' | 'light') => {
    document.documentElement.dataset.bsTheme = theme;
    setIsDark(theme === 'dark');
  }, []);
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary shadow rounded-bottom-3">
      <div className="row w-100">
        <div className="col">
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
        </div>
        <div className="col-auto">
          <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
              <i className={isDark ? 'bi bi-moon-stars-fill' : 'bi bi-brightness-high-fill'} />
            </button>
            <ul className="dropdown-menu dropdown-menu-end" style={{ minWidth: 0 }}>
              <li onClick={() => setTheme('light')}>
                <button type="button" className={`dropdown-item d-flex align-items-center px-4${isDark ? '' : ' active'}`}>
                  <i className="bi bi-brightness-high-fill pe-2" />Light
                </button>
              </li>
              <li onClick={() => setTheme('dark')}>
                <button type="button" className={`dropdown-item d-flex align-items-center px-4${isDark ? ' active' : ''}`}>
                  <i className="bi bi-moon-stars-fill pe-2" />Dark
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default App;
