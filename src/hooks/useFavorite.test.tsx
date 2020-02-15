import React from 'react';
import { useFavorite, UseFavoriteOutput } from './useFavorite';
import { act, renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import configureMockStore, { MockStore } from 'redux-mock-store';
import { ActionTypes } from '../models/actionTypes';

const mockStore = configureMockStore();

describe('test useFavorite hook', () => {
    const currency = {
        code: 'test_code',
        currency: 'test_currency',
        ask: 1,
        bid: 2,
    };
    let store: MockStore;
    let result: UseFavoriteOutput;
    beforeEach(() => {
        store = mockStore({ favorites: [] });
        result = renderHook(() => useFavorite(), {
            wrapper: ({ children }) => (
                <Provider store={store}>{children}</Provider>
            ),
        }).result.current;
    });

    it('should favorites list empty', () => {
        const [favorites] = result;
        expect(favorites).toStrictEqual([]);
    });
    it('should add to favorites list', () => {
        const [, addToFavorite] = result;
        const expectedActions = [{ type: ActionTypes.AddToFavorites, currency }];
        act(() => {
            addToFavorite(currency);
        });
        expect(store.getActions()).toEqual(expectedActions);
    });
    it('should remove from favorites list', () => {
        const [, , removeFromFavorite] = result;
        const expectedActions = [
            { type: ActionTypes.RemoveFromFavorites, currency },
        ];
        act(() => {
            removeFromFavorite(currency);
        });
        expect(store.getActions()).toEqual(expectedActions);
    });
    it('should remove all from favorites list', () => {
        const [, , , removeAllFromFavoriteList] = result;
        const expectedActions = [{ type: ActionTypes.RemoveAllFavorites }];
        act(() => {
            removeAllFromFavoriteList();
        });
        expect(store.getActions()).toEqual(expectedActions);
    });
});
