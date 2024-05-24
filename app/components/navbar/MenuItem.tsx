'use client';
import { FC, Fragment } from 'react';

export interface MenuItemProps {
  onClick: () => void;
  label: string;
}

export const MenuItem: FC<MenuItemProps> = (props) => {
  return (
    <div
      className="px-4 py-3 font-semibold transition hover:bg-neutral-100"
      onClick={props.onClick}
    >
      {props.label}
    </div>
  );
};
