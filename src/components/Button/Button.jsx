const Button = ({ label, onClick, disabled, outline, small, icon: Icon }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
          disabled:opacity-70
          disabled:cursor-not-allowed
          rounded-full
          transition
          px-6
          text-white
          ${outline ? "bg-transparent hover:bg-white" : "bg-blue-500"}
          ${outline ? "border-white hover:text-blue-500" : "border-blue-500"}
          ${small ? "text-md" : "text-base"}
          ${small ? "py-1" : "py-2"}
          ${small ? "border-[2px]" : "border-2"}
        `}
    >
      {Icon && (
        <Icon
          size={24}
          className="
              absolute
              left-4
              top-3
            "
        />
      )}
      {label}
    </button>
  );
};

export default Button;
