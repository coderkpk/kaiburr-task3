import React from 'react';
import { Task } from '../types';
import { TerminalIcon, CalendarIcon } from './Icons';

interface TaskDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    task: Task;
}

const TaskDetailsModal: React.FC<TaskDetailsModalProps> = ({ isOpen, onClose, task }) => {
    if (!isOpen) return null;
    
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString();
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50" onClick={onClose}>
            <div className="bg-gray-900 rounded-lg shadow-xl w-full max-w-3xl border border-gray-700 transform transition-all" onClick={e => e.stopPropagation()}>
                <div className="p-6 border-b border-gray-800">
                    <h2 className="text-2xl font-bold text-white">{task.name}</h2>
                    <p className="text-sm text-gray-400">Owned by: {task.owner}</p>
                    <div className="mt-2 flex items-center gap-2 bg-gray-800 p-2 rounded-md">
                        <TerminalIcon className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                        <code className="text-cyan-300 font-mono text-sm">{task.command}</code>
                    </div>
                </div>

                <div className="p-6 max-h-[60vh] overflow-y-auto">
                    <h3 className="text-lg font-semibold text-gray-200 mb-4">Execution History</h3>
                    {task.taskExecutions.length > 0 ? (
                        <div className="space-y-4">
                            {task.taskExecutions.slice().reverse().map((exec, index) => (
                                <div key={index} className="bg-gray-800 rounded-lg p-4">
                                    <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center text-xs text-gray-400 mb-2 gap-1 sm:gap-4">
                                        <div className="flex items-center gap-2">
                                            <CalendarIcon className="w-4 h-4 flex-shrink-0" />
                                            <span><strong>Start Time:</strong> {formatDate(exec.startTime)}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                             <CalendarIcon className="w-4 h-4 flex-shrink-0" />
                                            <span><strong>End Time:</strong> {formatDate(exec.endTime)}</span>
                                        </div>
                                    </div>
                                    <pre className="bg-gray-950 text-white p-3 rounded-md text-sm whitespace-pre-wrap overflow-x-auto font-mono">
                                        {exec.output}
                                    </pre>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center py-8">This task has not been executed yet.</p>
                    )}
                </div>

                <div className="p-4 bg-gray-900/50 border-t border-gray-800 flex justify-end">
                    <button onClick={onClose} className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 text-white font-semibold transition">Close</button>
                </div>
            </div>
        </div>
    );
};

export default TaskDetailsModal;