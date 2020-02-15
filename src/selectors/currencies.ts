import { AppState } from '../reducers/appReducer';
import { Currency } from '../types';

export function getCurrencies(state: AppState): Currency[] {
    return state.currencies;
}

export function currenciesFetchingState(state: AppState): boolean {
    return state.currenciesFetching;
}

export function currenciesHadFetchedState(state: AppState): boolean {
    return state.currenciesHadFetched;
}

export function currenciesFetchError(state: AppState): string {
    return state.currenciesFetchError;
}

export function favoritesCurrencies(state: AppState): Currency[] {
    return state.favorites;
}
