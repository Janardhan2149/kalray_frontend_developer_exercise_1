import React from 'react';
import { TableRow, TableCell, IconButton } from '@mui/material';
import { Delete, Edit, Done, Undo } from '@mui/icons-material';
import { Task } from '../taskTable/Task';
import './TaskRow.sass';

// Interface to define the props that TaskRow component expects
interface TaskRowProps {
    task: Task;                  // The current task to be displayed in the row
    tasks: Task[];               // List of all tasks
    setTasks: (tasks: Task[]) => void; // Function to update the list of tasks
    openModalForEditing: (task: Task) => void; // Function to open a modal for editing a task
}

// TaskRow component definition
const TaskRow: React.FC<TaskRowProps> = ({ task, tasks, setTasks, openModalForEditing }) => {
    
    // Function to toggle the done status of the task
    const handleToggleDone = () => {
        const updatedTasks = tasks.map(taskItem =>
            // Check if the task ID matches the current task ID
            taskItem.id === task.id
            ? { 
                ...taskItem, 
                done: !taskItem.done,  // Toggle the done status
                done_time: taskItem.done ? null : new Date().toISOString() // Update done_time or set it to null
              }
            : taskItem  // Keep the task as is if the ID doesn't match
        );
        setTasks(updatedTasks); // Update the task list with the new task statuses
    };

    // Function to delete the current task
    const handleDelete = () => {
        const updatedTasks = tasks.filter(taskItem => taskItem.id !== task.id);
        setTasks(updatedTasks); // Update the task list with the task removed
    };

    return (
        <TableRow className={task.done ? 'done' : ''}> {/* Apply a 'done' class if the task is completed */}
            <TableCell>{task.content}</TableCell> {/* Display the task content */}
            <TableCell>
                {/* Display the done time if available, otherwise show 'Pending' */}
                {task.done_time ? new Date(task.done_time).toLocaleString() : 'Pending'}
            </TableCell>
            <TableCell>
                <IconButton aria-label="done" onClick={handleToggleDone}>
                    {task.done ? <Undo /> : <Done />} {/* Show the appropriate icon based on task status */}
                </IconButton>
                <IconButton aria-label="edit" onClick={() => openModalForEditing(task)}>
                    <Edit />
                </IconButton>
                <IconButton aria-label="delete" onClick={handleDelete}>
                    <Delete />
                </IconButton>
            </TableCell>
        </TableRow>
    );
};

export default TaskRow;
