import countries from 'world-countries';

export type TCountrySelectValue = {
  value: string;
  label: string;
  flag: string;
  latlng: number[];
  region: string;
};

const formattedCountries: TCountrySelectValue[] = countries.map((country) => {
  return {
    value: country.cca2,
    label: country.name.common,
    flag: country.flag,
    latlng: country.latlng,
    region: country.region,
  };
});

const useCountries = () => {
  const getAll = () => formattedCountries;

  const getByValue = (value: string) => {
    return formattedCountries.find((country) => country.value === value);
  };

  return {
    getAll,
    getByValue,
  };
};

export default useCountries;
