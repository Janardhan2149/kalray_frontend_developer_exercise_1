// src/taskTable/TaskTable.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskTable from './TaskTable';
import { Task } from './Task';

describe('TaskTable Component', () => {
    const mockTasks: Task[] = [
        { id: 1, content: 'Task 1', done: false, done_time: null },
        { id: 2, content: 'Task 2', done: true, done_time: '2023-01-01T12:00:00Z' },
    ];
    const mockSetTasks = jest.fn();

    test('renders and displays tasks', () => {
        render(<TaskTable tasks={mockTasks} setTasks={mockSetTasks} />);

        expect(screen.getByText('Task 1')).toBeTruthy();
        expect(screen.getByText('Task 2')).toBeTruthy();
    });

    test('filters tasks based on input', () => {
        render(<TaskTable tasks={mockTasks} setTasks={mockSetTasks} />);

        const filterInput = screen.getByLabelText(/filter tasks/i);
        fireEvent.change(filterInput, { target: { value: '1' } });

        expect(screen.getByText('Task 1')).toBeTruthy();
        expect(screen.queryByText('Task 2')).toBeNull(); // Task 2 should be filtered out
    });

    test('opens modal for adding a new task', () => {
        render(<TaskTable tasks={mockTasks} setTasks={mockSetTasks} />);

        const addButton = screen.getByRole('button', { name: /add task/i });
        fireEvent.click(addButton);

        expect(screen.getByLabelText(/task content/i)).toBeInTheDocument();
    });

    test('opens modal for editing a task', () => {
        render(<TaskTable tasks={mockTasks} setTasks={mockSetTasks} />);

        const editButton = screen.getAllByRole('button', { name: /edit/i })[0];
        fireEvent.click(editButton);

        expect(screen.getByLabelText(/task content/i)).toHaveValue('Task 1');
    });
});
