'use client';
import Container from '../Container';
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import {
  GiBarn,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiFishing,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from 'react-icons/gi';
import { IconType } from 'react-icons/lib';
import { FaSkiing } from 'react-icons/fa';
import { IoDiamond } from 'react-icons/io5';
import { BsSnow } from 'react-icons/bs';
import { MdOutlineVilla } from 'react-icons/md';
import { CategoryBox } from '../CategoryBox';
import { usePathname, useSearchParams } from 'next/navigation';

export interface ICategories {
  label: string;
  icon: IconType;
  description: string;
}

export const categories: ICategories[] = [
  {
    label: 'Beach',
    icon: TbBeach,
    description: 'This property is close to the beach!',
  },
  {
    label: 'Windmills',
    icon: GiWindmill,
    description: 'This property has windmills nearby!',
  },
  {
    label: 'Modern',
    icon: MdOutlineVilla,
    description: 'This property has villa all over the place!',
  },
  {
    label: 'Countryside',
    icon: TbMountain,
    description: 'This property is in the countryside!',
  },
  {
    label: 'Pools',
    icon: TbPool,
    description: 'This property has a pool!',
  },
  {
    label: 'Islands',
    icon: GiIsland,
    description: 'This property is on an island!',
  },
  {
    label: 'Lake',
    icon: GiFishing,
    description: 'This property is close to the lake!',
  },
  {
    label: 'Skiing',
    icon: FaSkiing,
    description: 'This property has skiing actitvities!',
  },
  {
    label: 'Castles',
    icon: GiCastle,
    description: 'This property is a castle!',
  },
  {
    label: 'Camping',
    icon: GiForestCamp,
    description: 'This property has camping activities!',
  },
  {
    label: 'Arctic',
    icon: BsSnow,
    description: 'This property has camping activities!',
  },
  {
    label: 'Cave',
    icon: GiCaveEntrance,
    description: 'This property has camping activities!',
  },
  {
    label: 'Desert',
    icon: GiCactus,
    description: 'This property is in the desert!',
  },
  {
    label: 'Barns',
    icon: GiBarn,
    description: 'This property is in the barn!',
  },
  {
    label: 'Lux',
    icon: IoDiamond,
    description: 'This property is luxurious!',
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');

  const pathname = usePathname();

  const isMainPage = pathname === '/';

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div className="flex flex-row items-center justify-between pt-4 overflow-x-auto">
        {categories.map((item, index) => {
          return (
            <CategoryBox
              key={index}
              label={item.label}
              icon={item.icon}
              selected={category === item.label}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default Categories;
