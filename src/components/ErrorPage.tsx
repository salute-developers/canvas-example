import { Container, Col } from '@salutejs/plasma-ui';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
    align-items: center;
    flex: 1;
    margin-top: 10rem;

    @media (max-width: 768px) {
        text-align: center;
    }
`;

export const ErrorPage = ({ status, message }: { status: string; message?: string }) => {
    return (
        <StyledContainer>
            <Col>{status}</Col>
            {!!message && <Col>{message}</Col>}
        </StyledContainer>
    );
};
