import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import regionDataRaw from '@utils/helpers/regionSelect/regionData.json';

const DistrictSelect = ({ onChange }: { onChange: any }) => {
  const { register, setValue, watch, getValues } = useForm<{
    city: string;
    district: string;
    ward: string;
  }>({
    defaultValues: {
      city: '',
      district: '',
      ward: '',
    },
  });
  const [data, setData] = useState<
    | {
        Id: string;
        Name: string;
        Districts: {
          Id: string;
          Name: string;
          Wards: {
            Id: string;
            Name: string;
            Level: string;
          }[];
        }[];
      }[]
    | null
  >(null);
  const [availableCity, setAvailableCity] = useState<
    { Id: string; Name: string }[]
  >([]);
  const [availableDistrict, setAvailableDistrict] = useState<
    { Id: string; Name: string }[]
  >([]);
  const [availableWard, setAvailableWard] = useState<
    { Id: string; Name: string }[]
  >([]);

  useEffect(() => {
    if (Array.isArray(data)) {
      setAvailableCity(data.map((d) => ({ Id: d.Id, Name: d.Name })));
    }
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get(
        //   'https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json'
        // );
        // setData(response.data);
        setData(regionDataRaw);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <select
        className="h-full outline col-span-1 text-[0.65rem] font-medium outline-none rounded bg-transparent px-2 border border-solid border-zinc-400 mb-3"
        id="city"
        aria-label=".form-select-sm"
        {...register('city')}
        onChange={(e) => {
          const val = e.currentTarget.value;
          if (data && val !== '') {
            const districts = data.find((d) => d.Name === val)?.Districts;
            setAvailableDistrict(districts ?? []);
            setAvailableWard([]);
            setValue('district', '');
            setValue('ward', '');
          }
          onChange({
            city: val,
            district: '',
            ward: '',
          });
        }}
      >
        <option value="">Chọn tỉnh thành</option>
        {availableCity.map((c) => (
          <option value={c.Name} key={c.Id}>
            {c.Name}
          </option>
        ))}
      </select>

      <select
        className="h-full outline col-span-1 text-[0.65rem] font-medium outline-none rounded bg-transparent px-2 border border-solid border-zinc-400 mb-3"
        id="district"
        aria-label=".form-select-sm"
        {...register('district')}
        onChange={(e) => {
          const val = e.currentTarget.value;
          if (data && val !== '') {
            const districts = data.find(
              (d) => d.Name === getValues().city
            )?.Districts;
            const wards = districts
              ? districts.find((d) => d.Name === val)?.Wards
              : [];
            setAvailableWard(wards ?? []);
            setValue('ward', '');
          }
          onChange({
            ...getValues(),
            district: val,
            ward: '',
          });
        }}
      >
        <option value="">Chọn quận huyện</option>
        {availableDistrict.map((c) => (
          <option value={c.Name} key={c.Id}>
            {c.Name}
          </option>
        ))}
      </select>

      <select
        className="h-full outline col-span-1 text-[0.65rem] font-medium outline-none rounded bg-transparent px-2 border border-solid border-zinc-400"
        id="ward"
        aria-label=".form-select-sm"
        {...register('ward')}
        onChange={(e) => {
          onChange({
            ...getValues(),
            ward: e.currentTarget.value,
          });
        }}
      >
        <option value="">Chọn phường xã</option>
        {availableWard.map((c) => (
          <option value={c.Name} key={c.Id}>
            {c.Name}
          </option>
        ))}
      </select>
    </>
  );
};

export default DistrictSelect;
