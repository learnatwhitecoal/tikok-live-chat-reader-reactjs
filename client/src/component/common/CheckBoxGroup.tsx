import { ErrorMessage, Field } from "formik";
interface CheckBoxGroupProps {
  name: string;
  label: string;
  options: string[];
}
export const CheckBoxGroup = ({ name, label, options }: CheckBoxGroupProps) => {
  return (
    <div className="form-group mt-1">
      <div className="check-group flex gap-3">
        {options.map((value, index) => (
          <div className="wrapper inline-flex gap-1" key={index}>
            <Field
              type="checkbox"
              className="w-[20px]"
              value={value}
              name={name}
              id={name}
            />
            <label className="text-lg">{value}</label>
          </div>
        ))}
      </div>
      <span className="text-red-400 mt-2 font-semibold">
        <ErrorMessage name={name} />
      </span>
    </div>
  );
};
