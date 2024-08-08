function FormInput({ id, register, error, type, children }) {
  return (
    <div className="relative flex flex-col gap-2">
      <label htmlFor={id}>{children}</label>
      <input
        className="rounded-3xl bg-gray-300 p-1 px-4"
        id={id}
        type={type}
        {...register}
      />
      {error && (
        <span className="absolute -bottom-6 text-sm text-red-500">{error}</span>
      )}
    </div>
  );
}

export default FormInput;
