import { useDispatch, useSelector } from 'react-redux';
import { Currency } from '../types';
import {
    addFavoriteCurrency,
    removeAllFavoriteCurrency,
    removeFavoriteCurrency,
} from '../actions/favorite';
import { AppState } from '../reducers/appReducer';
import { favoritesCurrencies } from '../selectors/currencies';

export type UseFavoriteOutput = [
    Currency[],
    (currency: Currency) => void,
    (currency: Currency) => void,
    () => void
];

export function useFavorite(): UseFavoriteOutput {
    const dispatch = useDispatch();
    const favorites = useSelector((state: AppState) =>
        favoritesCurrencies(state)
    );

    function addToFavorite(currency: Currency) {
        dispatch(addFavoriteCurrency(currency));
    }

    function removeFromFavorite(currency: Currency) {
        dispatch(removeFavoriteCurrency(currency));
    }

    function removeAllFavorites() {
        dispatch(removeAllFavoriteCurrency());
    }

    return [favorites, addToFavorite, removeFromFavorite, removeAllFavorites];
}
