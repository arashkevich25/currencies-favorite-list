import { Action, Dispatch } from 'redux';
import { ActionTypes } from '../models/actionTypes';
import { Currency } from '../types';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../reducers/appReducer';

export function fetchCurrencies(): ThunkAction<
    void,
    AppState,
    unknown,
    Action<ActionTypes>
> {
    return async (dispatch: Dispatch) => {
        dispatch({
            type: ActionTypes.FetchCurrencies,
        });

        try {
            const response: Response = await fetch(
                'http://api.nbp.pl/api/exchangerates/tables/c?format=json',
                { method: 'GET' }
            );
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const [data] = await response.json();
            dispatch(fetchCurrenciesSuccess(data.rates));
        } catch (error) {
            dispatch(fetchCurrenciesFailed(error.toString()));
        }
    };
}

function fetchCurrenciesSuccess(currencies: Currency[]) {
    return {
        type: ActionTypes.FetchCurrenciesSuccess,
        currencies,
    };
}

function fetchCurrenciesFailed(error: string) {
    return {
        type: ActionTypes.FetchCurrenciesFailed,
        error,
    };
}
