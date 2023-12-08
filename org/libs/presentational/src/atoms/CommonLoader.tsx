function CommonLoader() {
  const circle = 'w-2 h-2 rounded-full bg-blue-700 animate-bounce';
  return (
    <div className="w-full h-full grid place-items-center">
      <div className="flex flex-row gap-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className={`${circle}`}></div>
        <div className={`${circle} [animation-delay:-.3s]`}></div>
        <div className={`${circle} [animation-delay:-.5s]`}></div>
      </div>
      <div className="flex flex-row gap-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className={`${circle}`}></div>
        <div className={`${circle} [animation-delay:-.3s]`}></div>
        <div className={`${circle} [animation-delay:-.5s]`}></div>
      </div>
    </div>
  );
}

export default CommonLoader;
