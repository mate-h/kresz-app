export default (node, props) => {
  const baseline = 4;
  const type = "marginTop"; //'marginTop';

  let current = 0;
  function update() {
    // node.style[type] = "0px";
    // node.style.height = "auto";
    const height = node.getBoundingClientRect().height;
    const bottom = node.offsetTop + height - current;
    if (bottom % baseline !== 0) {
      const offs = baseline - (bottom % baseline);
      node.style[type] = `${baseline - (bottom % baseline)}px`;
      // node.style.height = `${node.offsetHeight + offs}px`;
      current = offs;
    }
  }
  update();

  let observer;
  if (!!window.ResizeObserver) {
    if (!observer) {
      observer = new ResizeObserver(function () {
        update();
      });
    }
    observer.observe(node);
  }

  return {
    destroy() {
      if (observer) observer.unobserve(node);
    },
  };
};
