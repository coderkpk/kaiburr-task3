
import { Task, TaskExecution } from '../types';

let tasks: Task[] = [
    {
        id: '123',
        name: 'Print Hello',
        owner: 'John Smith',
        command: 'echo "Hello World!"',
        taskExecutions: [
            {
                startTime: '2023-04-21T15:51:42.276Z',
                endTime: '2023-04-21T15:51:43.276Z',
                output: 'Hello World!',
            },
        ],
    },
    {
        id: '124',
        name: 'List Files',
        owner: 'Jane Doe',
        command: 'ls -la',
        taskExecutions: [],
    },
    {
        id: '125',
        name: 'Check System Date',
        owner: 'System Admin',
        command: 'date',
        taskExecutions: [
            {
                startTime: '2024-05-10T10:00:00.000Z',
                endTime: '2024-05-10T10:00:01.000Z',
                output: 'Fri May 10 10:00:01 UTC 2024',
            },
            {
                startTime: '2024-05-11T11:30:00.000Z',
                endTime: '2024-05-11T11:30:01.000Z',
                output: 'Sat May 11 11:30:01 UTC 2024',
            },
        ],
    },
];

const simulateDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getTasks = async (): Promise<Task[]> => {
    await simulateDelay(500);
    return JSON.parse(JSON.stringify(tasks));
};

export const getTaskById = async (id: string): Promise<Task | undefined> => {
    await simulateDelay(300);
    return tasks.find(task => task.id === id);
};

export const findTasksByName = async (name: string): Promise<Task[]> => {
    await simulateDelay(400);
    if (!name) return JSON.parse(JSON.stringify(tasks));
    return tasks.filter(task => task.name.toLowerCase().includes(name.toLowerCase()));
};

export const createOrUpdateTask = async (task: Omit<Task, 'taskExecutions'> & { taskExecutions?: TaskExecution[] }): Promise<Task> => {
    await simulateDelay(600);
    // Basic command validation
    const maliciousCommands = /rm -rf|mkfs|shutdown|reboot/i;
    if(maliciousCommands.test(task.command)) {
        throw new Error("Command validation failed: unsafe command detected.");
    }

    const existingIndex = tasks.findIndex(t => t.id === task.id);
    if (existingIndex !== -1) {
        // Update
        tasks[existingIndex] = { ...tasks[existingIndex], ...task };
        return tasks[existingIndex];
    } else {
        // Create
        const newTask: Task = {
            ...task,
            id: String(Date.now() + Math.random()), // Generate a unique ID
            taskExecutions: task.taskExecutions || [],
        };
        tasks.push(newTask);
        return newTask;
    }
};

export const deleteTask = async (id: string): Promise<void> => {
    await simulateDelay(700);
    const initialLength = tasks.length;
    tasks = tasks.filter(task => task.id !== id);
    if(tasks.length === initialLength) {
        throw new Error("Task not found");
    }
};

export const runTaskExecution = async (id: string): Promise<TaskExecution> => {
    await simulateDelay(1000);
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
        throw new Error('Task not found');
    }

    const startTime = new Date();
    const endTime = new Date(startTime.getTime() + (Math.random() * 2000 + 500)); // Simulate 0.5-2.5s execution

    const newExecution: TaskExecution = {
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        output: `Mock output for command: "${tasks[taskIndex].command}"\nExecution successful at ${endTime.toUTCString()}`,
    };

    tasks[taskIndex].taskExecutions.push(newExecution);
    return newExecution;
};
