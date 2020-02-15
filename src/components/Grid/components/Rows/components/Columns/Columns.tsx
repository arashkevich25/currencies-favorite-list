import React from 'react';
import { Button } from 'react-bootstrap';
import { GridItem } from '../../../../../../types';

interface ColumnsProps {
    item: GridItem;
    keys: Partial<keyof GridItem>[];
}

export function Columns(props: ColumnsProps) {
    function onClickHandle() {
        props.item.onClick(props.item);
    }

    return (
        <>
            {props.keys.map((key, index) => (
                <td key={index}>{props.item[key]}</td>
            ))}
            <td align="center">
                <Button variant="link" onClick={onClickHandle}>
                    {props.item.isFavorite
                        ? 'Remove from favorite'
                        : 'Add to favorite'}
                </Button>
            </td>
        </>
    );
}
