import { Currency } from '../types';

export enum ActionTypes {
    FetchCurrencies = '[Currencies] fetch currencies',
    FetchCurrenciesSuccess = '[Currencies] fetch currencies success',
    FetchCurrenciesFailed = '[Currencies] fetch currencies failed',

    AddToFavorites = '[Favorite] add to favorites',
    RemoveFromFavorites = '[Favorite] remove from favorites',
    RemoveAllFavorites = '[Favorite] remove all favorites',
}

interface FetchCurrencies {
    type: typeof ActionTypes.FetchCurrencies;
}

interface FetchCurrenciesSuccess {
    type: typeof ActionTypes.FetchCurrenciesSuccess;
    currencies: Currency[];
}

interface FetchCurrenciesFailed {
    type: typeof ActionTypes.FetchCurrenciesFailed;
    error: string;
}

interface AddToFavorite {
    type: typeof ActionTypes.AddToFavorites;
    currency: Currency;
}

interface RemoveFromFavorite {
    type: typeof ActionTypes.RemoveFromFavorites;
    currency: Currency;
}

interface RemoveAllFavorite {
    type: typeof ActionTypes.RemoveAllFavorites;
}

export type ActionTypesUnion =
    | FetchCurrencies
    | FetchCurrenciesSuccess
    | FetchCurrenciesFailed
    | AddToFavorite
    | RemoveAllFavorite
    | RemoveFromFavorite;
