import { BrowserRouter, Router, Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Restaurant } from './pages/Restaurant';
import { Search } from './pages/Search';


function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <div className="App">
        <Routes>
          <Route path="/" element={<Restaurant />} />
          <Route path="/add" element={<Add />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
