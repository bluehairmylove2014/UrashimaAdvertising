import "./styles.scss";
const FullScreenLoader = () => {
  return (
    <div className="fullscreen-loader" id="fullscreen-loader">
      <div className="dot-spinner__wrapper">
        <div className="dot-spinner">
          <div className="dot-spinner__dot"></div>
          <div className="dot-spinner__dot"></div>
          <div className="dot-spinner__dot"></div>
          <div className="dot-spinner__dot"></div>
          <div className="dot-spinner__dot"></div>
          <div className="dot-spinner__dot"></div>
          <div className="dot-spinner__dot"></div>
          <div className="dot-spinner__dot"></div>
        </div>
      </div>
    </div>
  );
};

export const useFullscreenLoaderController = () => {
  const getLoader = () => document.getElementById("fullscreen-loader");
  const showLoader = () => {
    const loader = getLoader();
    if (loader && !loader.classList.contains("active")) {
      loader.classList.add("active");
    }
  };
  const hideLoader = () => {
    const loader = getLoader();
    if (loader) {
      loader.classList.remove("active");
    }
  };
  return {
    showLoader,
    hideLoader,
  };
};

export default FullScreenLoader;
