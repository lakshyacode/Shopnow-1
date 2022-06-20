import './App.css';
import URLState from './Context/URLState';
import NavBar from './Components/NavBar'
import Items from './Components/Items';
function App() {
  return (
    <>
      <URLState>
        <NavBar />
        <Items />
      </URLState>
    </>
  );
}

export default App;
