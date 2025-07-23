type Props = {
  type: "email" | "password" | "text";
  value: string;
  handleChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  placeholder: string;
};
export const Input = ({ type, handleChange, value, placeholder }: Props) => {
  return (
    <div className="bg-slate-100 px-3 py-4 text-black">
      <input
        type={type}
        className="w-full bg-transparent outline-none"
        onChange={handleChange}
        value={value}
        placeholder={placeholder}
      />
      {type === "password" && <div></div>}
    </div>
  );
};
