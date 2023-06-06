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
          w-full
          text-white
          ${outline ? "bg-transparent hover:bg-white" : "bg-teal-400"}
          ${outline ? "border-white hover:text-teal-400" : "border-teal-400"}
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
