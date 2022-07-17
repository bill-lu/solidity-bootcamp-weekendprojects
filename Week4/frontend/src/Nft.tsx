import './Nft.css';
import {useSelector} from 'react-redux'

import { NftState } from './store';

function Nft() {
  const imageUrl = useSelector((state: NftState) => state.image);
  const metadata = useSelector((state: NftState) => state.metadata);

  const error = useSelector((state: NftState) => state.search.error)

  const getImage = () => {
    return error === "" ? imageUrl : "";
  }

  return (
    <div className="App">
      <div className='nftHeader'>
        <h2>{metadata}</h2>
      </div>
      <div className="Error">
        <p>{error}</p>
      </div>
      <header className="nftBody">
        <img src={getImage()} className="App-logo" />
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
