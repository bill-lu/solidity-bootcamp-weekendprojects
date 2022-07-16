import './App.css';
import {useSelector} from 'react-redux'

import { NftState } from './store';

function App() {
  const imageUrl = useSelector((state: NftState) => state.image);
  const metadata = useSelector((state: NftState) => state.metadata);

  return (
    <div className="App">
      <header className="App-header">
        <img src={imageUrl} className="App-logo" alt="logo" />
        <p>
          {metadata}        
        </p>
      </header>
    </div>
  );
}

export default App;
