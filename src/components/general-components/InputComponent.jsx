import RichTextEditor from "./RichTextEditor";
import PropTypes from "prop-types";

export const InputComponent = ({
  label,
  name,
  type,
  accept,
  richTextEditor,
  setData,
  onFileChange,
  options,
  dropdown,
  textarea,
  ...rest
}) => {
  // console.log(rest);
  return (
    <div className="flex items-center space-x-4">
      <label className="block text-gray-800 w-32 dark:text-white text-base font-bold mb-2">
        {label}
      </label>
      {richTextEditor ? (
        <RichTextEditor
          setData={setData}
          initialContent={rest.value}
          className="px-1 py-2 border  placeholder-red-600 rounded-lg w-full dark:bg-[#242424] dark:border-none outline-none dark:text-white"
        />
      ) : dropdown ? (
        <select
          name={name}
          {...rest}
          className="px-1 py-2 border  placeholder-red-600 rounded-lg w-full dark:bg-[#242424] dark:border-none outline-none dark:text-white"
        >
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : textarea ? (
        <textarea
          name={name}
          {...rest}
          className="px-1 py-2 border  placeholder-red-600 rounded-lg w-full dark:bg-[#242424] dark:border-none outline-none dark:text-white"
        />
      ) : (
        <input
          type={type || "text"}
          name={name}
          accept={accept}
          onChange={type === "file" ? onFileChange : undefined}
          {...rest}
          className="px-1 py-2 border  placeholder-red-600 rounded-lg w-full dark:bg-[#242424] dark:border-none outline-none dark:text-white"
        />
      )}
    </div>
  );
};

InputComponent.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  richTextEditor: PropTypes.bool,
  setData: PropTypes.func,
  onFileChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  dropdown: PropTypes.bool,
  textarea: PropTypes.bool,
};
