// file: store.ts
import { ActionCreatorWithPayload, applyMiddleware, configureStore, createAction, createReducer } from '@reduxjs/toolkit'
import axios from 'axios';

enum Validity {
  Valid, 
  Invalid,
  Default // when no query has been entered, the default NFT is shown
}

export interface NftMetadata {
  name: string,
  description: string,
  author: string,
  timestamp: number,
  type: string,
  class: string,
  score: number
}

export interface NftState {
    image: string,
    metadata: NftMetadata,
    search: NftSearch,
    test: string
}

export interface NftSearch {
  query: string,
  valid: Validity
  error: string
}

const SERVER_ADDRESS = 'http://localhost:5000'

const defaultMetadata = {
  "name": "",
  "description": "",
  "author": "",
  "timestamp": 0,
  "type": "",
  "class": "",
  "score": 0
}

const preloadedState: NftState = {
    image: 'https://www.thestreet.com/.image/t_share/MTgyMDU4MTA0Mzc5MTU1Nzg0/boredape.jpg',
    metadata: defaultMetadata,
    search: {
      query: '',
      valid: Validity.Default,
      error: ''
    },
    test: ''
}

export const setNftImage: ActionCreatorWithPayload<string, string> = createAction('nft/image');
export const setNftMetadata: ActionCreatorWithPayload<NftMetadata, string> = createAction('nft/metadata');
export const setNftSearchResult: ActionCreatorWithPayload<NftSearch, string> = createAction('nft/searchResult');
export const setNftSearch: ActionCreatorWithPayload<string, string> = createAction('nft/search');

function searchNFT() {
  return next => async action => {
    if (action.type === setNftSearch.toString()) {

            
      const query: string = action.payload;

      const fileAddress = `${SERVER_ADDRESS}/ipfs-get-path/${query}`;
      const metadataAddress = `${SERVER_ADDRESS}/${query}`;
      
      let nftSearchResult: NftSearch;
      try {
        const fileResponse = await axios.get(fileAddress);
        const metadataResponse = await axios.get(metadataAddress);
    
        nftSearchResult = {
          query: query,
          valid: Validity.Valid,
          error: ''
        }
        const imagePath = `https://ipfs.io/ipfs/${fileResponse.data}/`
        next(setNftImage(imagePath));        
        next(setNftMetadata(metadataResponse.data.metadata));
      } catch (error) {
        nftSearchResult = {
          query: query,
          valid: Validity.Invalid,
          error: `Try entering another index ${error.message}`
        }        
        const defaultImage = 'TODO'
        next(setNftMetadata(defaultMetadata));        
        next(setNftImage(defaultImage));
      }
      next(setNftSearchResult(nftSearchResult));

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