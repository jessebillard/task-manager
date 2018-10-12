import React from 'react'
import styled from 'styled-components'
import Note from './note'
import { Button, Icon, Modal } from 'semantic-ui-react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import NoteEditor from './noteEditor';

const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    background-color: white;
    border-radius: 4px;    
    display: flex;
    width: 200px;
    flex-direction: column;
`;
const Title = styled.h3`
    padding: 8px;

`
const NoteList = styled.div`
    padding: 8px;
    transition: background-color 0.5s ease;
    background-color: ${props => (props.isDraggingOver ? 'whitesmoke' : 'white')}
    flex-grow: 1;
    min-height: 100px;
`

class List extends React.Component {

    constructor() {
        super()
        this.state = {
            modalOpen: false
        }
    }

    onAddNoteClick = () => {
        this.setState({
            modalOpen: true
        })
    }

    handleModalClose = () => {
        this.setState({
            modalOpen: false
        })
    }

    render() {
        return (
            <div>
                <Draggable draggableId={this.props.column.id} index={this.props.index}>
                    {(provided) => (
                        <Container
                            {...provided.draggableProps}
                            innerRef={provided.innerRef}
                        >
                            <Title {...provided.dragHandleProps}>{this.props.column.title}</Title>
                            <Droppable droppableId={this.props.column.id} type='task'>
                                {(provided, snapshot) => (
                                    <NoteList
                                        isDraggingOver={snapshot.isDraggingOver}
                                        {...provided.droppableProps} 
                                        innerRef={provided.innerRef}
                                    >
                                        {this.props.tasks.map((task, index) => <Note key={task.id} index={index} task={task} />)}
                                        {provided.placeholder}
                                    </NoteList>
                                )}
                            </Droppable>
                            <div>
                                <Button onClick={this.onAddNoteClick} compact fluid icon labelPosition='left'>
                                    <Icon name='plus'/>
                                    Add Note...
                                </Button>
                            </div>
                        </Container>
                    )}
                </Draggable>
                <Modal size='small' open={this.state.modalOpen} onClose={this.handleModalClose}>
                    <NoteEditor handleModalClose={this.handleModalClose} />                                       
                </Modal>
            </div>
        )           
    }
}

export default List