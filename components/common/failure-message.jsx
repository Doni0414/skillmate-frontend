import clsx from "clsx";

export function FailureMessage({ showMessage, failureMessage }) {
  return (
    <div
      className={clsx(
        "fixed top-5 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-md shadow-md transition-all duration-500 ease-in-out",
        showMessage ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5",
      )}
    >
      {failureMessage}
    </div>
  );
}
