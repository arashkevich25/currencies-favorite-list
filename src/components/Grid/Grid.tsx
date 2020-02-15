import React from 'react';
import { Table } from 'react-bootstrap';
import { Rows } from './components';
import { GridItem } from '../../types';
import { ActionHeader, Header } from './styled';

interface GridProps {
    items: GridItem[];
    keys: Partial<keyof GridItem>[];
}

export function Grid(props: GridProps) {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <Header>Currency</Header>
                    <Header>Code</Header>
                    <Header>Bid</Header>
                    <Header>Ask</Header>
                    <ActionHeader>Action</ActionHeader>
                </tr>
            </thead>
            <tbody>
                <Rows keys={props.keys} items={props.items} />
            </tbody>
        </Table>
    );
}
