import styled from 'styled-components';
import {
    Card,
    CardContent,
    Container,
    Row,
    Col,
    TextField,
    LineSkeleton,
    Cell,
    TextBox,
    Checkbox,
} from '@salutejs/plasma-ui';
import { useSection } from '@salutejs/spatial';

import { Note } from '../types/todo';

const NULL_NOTE = {
    id: '',
    completed: false,
    title: '',
};

type Props = {
    inputValue?: string;
    notes?: Note[];
    onCheckNote?: (note: Note) => void;
    onInputSubmit?: React.FormEventHandler<HTMLFormElement>;
    onInputChange?: (newValue: string) => void;
};

const SKELETON_NOTES = [NULL_NOTE, NULL_NOTE, NULL_NOTE];

const StyledContainer = styled(Container)`
    margin: 5rem 0 7rem;
`;

const StyledRow = styled(Row)`
    margin-top: 2rem;
`;

const StyledCol = styled(Col)`
    margin-bottom: 1rem;
`;

export const NoteList = ({ notes = SKELETON_NOTES, onCheckNote, onInputSubmit, inputValue, onInputChange }: Props) => {
    const [section] = useSection('NoteList');

    return (
        <StyledContainer {...section}>
            <Row>
                <Col size={12} sizeXL={6} offsetXL={3}>
                    <form onSubmit={onInputSubmit}>
                        <TextField
                            label="Add Note"
                            disabled={!onInputSubmit}
                            value={inputValue}
                            onChange={(e) => onInputChange?.(e.target.value)}
                        />
                    </form>
                </Col>
            </Row>
            <StyledRow>
                {notes.map((n, i) => (
                    <StyledCol key={i} size={12} sizeXL={6} offsetXL={3}>
                        <Card>
                            <CardContent compact>
                                {n === NULL_NOTE ? (
                                    <LineSkeleton size="headline1" />
                                ) : (
                                    <Cell
                                        content={<TextBox title={`${i + 1}. ${n.title}`} />}
                                        contentRight={
                                            <Checkbox checked={n.completed} onChange={() => onCheckNote?.(n)} />
                                        }
                                    />
                                )}
                            </CardContent>
                        </Card>
                    </StyledCol>
                ))}
            </StyledRow>
        </StyledContainer>
    );
};
