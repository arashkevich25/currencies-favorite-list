import React from 'react';
import { useCurrencies, UseCurrenciesOutput } from './useCurrencies';
import { act, renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import configureMockStore, { MockStore } from 'redux-mock-store';
import { ActionTypes } from '../models/actionTypes';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('test useCurrencies hook', () => {
    let store: MockStore;
    let result: UseCurrenciesOutput;
    beforeEach(() => {
        store = mockStore({
            currencies: [],
            currenciesFetching: false,
            currenciesHadFetched: false,
            currenciesFetchError: '',
        });
        result = renderHook(() => useCurrencies(), {
            wrapper: ({ children }) => (
                <Provider store={store}>{children}</Provider>
            ),
        }).result.current;
    });
    it('should currencies list empty', () => {
        const [currencies] = result;
        expect(currencies).toStrictEqual([]);
    });
    it('should currencies fetching state false', () => {
        const [, currenciesFetching] = result;
        expect(currenciesFetching).toBe(false);
    });
    it('should currencies had fetching state false', () => {
        const [, , currenciesHadFetched] = result;
        expect(currenciesHadFetched).toBe(false);
    });
    it('should currencies error empty', () => {
        const [, , , error] = result;
        expect(error).toBe('');
    });
    it('should start fetch currencies', () => {
        const [, , , , fetch] = result;
        const expectedActions = [{ type: ActionTypes.FetchCurrencies }];
        act(() => {
            fetch();
        });
        expect(store.getActions()).toEqual(expectedActions);
    });
});
