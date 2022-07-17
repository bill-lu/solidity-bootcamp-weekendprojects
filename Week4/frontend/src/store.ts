// file: store.ts
import { ActionCreatorWithPayload, applyMiddleware, configureStore, createAction, createReducer } from '@reduxjs/toolkit'

enum Validity {
  Valid, 
  Invalid,
  Default
}

export interface NftState {
    image: string,
    metadata: string,
    search: NftSearch,
    test: string
}

export interface NftSearch {
  query: string,
  valid: Validity
}

const preloadedState: NftState = {
    image: 'https://www.thestreet.com/.image/t_share/MTgyMDU4MTA0Mzc5MTU1Nzg0/boredape.jpg',
    metadata: '{type: bored ape}',
    search: {
      query: '',
      valid: Validity.Default
    },
    test: ''
}

export const setNftImage: ActionCreatorWithPayload<string, string> = createAction('nft/image');
export const setNftMetadata: ActionCreatorWithPayload<string, string> = createAction('nft/metadata');
export const setNftSearchResult: ActionCreatorWithPayload<NftSearch, string> = createAction('nft/searchResult');
export const setNftSearch: ActionCreatorWithPayload<string, string> = createAction('nft/search');

function searchNFT({getState, dispatch}) {
  return next => action => {
    console.log('will dispatch', action);
    if (action.type === setNftSearch.toString()) {

      // TODO
      console.log('make asynchronous database call');
      const query: string = action.payload;
      let validity: Validity = Validity.Valid;

      const nftSearchResult: NftSearch = {
        query: query,
        valid: validity
      }
      dispatch(setNftSearchResult(nftSearchResult));
      const metadata = 'TODO';
      const image = 'TODO'
      if (validity === Validity.Valid) {

        dispatch(setNftMetadata(metadata));        
        dispatch(setNftImage(image));
      }
      else {
        const defaultImage = 'TODO'        
        dispatch(setNftMetadata(''));        
        dispatch(setNftImage(defaultImage));
      }
      return;
    }
  }
}

const reducer = createReducer(preloadedState, (builder) => {
        builder.addCase(setNftImage, (state, action) => {
            state.image = action.payload;
        })
        .addCase(setNftMetadata, (state, action) => {
          state.metadata = action.payload;
        })
        .addCase(setNftSearchResult, (state, action) => {
          state.search = action.payload;
        })
        .addCase(setNftSearch, (state, action) => {
          state.test = action.payload;
        })
    })

export const store = configureStore({
  reducer,
  middleware: [searchNFT],
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState
})