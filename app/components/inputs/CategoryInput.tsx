"use client";
import { FC, Fragment } from "react";
import { IconType } from "react-icons/lib";

export interface ICategoryInputProps {
  onClick: (value: string) => void;
  label: string;
  icon: IconType;
  selected?: boolean;
}

export const CategoryInput: FC<ICategoryInputProps> = (props) => {
  const { icon: Icon, label, onClick, selected } = props;

  return (
    <div
      onClick={() => onClick(label)}
      className={`rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black transition cursor-pointer  ${
        selected ? "border-black" : "border-neutral-200"
      }`}
    >
      <Icon size={30} />
      <div className="font-sem">{label}</div>
    </div>
  );
};
