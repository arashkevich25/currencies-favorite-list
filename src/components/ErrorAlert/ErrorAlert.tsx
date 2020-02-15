import React from 'react';
import { Alert } from 'react-bootstrap';

interface ErrorAlertProps {
    error: string;
}

export function ErrorAlert(props: ErrorAlertProps) {
    return <Alert variant="danger">{props.error}</Alert>;
}
