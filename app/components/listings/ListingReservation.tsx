'use client';

import { FC } from 'react';
import { Range } from 'react-date-range';
import Calendar from '../inputs/Calendar';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import { Button } from '../Button';
export interface ListingReservationProps {
  price: number;
  dateRange: Range;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled: boolean;
  disableDates: Date[];
}

export const ListingReservation: FC<ListingReservationProps> = ({
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabled,
  disableDates,
}) => {
  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold">$ {price}</div>
        <div className="font-light text-neutral-600">night</div>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disableDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <hr />

      <div className="p-4">
        <Button onClick={onSubmit} disabled={disabled} label="Reserve" />
      </div>

      <div className="flex flex-row items-center justify-between p-4 text-lg font-semibold">
        <div> Total</div>
        <div>$ {totalPrice}</div>
      </div>
    </div>
  );
};
