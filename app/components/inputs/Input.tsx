'use client';
import { FC } from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { BiDollar } from 'react-icons/bi';

export interface IInputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  formatPrice?: boolean;
  errors: FieldErrors;
  register: UseFormRegister<FieldValues>;
}

export const Input: FC<IInputProps> = (props) => {
  const { errors, id, label, register, disabled, formatPrice, required, type } =
    props;

  return (
    <div className="relative w-full">
      {formatPrice && (
        <BiDollar
          size={24}
          className="absolute text-neutral-700 top-5 left-2"
        />
      )}
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        // * has to be an empty space
        placeholder=" "
        type={type}
        className={`
        peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none 
        transition disabled:opacity-70 disabled:cursor-not-allowed
        ${formatPrice ? 'pl-9' : 'pl-4'}
        ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
        ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black-300'}
        `}
      />
      <label
        className={`absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0] 
        ${formatPrice ? 'left-9' : 'left-4'}
         peer-placeholder-shown:scale-100  
         peer-placeholder-shown:translate-y-0
         peer-focus:scale-75
         peer-focus:-translate-y-4
         ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}
        `}
      >
        {label}
      </label>
    </div>
  );
};
