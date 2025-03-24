import React from "react";

type AlertProps = {
  message: string;
  type?: "error" | "success" | "info";
};

export default function Alert({ message, type = "error" }: AlertProps) {
  if (!message) return null;

  const alertClasses = {
    error: "bg-red-100 border border-red-400 text-red-700",
    success: "bg-green-100 border border-green-400 text-green-700",
    info: "bg-blue-100 border border-blue-400 text-blue-700",
  };

  return (
    <div
      className={`${alertClasses[type]} px-4 py-3 rounded mb-4`}
      role="alert"
    >
      <span className="block sm:inline">{message}</span>
    </div>
  );
}
