import './Nft.css';
import {useSelector} from 'react-redux'

import { NftState } from './store';

function Nft() {
  const imageUrl = useSelector((state: NftState) => state.image);
  const metadata = useSelector((state: NftState) => state.metadata);

  return (
    <div className="App">
      <div className='nftHeader'>
        <h2>Bored Ape</h2>
      </div>
      <header className="nftBody">
        <img src={imageUrl} className="App-logo" alt="logo" />
        <div className='metadataContainer'>
          <ul>
            <li>{metadata}</li>
          </ul>
        </div>
      </header>
    </div>
  );
}

export default Nft;
