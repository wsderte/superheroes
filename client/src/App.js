import './App.css';
import { Main } from './pages/main/main';
import { Hero } from './pages/hero/hero';
import { Image } from './pages/image/image';

function App() {

  return (
    <div className="App">
      <Main/>
      <Image/>
      {/* <Hero/> */}
    </div>
  );
}

export default App;
