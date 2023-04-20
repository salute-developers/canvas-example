import React from 'react';
import { Col, Row } from '@salutejs/plasma-ui';
import styled from 'styled-components';

export interface ErrorPageProps {
    /** Основной и дополнительный текст об ошибке */
    error: {
        status: string;
        message?: string;
    };
}

export const StyledHeaderContainer = styled.div`
    position: fixed;
    width: 100vw;
    top: 0;
    left: 0;
    padding-left: var(--plasma-grid-margin);
    padding-right: var(--plasma-grid-margin);
`;

const StyledContainer = styled(Row)`
    flex-direction: column;
    align-items: center;
    flex: 1;
`;

const StyledWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    height: '100vh';
    margin: 0 calc(var(--plasma-grid-margin) * -1);
    padding: 0 var(--plasma-grid-margin);
    margin-top: 20%;
`;

/** Компонент страницы для отображения состояния ошибки */
export const ErrorPage: React.FC<ErrorPageProps> = ({ error }) => {
    return (
        <StyledWrapper>
            <StyledContainer>
                <Col>{error.status}</Col>
                <Col>{error.message}</Col>
            </StyledContainer>
        </StyledWrapper>
    );
};
