import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type FormValues = {
    id: string;
    [key: string]: string | null;
    description: string;
    date: string;
    priority: string | null;
    status: string | null;
};

interface taskState {
    tasks: FormValues[];
}

const initialState: taskState = {
    tasks: [],
};

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<FormValues>) => {
            console.log("reached")
            state.tasks.push(action.payload)
        },
        updateTask: (state, action: PayloadAction<FormValues>) => {
            const idx = state.tasks.findIndex(t => t.id === action.payload.id)
            if (idx !== -1) state.tasks[idx] = action.payload
        },
        updateTaskStatus: (
            state,
            action: PayloadAction<{ id: string; status: string }>
        ) => {
            console.log(action)
            const task = state.tasks.find(t => t.id === action.payload.id);
            if (task) {
                task.status = action.payload.status;
            }
        },
        deleteTask: (
            state,
            action: PayloadAction<{ id: string }>
        ) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload.id);
        }
    }
})

export const { addTask, updateTask, updateTaskStatus, deleteTask } = taskSlice.actions
export default taskSlice.reducer;
