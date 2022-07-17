import * as ReactDOM from 'react-dom/client';
import './index.css';
import {Provider} from 'react-redux';
import { store } from './store';

import App from './Nft';
import Header from './Header';

const rootElement: HTMLElement | null = document.getElementById('root');
if (rootElement != null){
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <Provider store={store}>
      <Header/>
      <App/>
    </Provider>
  );
}
