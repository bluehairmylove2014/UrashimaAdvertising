function handleClickOutside(
  focusArea: HTMLElement,
  className: string,
  event: MouseEvent
): void {
  const target = event.target as HTMLElement;
  if (!focusArea.contains(target)) {
    focusArea.classList.remove(className);
    document.removeEventListener(
      "click",
      (focusArea as any)._handleClickOutside
    );
  }
}

function toggleClass(element: HTMLElement, className: string = "active"): void {
  if (!element) {
    return;
  }
  const boundHandleClickOutside = (e: MouseEvent) =>
    handleClickOutside(element, className, e);

  if (element.classList.contains(className)) {
    element.classList.remove(className);
    document.removeEventListener("click", (element as any)._handleClickOutside);
  } else {
    element.classList.add(className);
    (element as any)._handleClickOutside = boundHandleClickOutside;
    setTimeout(() => {
      document.addEventListener("click", (element as any)._handleClickOutside);
    }, 100);
  }
}

function toggleClassNoListener(
  element: HTMLElement,
  className: string = "active"
): void {
  if (!element) {
    return;
  }
  if (element.classList.contains(className)) {
    element.classList.remove(className);
  } else {
    element.classList.add(className);
  }
}

export { toggleClass, toggleClassNoListener };
