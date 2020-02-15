import { appReducer, AppState } from './appReducer';
import { ActionTypes, ActionTypesUnion } from '../models/actionTypes';
import { Currency } from '../types';

describe('testing all reducers', () => {
    it('should return initial state', () => {
        expect(appReducer(undefined, {} as ActionTypesUnion)).toEqual({
            currencies: [],
            currenciesFetching: false,
            currenciesHadFetched: false,
            currenciesFetchError: '',
            favorites: [],
        });
    });

    describe('testing fetch currencies', () => {
        it('should start fetch currencies', () => {
            expect(
                appReducer({} as AppState, {
                    type: ActionTypes.FetchCurrencies,
                })
            ).toEqual({
                currenciesFetchError: '',
                currenciesFetching: true,
            });
        });
        it('should fetch currencies success', () => {
            const currencies: Currency[] = [
                {
                    code: 'test_code',
                    currency: 'test_currency',
                    ask: 1,
                    bid: 2,
                },
            ];
            expect(
                appReducer({} as AppState, {
                    type: ActionTypes.FetchCurrenciesSuccess,
                    currencies,
                })
            ).toEqual({
                currenciesHadFetched: true,
                currenciesFetching: false,
                currencies,
            });
        });
        it('should fetch with error', () => {
            const error = 'error_while_fetching';
            expect(
                appReducer({} as AppState, {
                    type: ActionTypes.FetchCurrenciesFailed,
                    error,
                })
            ).toEqual({
                currenciesFetching: false,
                currenciesHadFetched: false,
                currenciesFetchError: error,
            });
        });
    });

    describe('testing add and remove favorites currencies', () => {
        it('should add currency to favorites list', () => {
            const currency = {
                code: 'test_code',
                currency: 'test_currency',
                ask: 1,
                bid: 2,
            };

            expect(
                appReducer({ favorites: [] as Currency[] } as AppState, {
                    type: ActionTypes.AddToFavorites,
                    currency,
                })
            ).toEqual({
                favorites: [currency],
            });
        });

        it('should remove currency from favorite list', () => {
            const currency1 = {
                code: 'test_code',
                currency: 'test_currency',
                ask: 1,
                bid: 2,
            };
            const currency2 = {
                code: 'test_code_2',
                currency: 'test_currency_2',
                ask: 3,
                bid: 4,
            };
            const testState = { favorites: [currency1, currency2] };

            expect(
                appReducer(testState as AppState, {
                    type: ActionTypes.RemoveFromFavorites,
                    currency: currency1,
                })
            ).toEqual({
                favorites: [currency2],
            });
        });
    });
});
