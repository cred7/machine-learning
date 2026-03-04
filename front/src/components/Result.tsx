import React from "react";

interface ResultProps {
  message: number[] | string;
  variant?: "success" | "error" | "info";
  className?: string;
}

const Result: React.FC<ResultProps> = ({
  message,
  variant = "info",
  className = "",
}) => {
  const colors = {
    success: "bg-green-100 border-green-500 text-green-700",
    error: "bg-red-100 border-red-500 text-red-700",
    info: "bg-blue-100 border-blue-500 text-blue-700",
  };
  if (message instanceof Array) {
    console.log("hurray");
  } else {
    console.log("no wayyyyy");
  }
  return (
    <div className={`border-l-4 p-4 ${colors[variant]} ${className}`}>
      <p className="w-full break-words whitespace-pre-wrap ">
        {message instanceof Array
          ? message.map((j) => <span>{j} ,</span>)
          : message}
      </p>
    </div>
  );
};

export default Result;
