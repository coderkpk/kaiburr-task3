
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Task, TaskExecution } from './types';
import * as apiService from './services/apiService';
import Header from './components/Header';
import TaskList from './components/TaskList';
import TaskFormModal from './components/TaskFormModal';
import TaskDetailsModal from './components/TaskDetailsModal';
import { SearchIcon, PlusIcon, LoaderIcon, AlertTriangleIcon } from './components/Icons';

const App: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isFormModalOpen, setIsFormModalOpen] = useState<boolean>(false);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState<boolean>(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

    const fetchTasks = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const fetchedTasks = searchTerm 
                ? await apiService.findTasksByName(searchTerm) 
                : await apiService.getTasks();
            setTasks(fetchedTasks);
        } catch (err) {
            setError('Failed to fetch tasks. The mock server might be down.');
            setTasks([]);
        } finally {
            setIsLoading(false);
        }
    }, [searchTerm]);

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            fetchTasks();
        }, 300); // Debounce search input

        return () => clearTimeout(debounceTimer);
    }, [fetchTasks]);

    const handleCreateOrUpdateTask = async (taskData: Omit<Task, 'id' | 'taskExecutions'>) => {
        setIsLoading(true);
        const taskToSave = taskToEdit
            ? { ...taskToEdit, ...taskData }
            : { ...taskData, id: '', taskExecutions: [] }; // ID will be set by mock API
        
        try {
            await apiService.createOrUpdateTask(taskToSave);
            await fetchTasks();
        } catch (err) {
            setError('Failed to save task.');
        } finally {
            setIsFormModalOpen(false);
            setTaskToEdit(null);
            setIsLoading(false);
        }
    };

    const handleDeleteTask = async (taskId: string) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            setIsLoading(true);
            try {
                await apiService.deleteTask(taskId);
                await fetchTasks();
            } catch (err) {
                setError('Failed to delete task.');
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleRunTask = async (taskId: string) => {
        setIsLoading(true);
        try {
            await apiService.runTaskExecution(taskId);
            // Re-fetch all tasks to get updated execution list
            await fetchTasks(); 
        } catch (err) {
            setError('Failed to run task.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenCreateModal = () => {
        setTaskToEdit(null);
        setIsFormModalOpen(true);
    };
    
    const handleOpenEditModal = (task: Task) => {
        setTaskToEdit(task);
        setIsFormModalOpen(true);
    };

    const handleOpenDetailsModal = (task: Task) => {
        setSelectedTask(task);
        setIsDetailsModalOpen(true);
    };

    const filteredTasks = useMemo(() => tasks, [tasks]);

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                    <LoaderIcon className="w-12 h-12 animate-spin text-brand-purple" />
                    <p className="mt-4 text-lg">Loading Tasks...</p>
                </div>
            );
        }

        if (error) {
            return (
                <div className="flex flex-col items-center justify-center h-64 bg-red-900/20 text-red-300 rounded-lg p-6">
                    <AlertTriangleIcon className="w-12 h-12" />
                    <p className="mt-4 text-lg font-semibold">An Error Occurred</p>
                    <p className="text-sm">{error}</p>
                </div>
            );
        }

        if (tasks.length === 0) {
            return (
                <div className="text-center py-16 text-gray-500">
                    <h3 className="text-xl font-semibold">No Tasks Found</h3>
                    <p className="mt-2">
                        {searchTerm ? `No tasks match your search for "${searchTerm}".` : "Get started by creating a new task."}
                    </p>
                </div>
            );
        }

        return (
            <TaskList
                tasks={filteredTasks}
                onDelete={handleDeleteTask}
                onRun={handleRunTask}
                onViewDetails={handleOpenDetailsModal}
                onEdit={handleOpenEditModal}
            />
        );
    };
    
    return (
        <div className="min-h-screen bg-gray-950 font-sans">
            <Header />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-gray-900 shadow-xl rounded-lg p-6">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                        <h1 className="text-2xl font-bold text-gray-100">Task Dashboard</h1>
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <div className="relative flex-grow">
                                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Find tasks by name..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent transition"
                                />
                            </div>
                            <button
                                onClick={handleOpenCreateModal}
                                className="flex items-center justify-center gap-2 px-4 py-2 bg-brand-purple hover:bg-brand-purple-dark text-white font-semibold rounded-md shadow-md transition-transform transform hover:scale-105"
                            >
                                <PlusIcon className="w-5 h-5" />
                                <span className="hidden sm:inline">New Task</span>
                            </button>
                        </div>
                    </div>
                    {renderContent()}
                </div>
            </main>
            
            {isFormModalOpen && (
                <TaskFormModal
                    isOpen={isFormModalOpen}
                    onClose={() => setIsFormModalOpen(false)}
                    onSubmit={handleCreateOrUpdateTask}
                    initialData={taskToEdit}
                />
            )}
            
            {isDetailsModalOpen && selectedTask && (
                <TaskDetailsModal
                    isOpen={isDetailsModalOpen}
                    onClose={() => setIsDetailsModalOpen(false)}
                    task={selectedTask}
                />
            )}
        </div>
    );
};

export default App;
