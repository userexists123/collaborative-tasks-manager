import React, { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes } from "react";

type TextInputProps = {
  title: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(({ title, ...props }, ref) => (
  <div className="mb-4">
      <label className="block text-md font-medium text-gray-700 mb-1">{title}</label>
      <input
        ref={ref}
        {...props}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-md"
      />
    </div>
));

type TextAreaProps = {
  title: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({ title, ...props }, ref) => {
  return (
    <div className="mb-4">
      <label className="block text-md font-medium text-gray-700 mb-1">{title}</label>
      <textarea
        ref={ref}
        rows={4}
        {...props}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-md"
      />
    </div>
  );
});
