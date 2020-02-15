import { Currency } from './Currency';

export interface GridItem extends Currency {
    onClick: (currency: Currency) => void;
    isFavorite: boolean;
}
