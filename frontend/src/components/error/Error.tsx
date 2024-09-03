import React from "react";

interface ErrorComponentProps {
  error: string;
  reload: () => void;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ error, reload }) => {
  return (
    <div className="flex flex-col items-center justify-center h-[98vh] w-full">
      <h2 className="mb-5 text-blue-500 text-2xl">500 Server Error</h2>
      <button
        onClick={reload}
        className="px-8 py-4 text-white text-xl border border-white rounded bg-blue-500 cursor-pointer"
      >
        Try again
      </button>
    </div>
  );
};

export default ErrorComponent;
