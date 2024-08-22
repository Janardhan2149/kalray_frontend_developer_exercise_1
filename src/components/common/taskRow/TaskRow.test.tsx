    // src/taskRow/TaskRow.test.tsx
    import React from 'react';
    import { render, screen, fireEvent } from '@testing-library/react';
    import TaskRow from './TaskRow';
    import { Task } from '../taskTable/Task';

    describe('TaskRow Component', () => {
        const mockTask: Task = {
            id: 1,
            content: 'Test Task',
            done: false,
            done_time: null,
        };

        const mockTasks: Task[] = [mockTask];
        const mockSetTasks = jest.fn();
        const mockOpenModalForEditing = jest.fn();

        test('renders task content and pending status', () => {
            render(
                <TaskRow
                    task={mockTask}
                    tasks={mockTasks}
                    setTasks={mockSetTasks}
                    openModalForEditing={mockOpenModalForEditing}
                />
            );

            expect(screen.getByText('Test Task')).toBeTruthy();
            expect(screen.getByText('Pending')).toBeTruthy();
        });

        test('calls setTasks when the done/undo button is clicked', () => {
            render(
                <TaskRow
                    task={mockTask}
                    tasks={mockTasks}
                    setTasks={mockSetTasks}
                    openModalForEditing={mockOpenModalForEditing}
                />
            );

            const doneButton = screen.getByRole('button', { name: /done/i });
            fireEvent.click(doneButton);

            expect(mockSetTasks).toHaveBeenCalledTimes(1);
        });

        test('calls openModalForEditing when edit button is clicked', () => {
            render(
                <TaskRow
                    task={mockTask}
                    tasks={mockTasks}
                    setTasks={mockSetTasks}
                    openModalForEditing={mockOpenModalForEditing}
                />
            );

            const editButton = screen.getByRole('button', { name: /edit/i });
            fireEvent.click(editButton);

            expect(mockOpenModalForEditing).toHaveBeenCalledWith(mockTask);
        });

        test('calls setTasks when delete button is clicked', () => {
            render(
                <TaskRow
                    task={mockTask}
                    tasks={mockTasks}
                    setTasks={mockSetTasks}
                    openModalForEditing={mockOpenModalForEditing}
                />
            );

            const deleteButton = screen.getByRole('button', { name: /delete/i });
            fireEvent.click(deleteButton);

            expect(mockSetTasks).toHaveBeenCalledTimes(1);
        });
    });
