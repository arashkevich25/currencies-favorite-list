import { fetchCurrencies } from './currencies';
import thunk from 'redux-thunk';
import { ActionTypes } from '../models/actionTypes';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('test fetch currencies actions', () => {
    afterEach(() => {
        fetchMock.restore();
    });
    it('should fetch currencies successfully', async () => {
        const currency = {
            code: 'test_code',
            currency: 'test_currency',
            ask: 1,
            bid: 2,
        };
        fetchMock.getOnce(
            'http://api.nbp.pl/api/exchangerates/tables/c?format=json',
            [{ rates: [currency] }]
        );

        const expectedActions = [
            { type: ActionTypes.FetchCurrencies },
            {
                type: ActionTypes.FetchCurrenciesSuccess,
                currencies: [currency],
            },
        ];
        const store = mockStore({ currencies: [] });
        await store.dispatch(fetchCurrencies() as any);
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('should fetch currencies failed', async () => {
        const currency = {
            code: 'test_code',
            currency: 'test_currency',
            ask: 1,
            bid: 2,
        };

        fetchMock.mock(
            'http://api.nbp.pl/api/exchangerates/tables/c?format=json',
            500
        );

        const expectedActions = [
            { type: ActionTypes.FetchCurrencies },
            {
                type: ActionTypes.FetchCurrenciesFailed,
                error: 'Error: Internal Server Error',
            },
        ];
        const store = mockStore({ currencies: [] });
        await store.dispatch(fetchCurrencies() as any);
        expect(store.getActions()).toEqual(expectedActions);
    });
});
