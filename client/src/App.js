import { Route,Routes} from "react-router-dom";

import './App.css';
import { Main } from './pages/main/main';
import { Card } from './pages/card/card';
import { Image } from './pages/image/image';
import { Edit } from './pages/edit/edit';
import { Hero } from './pages/hero/hero';

function App() {
  return (
    // <div className="App">
    //   <Main/>
    //   {/* <Image/> */}
    //   {/* <Hero/> */}
    // </div>
  <>
    <div className="App">
    <Routes>
       <Route path="/" element={<Main />} />
       <Route path="/edit/:id" element={<Edit/>} />
       <Route path="/hero/:id" element={<Hero />} />
       <Route path="/create" element={<Card/>} />
    </Routes>
    </div>
 </>
  );
}

export default App;
