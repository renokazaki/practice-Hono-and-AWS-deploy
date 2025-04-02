import React, { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
  title: string;
};

export default function Layout({ children, title }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{title}</h1>
        </div>
        {children}
      </div>
    </div>
  );
}
