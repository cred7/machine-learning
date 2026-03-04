import React from "react";

interface InputProps extends React.InputHTMLAttributes<
  HTMLInputElement | HTMLTextAreaElement
> {
  label?: string;
  type?: string;
  className?: string;
}

const Input = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputProps
>(({ label, type = "text", className = "", ...props }, ref) => {
  const baseClass =
    "border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500";
  const combined = `${baseClass} ${className}`;

  if (type === "textarea") {
    return (
      <div className="flex flex-col w-full">
        {label && <label className="mb-1 font-semibold">{label}</label>}
        <textarea
          ref={ref as React.Ref<HTMLTextAreaElement>}
          className={combined}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      {label && <label className="mb-1 font-semibold">{label}</label>}
      <input
        ref={ref as React.Ref<HTMLInputElement>}
        type={type}
        className={combined}
        {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
      />
    </div>
  );
});

Input.displayName = "Input";
export default Input;
