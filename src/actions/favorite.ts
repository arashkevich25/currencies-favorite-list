import { Currency } from '../types';
import { ActionTypes } from '../models/actionTypes';

export function addFavoriteCurrency(currency: Currency) {
    return {
        type: ActionTypes.AddToFavorites,
        currency,
    };
}

export function removeFavoriteCurrency(currency: Currency) {
    return {
        type: ActionTypes.RemoveFromFavorites,
        currency,
    };
}

export function removeAllFavoriteCurrency() {
    return {
        type: ActionTypes.RemoveAllFavorites,
    };
}
