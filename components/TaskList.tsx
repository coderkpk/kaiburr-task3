
import React from 'react';
import { Task } from '../types';
import { EditIcon, TrashIcon, PlayIcon, EyeIcon, ClockIcon } from './Icons';

interface TaskListProps {
    tasks: Task[];
    onDelete: (id: string) => void;
    onRun: (id: string) => void;
    onViewDetails: (task: Task) => void;
    onEdit: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete, onRun, onViewDetails, onEdit }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-800">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider hidden md:table-cell">Owner</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider hidden lg:table-cell">Command</th>
                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">Executions</th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-gray-900 divide-y divide-gray-800">
                    {tasks.map((task) => (
                        <tr key={task.id} className="hover:bg-gray-800/50 transition-colors duration-200">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-white">{task.name}</div>
                                <div className="text-sm text-gray-400 md:hidden">{task.owner}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 hidden md:table-cell">{task.owner}</td>
                            <td className="px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                                <code className="text-sm bg-gray-800 px-2 py-1 rounded-md text-cyan-300 font-mono">{task.command}</code>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 text-center">
                                <div className="flex items-center justify-center gap-2">
                                    <ClockIcon className="w-4 h-4 text-gray-500" />
                                    <span>{task.taskExecutions.length}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <div className="flex items-center justify-end space-x-2">
                                    <button onClick={() => onViewDetails(task)} className="p-2 text-gray-400 hover:text-blue-400 rounded-full hover:bg-gray-700 transition" title="View Details">
                                        <EyeIcon className="w-5 h-5" />
                                    </button>
                                     <button onClick={() => onRun(task.id)} className="p-2 text-gray-400 hover:text-green-400 rounded-full hover:bg-gray-700 transition" title="Run Task">
                                        <PlayIcon className="w-5 h-5" />
                                    </button>
                                    <button onClick={() => onEdit(task)} className="p-2 text-gray-400 hover:text-yellow-400 rounded-full hover:bg-gray-700 transition" title="Edit Task">
                                        <EditIcon className="w-5 h-5" />
                                    </button>
                                    <button onClick={() => onDelete(task.id)} className="p-2 text-gray-400 hover:text-red-400 rounded-full hover:bg-gray-700 transition" title="Delete Task">
                                        <TrashIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TaskList;
