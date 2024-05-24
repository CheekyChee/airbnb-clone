'use client';
import useCountries from '@/app/hooks/useCountry';
import { TCountrySelectValue } from '@/app/hooks/useCountry';
import { FC, Fragment } from 'react';
import Select from 'react-select';

export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};

export interface ICountrySelectProps {
  value?: TCountrySelectValue;
  onChange: (value: TCountrySelectValue) => void;
}

export const CountrySelect: FC<ICountrySelectProps> = ({ onChange, value }) => {
  const { getAll } = useCountries();

  return (
    <div>
      <Select
        placeholder="Anywhere"
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => {
          onChange(value as TCountrySelectValue);
        }}
        formatOptionLabel={(option: any) => {
          return (
            <div className="flex flex-row items-center gap-3">
              <div> {option.flag}</div>
              <div>
                {' '}
                {option.label},
                <span className="ml-1 text-neutral-500">{option.region}</span>
              </div>
            </div>
          );
        }}
        classNames={{
          control(props) {
            return 'p-3 border-2';
          },
          input(props) {
            return 'text-lg';
          },
          option(props) {
            return 'text-lg';
          },
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: 'black',
            primary25: '#ffe4e6',
          },
        })}
      />
    </div>
  );
};
