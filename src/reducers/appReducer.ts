import { Currency } from '../types';
import { ActionTypes, ActionTypesUnion } from '../models/actionTypes';

export interface AppState {
    currencies: Currency[];
    currenciesHadFetched: boolean;
    currenciesFetching: boolean;
    currenciesFetchError: string;
    favorites: Currency[];
}

const initState: AppState = {
    currencies: [],
    currenciesFetching: false,
    currenciesHadFetched: false,
    currenciesFetchError: '',
    favorites: [],
};

export function appReducer(
    state: AppState = initState,
    action: ActionTypesUnion
): AppState {
    switch (action.type) {
        case ActionTypes.FetchCurrencies: {
            return {
                ...state,
                currenciesFetching: true,
                currenciesFetchError: '',
            };
        }

        case ActionTypes.FetchCurrenciesFailed: {
            return {
                ...state,
                currenciesFetching: false,
                currenciesHadFetched: false,
                currenciesFetchError: action.error,
            };
        }

        case ActionTypes.FetchCurrenciesSuccess: {
            return {
                ...state,
                currencies: action.currencies,
                currenciesHadFetched: true,
                currenciesFetching: false,
            };
        }

        case ActionTypes.AddToFavorites: {
            const favorites = [...state.favorites, action.currency];
            return {
                ...state,
                favorites,
            };
        }

        case ActionTypes.RemoveFromFavorites: {
            const favorites = state.favorites.filter(
                currency => currency.code !== action.currency.code
            );
            return {
                ...state,
                favorites,
            };
        }

        case ActionTypes.RemoveAllFavorites: {
            return {
                ...state,
                favorites: [],
            };
        }

        default:
            return state;
    }
}
