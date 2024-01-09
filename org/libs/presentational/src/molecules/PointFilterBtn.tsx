import { sourceLayersList } from '@constants/mapLayers';
import PointFilterInput, {
  pointFilterInputProps,
} from '@presentational/atoms/PointFilterInput';
import { useEffect, useState } from 'react';
import { LayerProps } from 'react-map-gl';

const optionsList: Omit<pointFilterInputProps, 'onChange'>[] = [
  {
    layerIds: ['unclustered-point-planned'],
    dotColor: 'blue',
    label: 'Đã quy hoạch',
    defaultChecked: true,
  },
  {
    layerIds: ['unclustered-point-unplanned'],
    dotColor: 'orange',
    label: 'Chưa quy hoạch',
    defaultChecked: true,
  },
  {
    layerIds: [
      'unclustered-point-reported',
      'unclustered-point-reported-symbol',
    ],
    dotColor: 'red',
    dotInnerSymbol: '!',
    label: 'Điểm quảng cáo bị báo cáo',
    defaultChecked: true,
  },
  {
    layerIds: [
      'unclustered-ads-board-reported',
      'unclustered-ads-board-reported-symbol',
    ],
    dotColor: 'orange',
    dotInnerSymbol: '!',
    label: 'Bảng quảng cáo bị báo cáo',
    defaultChecked: true,
  },
  {
    layerIds: [
      'unclustered-unknown-point-reported',
      'unclustered-unknown-point-reported-symbol',
    ],
    dotColor: 'blue',
    dotInnerSymbol: '!',
    label: 'Điểm bất kỳ bị báo cáo',
    defaultChecked: true,
  },
];

function PointFilterBtn({
  onFilter,
}: {
  onFilter: (layers: LayerProps[]) => void;
}) {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [selectedLayers, setSelectedLayers] =
    useState<LayerProps[]>(sourceLayersList);

  const handleAddLayer = (layerIds: string[]) => {
    const additionLayers = layerIds
      .map((id) =>
        sourceLayersList.find((layer) => layer.id && layer.id === id)
      )
      .filter((layer): layer is LayerProps => typeof layer !== 'undefined');

    const layer = [...selectedLayers, ...additionLayers];
    setSelectedLayers(layer);
    onFilter(layer);
  };

  const handleRemoveLayer = (layerIds: string[]) => {
    const layer = selectedLayers.filter(
      (lid) => lid.id && !layerIds.includes(lid.id)
    );
    setSelectedLayers(layer);
    onFilter(layer);
  };

  const handleChange = (layerIds: string[], value: boolean) => {
    value ? handleAddLayer(layerIds) : handleRemoveLayer(layerIds);
  };

  return (
    <div
      onClick={() => {
        !isActive && setIsActive(true);
      }}
      className={`bg-white rounded px-5 h-[36px] ${
        isActive ? 'h-fit py-4' : 'hover:bg-cyan-50'
      } text-xs font-medium text-black shadow-md transition-colors cursor-pointer`}
    >
      <div className="flex flex-row justify-between items-center h-full">
        <div>
          <i className="fi fi-ss-filter"></i>
          <span className="ml-2">Bộ lọc điểm</span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsActive(false);
          }}
          className={`font-semibold ${isActive ? 'block' : 'hidden'}`}
        >
          x
        </button>
      </div>

      <div
        className={`${
          isActive
            ? 'opacity-100 pointer-events-auto visible w-fit h-fit pt-3'
            : 'opacity-0 pointer-events-none invisible w-0 h-0 p-0'
        } rounded transition-all flex flex-col gap-2 overflow-hidden`}
      >
        {optionsList.map((option, index) => (
          <PointFilterInput
            key={`filterInputLayer@${index}`}
            {...option}
            onChange={handleChange}
          />
        ))}
      </div>
    </div>
  );
}

export default PointFilterBtn;
