import React, { useState, useMemo } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, Pagination } from '@mui/material';
import './TaskTable.sass';
import TaskRow from '../taskRow/TaskRow';
import TaskFormModal from '../taskFormModal/TaskFormModal';
import { Task } from './Task';

// Define the props that the TaskTable component will accept
interface TaskTableProps {
    tasks: Task[];                  // Array of tasks to display in the table
    setTasks: (tasks: Task[]) => void; // Function to update the list of tasks
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks, setTasks }) => {
    // State to manage the filter text
    const [filter, setFilter] = useState<string>('');
    
    // State to manage sorting options (by field and direction)
    const [sortBy, setSortBy] = useState<{ field: keyof Task; direction: 'asc' | 'desc' }>({ field: 'content', direction: 'asc' });

    // State to manage the current page for pagination
    const [currentPage, setCurrentPage] = useState<number>(1);

    // State to control the modal visibility
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    // State to keep track of the task being edited in the modal
    const [modalTask, setModalTask] = useState<Task | null>(null);

    // Function to handle filter input change
    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => setFilter(event.target.value);

    // Memoized calculation of filtered and sorted tasks
    const sortedFilteredTasks = useMemo(() => {
        // Filter tasks based on the content and filter text
        let filteredTasks = tasks.filter(task => task.content.toLowerCase().includes(filter.toLowerCase()));

        // Sort the filtered tasks by the selected field and direction
        filteredTasks.sort((taskA, taskB) => {
            const valueA = taskA[sortBy.field] ?? ''; // Fallback to empty string if the value is null/undefined
            const valueB = taskB[sortBy.field] ?? '';

            // Compare the values and adjust based on the direction
            const comparison = valueA > valueB ? 1 : (valueA < valueB ? -1 : 0);
            return sortBy.direction === 'asc' ? comparison : -comparison;
        });

        return filteredTasks;
    }, [tasks, filter, sortBy]);

    // Constants for pagination logic
    const tasksPerPage = 10;
    const paginatedTasks = sortedFilteredTasks.slice((currentPage - 1) * tasksPerPage, currentPage * tasksPerPage);
    const totalPages = Math.ceil(sortedFilteredTasks.length / tasksPerPage);

    // Function to handle sorting by a specific field
    const handleSort = (field: keyof Task) => {
        setSortBy({
            field,
            direction: sortBy.direction === 'asc' ? 'desc' : 'asc', // Toggle the sorting direction
        });
    };

    // Function to open the modal for adding a new task
    const openModalForAdding = () => {
        setModalTask(null); // No initial task for adding
        setIsModalOpen(true); // Open the modal
    };

    // Function to open the modal for editing an existing task
    const openModalForEditing = (task: Task) => {
        setModalTask(task); // Pass the task to be edited
        setIsModalOpen(true); // Open the modal
    };

    return (
        <div className="task-table">
            {/* Input field for filtering tasks */}
            <TextField 
                label="Filter tasks" 
                variant="outlined" 
                fullWidth 
                value={filter} 
                onChange={handleFilterChange} 
            />
            {/* Button to open the modal for adding a new task */}
            <Button 
                variant="contained" 
                color="primary" 
                onClick={openModalForAdding} 
                className="add-task-button"
            >
                Add Task
            </Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {/* Clickable table headers for sorting */}
                            <TableCell onClick={() => handleSort('content')}>Task</TableCell>
                            <TableCell onClick={() => handleSort('done_time')}>Done Time</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* Map through the paginated tasks to render each TaskRow */}
                        {paginatedTasks.map(task => (
                            <TaskRow 
                                key={task.id} 
                                task={task} 
                                tasks={tasks} 
                                setTasks={setTasks} 
                                openModalForEditing={openModalForEditing} // Pass the edit function to TaskRow
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* Pagination component for navigating between pages */}
            <Pagination 
                count={totalPages} 
                page={currentPage} 
                onChange={(_, page) => setCurrentPage(page)} 
                className="pagination" 
            />
            {/* Modal for adding/editing a task */}
            <TaskFormModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                tasks={tasks} 
                setTasks={setTasks} 
                initialTask={modalTask} // Pass the task for editing or null for adding
            />
        </div>
    );
};

export default TaskTable;
