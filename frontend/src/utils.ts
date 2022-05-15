export const optimizeAnimation = (cb: () => void) => {
  let animating = false;

  return () => {
    if (animating) return;

    animating = true;
    requestAnimationFrame(() => {
      cb();
      animating = false;
    });
  };
};
