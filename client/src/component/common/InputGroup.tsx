import { ErrorMessage, Field } from "formik";
interface InputGroupProps {
  name: string;
  label: string;
}
export const InputGroup = ({ name, label }: InputGroupProps) => {
  return (
    <div className="form-group">
      <label className="font-bold text-lg">{label}</label>
      <div className="flex flex-col mt-1">
        <Field className="border shadow-md w-1/3 h-10" name={name} id={name} />
        <span className="text-red-400 mt-2 font-semibold">
          <ErrorMessage name={name} />
        </span>
      </div>
    </div>
  );
};
