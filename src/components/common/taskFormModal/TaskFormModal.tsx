import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';
import './TaskFormModal.sass';
import { Task } from '../taskTable/Task';

// Define the props that the TaskFormModal component will accept
interface TaskFormModalProps {
    isOpen: boolean;                // Controls if the modal is open or closed
    onClose: () => void;            // Function to be called when the modal is closed
    tasks: Task[];                  // List of all tasks
    setTasks: (tasks: Task[]) => void; // Function to update the list of tasks
    initialTask: Task | null;       // Task to be edited, or null if adding a new task
}

const TaskFormModal: React.FC<TaskFormModalProps> = ({ isOpen, onClose, tasks, setTasks, initialTask }) => {
    // State to hold the content of the task being added or edited
    const [taskContent, setTaskContent] = useState<string>('');

    // Effect to update taskContent when initialTask changes
    useEffect(() => {
        if (initialTask) {
            setTaskContent(initialTask.content); // Populate input with existing task content for editing
        } else {
            setTaskContent(''); // Clear input if adding a new task
        }
    }, [initialTask]);

    // Function to handle saving the task (either adding or updating)
    const handleSave = () => {
        if (initialTask) {
            // Update an existing task
            const updatedTasks = tasks.map(task =>
                task.id === initialTask.id ? { ...task, content: taskContent } : task
            );
            setTasks(updatedTasks);
        } else {
            // Add a new task
            const newTask: Task = {
                id: tasks.length ? Math.max(...tasks.map(task => task.id)) + 1 : 1, // Generate new ID
                content: taskContent,
                done: false,
                done_time: null,
            };
            setTasks([...tasks, newTask]); // Append new task to the list
        }
        setTaskContent(''); // Clear input after saving
        onClose(); // Close the modal
    };

    return (
        <Modal open={isOpen} onClose={onClose}>
            <Box className="task-form-modal">
                <TextField 
                    label="Task Content" 
                    value={taskContent} 
                    onChange={(e) => setTaskContent(e.target.value)} 
                    fullWidth 
                />
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleSave} 
                    className="add-task-button"
                >
                    {initialTask ? 'Update Task' : 'Add Task'} {/* Button text changes based on whether editing or adding */}
                </Button>
            </Box>
        </Modal>
    );
};

export default TaskFormModal;
