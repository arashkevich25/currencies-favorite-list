import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../reducers/appReducer';
import {
    currenciesFetchError,
    currenciesFetchingState,
    currenciesHadFetchedState,
    getCurrencies,
} from '../selectors/currencies';
import { fetchCurrencies } from '../actions/currencies';
import { Currency } from '../types';

export type UseCurrenciesOutput = [
    Currency[],
    boolean,
    boolean,
    string,
    () => void
];

export function useCurrencies(): UseCurrenciesOutput {
    const currencies = useSelector((state: AppState) => getCurrencies(state));
    const currenciesFetching = useSelector((state: AppState) =>
        currenciesFetchingState(state)
    );
    const currenciesHadFetched = useSelector((state: AppState) =>
        currenciesHadFetchedState(state)
    );
    const fetchedError = useSelector((state: AppState) =>
        currenciesFetchError(state)
    );
    const dispatch = useDispatch();

    function fetch() {
        dispatch(fetchCurrencies());
    }

    return [
        currencies,
        currenciesFetching,
        currenciesHadFetched,
        fetchedError,
        fetch,
    ];
}
