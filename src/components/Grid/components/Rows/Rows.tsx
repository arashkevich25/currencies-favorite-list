import React from 'react';
import { Columns } from './components/Columns';
import { GridItem } from '../../../../types';

interface BodyItemsProps {
    items: GridItem[];
    keys: Partial<keyof GridItem>[];
}

export function Rows(props: BodyItemsProps) {
    return (
        <>
            {props.items.map(item => (
                <tr key={item.code}>
                    <Columns keys={props.keys} item={item} />
                </tr>
            ))}
        </>
    );
}
