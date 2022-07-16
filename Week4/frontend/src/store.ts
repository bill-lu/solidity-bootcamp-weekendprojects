// file: store.ts
import { ActionCreatorWithPayload, configureStore, createAction, createReducer } from '@reduxjs/toolkit'

export interface NftState {
    image: string,
    metadata: string
}

const preloadedState: NftState = {
    image: 'https://www.thestreet.com/.image/t_share/MTgyMDU4MTA0Mzc5MTU1Nzg0/boredape.jpg',
    metadata: '{type: bored ape}'
}

export const setNftImage: ActionCreatorWithPayload<string, string> = createAction('nft/image');
export const setNftMetadata: ActionCreatorWithPayload<string, string> = createAction('nft/metadata');

const reducer = createReducer(preloadedState, (builder) => {
        builder.addCase(setNftImage, (state, action) => {
            state.image = action.payload;
        })
        .addCase(setNftMetadata, (state, action) => {
          state.metadata = action.payload;
        })
    })

export const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production'
})