import clsx from "clsx";
import { firaSans } from "../../fonts";

export function FormLayout({ onSubmit, infoHeader, formFields, submitButton }) {
  return (
    <form
      onSubmit={onSubmit}
      className={clsx(
        "mt-32 mx-auto w-[550px] bg-white border-black border-2  pt-8 px-3 pb-10 gap-5",
        firaSans.className,
      )}
    >
      <div className="mb-4">{infoHeader}</div>
      <div className="mb-6">{formFields}</div>
      {submitButton}
    </form>
  );
}
