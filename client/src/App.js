import { Route,Routes} from "react-router-dom";
import './App.css';
import { Main } from './pages/main/main';
import { Edit } from './pages/edit/edit';
import { Hero } from './pages/hero/hero';
import { Create } from './pages/create/create';
import { Navbar } from './components/navbar/navbar';

function App() {
  return (
  <>
    <div className="App">
    <Navbar/>
    <Routes>
       <Route path="/" element={<Main/>} />
       <Route path="/edit/:id" element={<Edit/>} />
       <Route path="/hero/:id" element={<Hero/>} />
       <Route path="/create" element={<Create/>} />
    </Routes>
    </div>
 </>
  );
}

export default App;
