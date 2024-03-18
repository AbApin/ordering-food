import clsx from 'clsx';
import { useState } from 'react';

export default function DeleteButton({ children, onSubmit, className }) {
  const [showConfirm, setShowConfirm] = useState(false);

  if (showConfirm) {
    return (
      <div className="fixed flex justify-center items-center w-full h-full top-0 left-0 bg-black/50">
        <div className="max-w-md w-full bg-white p-4 rounded-md">
          <h4 className="text-center font-semibold">Do you want to delete?</h4>
          <div className="flex items-center gap-2 mt-4">
            <button type="button" onClick={() => setShowConfirm(false)}>
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                setShowConfirm(false);
                onSubmit();
              }}
              className="bg-primary text-white">
              Yes, delete!
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button type="button" onClick={() => setShowConfirm(true)} className={clsx(className)}>
      {children}
    </button>
  );
}
