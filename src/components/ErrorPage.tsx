import { Container, Col } from '@salutejs/plasma-ui';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
    align-items: center;
    flex: 1;
    margin-top: 10rem;
    @media (max-width: 768px) {
        margin-top: 5rem;
        text-align: center;
        padding: 5px;
    }
`;

export const ErrorPage = (error: { status: string; message?: string }) => {
    return (
        <StyledContainer>
            <Col>{error.status}</Col>
            {error.message ? <Col>{error.message}</Col> : null}
        </StyledContainer>
    );
};
