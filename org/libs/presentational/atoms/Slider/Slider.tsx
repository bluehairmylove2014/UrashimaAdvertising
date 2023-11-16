import { useEffect, useRef, useState } from "react";
import "./styles.scss";

const forceInRange = (
  range: { min: number; max: number },
  value: number
): number => {
  if (value > range.max) return range.max;
  if (value < range.min) return range.min;
  return value;
};
const minLimit = 0;
const maxLimit = 100;

type sliderParamsType = {
  minVal: number;
  maxVal: number;
  onChange: (range: { min: number; max: number }) => void;
};
const Slider = ({ minVal, maxVal, onChange }: sliderParamsType) => {
  const [sliderButtonPosLeft, setSliderButtonPosLeft] = useState(minLimit);
  const [sliderButtonPosRight, setSliderButtonPosRight] = useState(maxLimit);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: any, setValue: Function, pos: number) => {
    e.preventDefault();
    const moveHandler = (e: any) => {
      if (!sliderRef.current) return;
      const rect = sliderRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const value = Math.round((x / rect.width) * 100);

      setValue(
        pos === 1
          ? forceInRange({ min: sliderButtonPosLeft, max: maxLimit }, value)
          : forceInRange({ min: minLimit, max: sliderButtonPosRight }, value)
      );
    };
    document.addEventListener("mousemove", moveHandler);
    document.addEventListener(
      "mouseup",
      () => {
        document.removeEventListener("mousemove", moveHandler);
      },
      { once: true }
    );
  };

  useEffect(() => {
    const calcMinVal =
      minVal !== 0
        ? sliderButtonPosLeft === minLimit
          ? minVal
          : sliderButtonPosRight * 0.01 * minVal
        : sliderButtonPosLeft * 0.01 * maxVal;
    onChange({
      min: Number(calcMinVal.toFixed(0)),
      max: Number((sliderButtonPosRight * 0.01 * maxVal).toFixed(0)),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sliderButtonPosLeft, sliderButtonPosRight]);

  return (
    <div className="slider-container" ref={sliderRef}>
      <div className="slider__bar--disabled"></div>
      <div
        className="slider__bar"
        style={{
          left: `${sliderButtonPosLeft}%`,
          width: `${sliderButtonPosRight - sliderButtonPosLeft}%`,
        }}
      ></div>
      <span
        className="slider__button--left"
        style={{ left: `${sliderButtonPosLeft}%` }}
        onMouseDown={(e) => handleMouseDown(e, setSliderButtonPosLeft, 0)}
      ></span>
      <span
        className="slider__button--right"
        style={{ left: `${sliderButtonPosRight}%` }}
        onMouseDown={(e) => handleMouseDown(e, setSliderButtonPosRight, 1)}
      ></span>
    </div>
  );
};

export default Slider;
