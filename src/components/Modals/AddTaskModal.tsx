'use client';

import React from "react";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { v4 as uuidv4 } from 'uuid';
import Joi from "joi";
import SelectInput from "../Input/SelectInput";
import { TextArea, TextInput } from "../Input/TextInput";
import DatePicker from "../DatePicker";
import { inputTitles, priorityOptions, statusOptions } from "@/lib/data";
import { addTask, updateTask } from "@/features/tasks/taskSlice";
import { useTaskUI } from "@/context/TaskContext";

const dynamicSchemaShape = inputTitles.reduce((acc, item) => {
    const key = item.title.toLowerCase();
    if (key === "assignee") {
        acc[key] = Joi.string().optional().allow("").messages({
            "string.base": "Assignee must be a string"
        });
    } else {
        acc[key] = Joi.string().min(3).required().messages({
            "string.empty": "This field is required",
            "string.min": `${item.title} must be at least 3 characters`,
        });
    }

    return acc;
}, {} as Record<string, Joi.StringSchema>);

export const taskSchema = Joi.object({
    ...dynamicSchemaShape,
    id: Joi.string().optional().allow(null, ""),
    description: Joi.string().optional().allow("").messages({}),
    date: Joi.string().optional().allow("").messages({}),
    priority: Joi.string().required().messages({
        "string.empty": "Priority is required",
    }),
    status: Joi.string().required().messages({
        "string.empty": "Status is required",
    }),
});

export type FormValues = {
    id: string;
    [key: string]: string | null;
    description: string;
    date: string;
    priority: string | null;
    status: string | null;
};

const AddTaskModal = () => {
    const { editTask, setEditTask, setShowAddModal } = useTaskUI();
    const dispatch = useDispatch();

    const defaultValues = editTask ?? inputTitles.reduce((acc, item) => {
        acc[item.title.toLowerCase()] = "";
        return acc;
    }, {
        description: "",
        date: "",
        priority: null,
        status: null,
    } as FormValues);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: joiResolver(taskSchema),
        defaultValues: defaultValues

    });

    const onSubmit = (data: FormValues) => {
        console.log("sumbit clickeddd")
        try {
            const newTaskWithId = { ...data, id: uuidv4() }; 
            dispatch(addTask(newTaskWithId));
            setShowAddModal(false)
            setEditTask(undefined);
        } catch (e) {
            console.error("Submit error:", e);
        }
    };

    const onEditSubmit = (data: FormValues) => {
        console.log("edit clickedddd")
        try {
            if (!data.id) {
                console.error("Edit task missing ID");
                return;
            }

            dispatch(updateTask(data));
            setShowAddModal(false)
            setEditTask(undefined);
        } catch (e) {
            console.error("Edit error:", e);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-lg max-h-[80vh] overflow-y-auto">
                <h1 className="text-2xl font-semibold mb-6 text-center">{editTask ? "Edit Task" : "Add Task"}</h1>
                <form onSubmit = { editTask ? handleSubmit(onEditSubmit) : handleSubmit(onSubmit)} className="space-y-4">
                    <input type="hidden" {...register("id")} />
                    {inputTitles.map((item, id) => {
                        const fieldName = item.title.toLowerCase();
                        return (
                            <div key={id}>
                                <TextInput
                                    title={item.title}
                                    {...register(fieldName)}
                                />
                                {errors[fieldName] && (
                                    <p className="text-sm text-red-500">
                                        {errors[fieldName]?.message}
                                    </p>
                                )}
                            </div>
                        );
                    })}
                    <div>
                        <TextArea title="description" {...register("description")} />
                        {errors.description && (
                            <p className="text-sm text-red-500">
                                {errors.description.message}
                            </p>
                        )}
                    </div>
                    <Controller
                        name="date"
                        control={control}
                        render={({ field }) => (
                            <DatePicker date={field.value || ""} onSelect={field.onChange} />
                        )}
                    />
                    {errors.date && (
                        <p className="text-sm text-red-500">{errors.date.message}</p>
                    )}

                    <Controller
                        name="priority"
                        control={control}
                        render={({ field }) => (
                            <SelectInput
                                label="Priority"
                                value={field.value}
                                options={priorityOptions}
                                onChange={field.onChange}
                            />
                        )}
                    />
                    {errors.priority && (
                        <p className="text-sm text-red-500">{errors.priority.message}</p>
                    )}

                    <Controller
                        name="status"
                        control={control}
                        render={({ field }) => (
                            <SelectInput
                                label="Status"
                                value={field.value}
                                options={statusOptions}
                                onChange={field.onChange}
                            />
                        )}
                    />
                    {errors.status && (
                        <p className="text-sm text-red-500">{errors.status.message}</p>
                    )}

                    <div className="flex justify-center gap-4 mt-6">
                        <button
                            type="button"
                            onClick={()=>{setShowAddModal(false)}}
                            className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 transition"
                        >
                            Cancel
                        </button>

                        {!editTask ? <button
                            type="submit"
                            className="px-4 py-2 rounded-md bg-black text-white hover:bg-gray-400 transition"
                        >
                            Create
                        </button>
                            :
                            <button
                                type="submit"
                                className="px-4 py-2 rounded-md bg-black text-white hover:bg-gray-400 transition"
                                onClick={()=> console.log("submitted.........")}
                            >
                                Submit
                            </button>}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTaskModal;
