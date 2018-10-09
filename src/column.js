import React from 'react'
import styled from 'styled-components'
import Task from './task'
import { Droppable, Draggable } from 'react-beautiful-dnd'

const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    background-color: white;
    border-radius: 2px;    
    display: flex;
    width: 200px;
    flex-direction: column;
    
`;
const Title = styled.h3`
    padding: 8px;

`
const TaskList = styled.div`
    padding: 8px;
    transition: background-color 0.5s ease;
    background-color: ${props => (props.isDraggingOver ? 'whitesmoke' : 'white')}
    flex-grow: 1;
    min-height: 100px;
`

class Column extends React.Component {
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
                                    <TaskList
                                        isDraggingOver={snapshot.isDraggingOver}
                                        {...provided.droppableProps} 
                                        innerRef={provided.innerRef}
                                    >
                                        {this.props.tasks.map((task, index) => <Task key={task.id} index={index} task={task} />)}
                                        {provided.placeholder}
                                    </TaskList>
                                )}
                            </Droppable>
                        </Container>
                    )}
                </Draggable>
            </div>
        )           
    }
}

export default Column