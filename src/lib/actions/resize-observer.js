let observer;
let listeningWindowEvent = false;
let callbacks = [];
export default (node, callback) => {
  if (!!window.ResizeObserver && false) {
    if (!observer) {
      observer = new ResizeObserver(callback);
    }
    observer.observe(node);
    return {
      destroy() {
        observer.unobserve(node);
      }
    };
  }
  else {
    // TODO: fallback to mutation observer implementation
    callbacks.push(callback);
    if (!listeningWindowEvent) {
      listeningWindowEvent = true;
      window.addEventListener('resize', () => {
        callbacks.forEach(c => c());
      });
    }
  }
}