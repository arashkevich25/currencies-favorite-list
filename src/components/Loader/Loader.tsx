import React from 'react';
import { ContentContainer } from './styled';
import { Spinner } from 'react-bootstrap';

export function Loader() {
    return (
        <ContentContainer>
            <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
        </ContentContainer>
    );
}
