import * as favoriteActions from './favorite';
import { ActionTypes } from '../models/actionTypes';
import configureMockStore from 'redux-mock-store';

const mockStore = configureMockStore();

describe('test add and remove from favorite list', () => {
    let store = mockStore({});

    afterEach(() => {
        store = mockStore({});
    });
    const currency = {
        code: 'test_code',
        currency: 'test_currency',
        ask: 1,
        bid: 2,
    };

    it('should add to favorite list', () => {
        store.dispatch(favoriteActions.addFavoriteCurrency(currency));
        expect(store.getActions()).toEqual([
            {
                type: ActionTypes.AddToFavorites,
                currency,
            },
        ]);
    });

    it('should remove from favorite list', () => {
        store.dispatch(favoriteActions.removeFavoriteCurrency(currency));
        expect(store.getActions()).toEqual([
            {
                type: ActionTypes.RemoveFromFavorites,
                currency,
            },
        ]);
    });

    it('should clear favorite list', () => {
        store.dispatch(favoriteActions.removeAllFavoriteCurrency());
        expect(store.getActions()).toEqual([
            {
                type: ActionTypes.RemoveAllFavorites,
            },
        ]);
    });
});
