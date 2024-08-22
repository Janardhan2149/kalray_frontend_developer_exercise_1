// src/taskFormModal/TaskFormModal.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskFormModal from './TaskFormModal';
import { Task } from '../taskTable/Task';

describe('TaskFormModal Component', () => {
    const mockTasks: Task[] = [];
    const mockSetTasks = jest.fn();
    const mockOnClose = jest.fn();

    test('renders with an empty input for adding a task', () => {
        render(
            <TaskFormModal
                isOpen={true}
                onClose={mockOnClose}
                tasks={mockTasks}
                setTasks={mockSetTasks}
                initialTask={null}
            />
        );

        expect(screen.getByLabelText(/task content/i)).toHaveValue('');
    });

    test('renders with existing task content for editing', () => {
        const mockTask: Task = {
            id: 1,
            content: 'Existing Task',
            done: false,
            done_time: null,
        };

        render(
            <TaskFormModal
                isOpen={true}
                onClose={mockOnClose}
                tasks={[mockTask]}
                setTasks={mockSetTasks}
                initialTask={mockTask}
            />
        );

        expect(screen.getByLabelText(/task content/i)).toHaveValue('Existing Task');
    });

    test('updates input value when typing', () => {
        render(
            <TaskFormModal
                isOpen={true}
                onClose={mockOnClose}
                tasks={mockTasks}
                setTasks={mockSetTasks}
                initialTask={null}
            />
        );

        // Cast the element to HTMLInputElement
        const input = screen.getByLabelText(/task content/i) as HTMLInputElement;
        fireEvent.change(input, { target: { value: 'New Task' } });

        expect(input.value).toBe('New Task');
    });

    test('calls setTasks and onClose when save button is clicked', () => {
        render(
            <TaskFormModal
                isOpen={true}
                onClose={mockOnClose}
                tasks={mockTasks}
                setTasks={mockSetTasks}
                initialTask={null}
            />
        );

        const input = screen.getByLabelText(/task content/i) as HTMLInputElement;
        fireEvent.change(input, { target: { value: 'New Task' } });

        const saveButton = screen.getByRole('button', { name: /add task/i });
        fireEvent.click(saveButton);

        expect(mockSetTasks).toHaveBeenCalledTimes(1);
        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
});
