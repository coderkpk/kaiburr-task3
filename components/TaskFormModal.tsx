
import React, { useState, useEffect } from 'react';
import { Task } from '../types';

interface TaskFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (task: Omit<Task, 'id' | 'taskExecutions'>) => void;
    initialData?: Task | null;
}

const TaskFormModal: React.FC<TaskFormModalProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
    const [name, setName] = useState('');
    const [owner, setOwner] = useState('');
    const [command, setCommand] = useState('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        if (initialData) {
            setName(initialData.name);
            setOwner(initialData.owner);
            setCommand(initialData.command);
        } else {
            setName('');
            setOwner('');
            setCommand('');
        }
        setErrors({});
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        if (!name.trim()) newErrors.name = 'Task name is required.';
        if (!owner.trim()) newErrors.owner = 'Owner name is required.';
        if (!command.trim()) newErrors.command = 'Command is required.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            onSubmit({ name, owner, command });
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 transition-opacity" onClick={onClose}>
            <div className="bg-gray-900 rounded-lg shadow-xl w-full max-w-lg p-8 border border-gray-700 transform transition-all" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-bold mb-6 text-white">{initialData ? 'Edit Task' : 'Create New Task'}</h2>
                <form onSubmit={handleSubmit} noValidate>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Task Name</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={`w-full px-3 py-2 rounded-md bg-gray-800 border ${errors.name ? 'border-red-500' : 'border-gray-700'} focus:outline-none focus:ring-2 focus:ring-brand-purple`}
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="owner" className="block text-sm font-medium text-gray-300 mb-1">Owner</label>
                        <input
                            id="owner"
                            type="text"
                            value={owner}
                            onChange={(e) => setOwner(e.target.value)}
                            className={`w-full px-3 py-2 rounded-md bg-gray-800 border ${errors.owner ? 'border-red-500' : 'border-gray-700'} focus:outline-none focus:ring-2 focus:ring-brand-purple`}
                        />
                        {errors.owner && <p className="text-red-500 text-xs mt-1">{errors.owner}</p>}
                    </div>
                    <div className="mb-6">
                        <label htmlFor="command" className="block text-sm font-medium text-gray-300 mb-1">Command</label>
                        <input
                            id="command"
                            type="text"
                            value={command}
                            onChange={(e) => setCommand(e.target.value)}
                            className={`w-full px-3 py-2 rounded-md bg-gray-800 border ${errors.command ? 'border-red-500' : 'border-gray-700'} focus:outline-none focus:ring-2 focus:ring-brand-purple font-mono`}
                        />
                        {errors.command && <p className="text-red-500 text-xs mt-1">{errors.command}</p>}
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 text-white font-semibold transition">Cancel</button>
                        <button type="submit" className="px-4 py-2 rounded-md bg-brand-purple hover:bg-brand-purple-dark text-white font-semibold transition">
                            {initialData ? 'Save Changes' : 'Create Task'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskFormModal;
