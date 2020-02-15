import React, { useEffect } from 'react';
import { Button, Tab, Tabs } from 'react-bootstrap';
import { Loader, ErrorAlert, Grid } from './components';
import { useCurrencies, useFavorite } from './hooks';
import { gridKeys } from './constants/gridKeys';
import { ButtonContainer, ContentContainer } from './styled';
import { GridItem } from './types';

export function App() {
    const [
        currencies,
        currenciesFetching,
        currenciesHadFetched,
        fetchedError,
        fetch,
    ] = useCurrencies();

    const [
        favorites,
        addToFavorite,
        removeFromFavorite,
        removeAllFavorites,
    ] = useFavorite();

    useEffect(() => {
        if (!currenciesHadFetched && !currenciesFetching && !fetchedError) {
            fetch();
        }
    }, [
        currencies,
        currenciesFetching,
        currenciesHadFetched,
        fetch,
        fetchedError,
    ]);

    if (currenciesFetching) {
        return <Loader />;
    }

    const preparedCurrencies: GridItem[] = currencies.map(currency => {
        const isFavorite = !!favorites.find(
            ({ code }) => code === currency.code
        );
        return {
            ...currency,
            isFavorite,
            onClick: isFavorite ? removeFromFavorite : addToFavorite,
        };
    });

    const preparedFavorites: GridItem[] = favorites.map(favorite => {
        return {
            ...favorite,
            isFavorite: true,
            onClick: removeFromFavorite,
        };
    });

    return (
        <ContentContainer>
            {fetchedError ? <ErrorAlert error={fetchedError} /> : null}
            <Tabs defaultActiveKey="all" id="currencies-tab">
                <Tab eventKey="all" title="All currencies">
                    <Grid keys={gridKeys} items={preparedCurrencies} />
                </Tab>
                <Tab eventKey="favorites" title="Favorites currencies">
                    <ButtonContainer>
                        <Button variant="link" onClick={removeAllFavorites}>
                            Remove all
                        </Button>
                    </ButtonContainer>
                    <Grid keys={gridKeys} items={preparedFavorites} />
                </Tab>
            </Tabs>
        </ContentContainer>
    );
}
