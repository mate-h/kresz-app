import { generateId } from "../util";
export default (node, props) => {
  function defaults(p) {
    return {
      radius: 32,
      border: "none",
      active: true,
      ...p,
    };
  }
  function getPath(cornerRadius) {
    const w = node.clientWidth;
    const h = node.clientHeight;
    if (w === 0 || h === 0) return "";

    const d = [
      0.5,
      0.7190972222,
      0.8408963542,
      0.9204482639,
      0.9204482639,
      0.8408963542,
      0.7190972222,
      0.5,
      0.5,
      0.2809027778,
      0.1591036458,
      0.9204482639,
      0.07955173611,
      0.8408963542,
      0.7190972222,
      0.5,
      0.5,
      0.2809027778,
      0.1591036458,
      0.07955173611,
      0.07955173611,
      0.1591036458,
      0.2809027778,
      0.5,
      0.5,
      0.7190972222,
      0.8408963542,
      0.07955173611,
      0.9204482639,
      0.1591036458,
      0.2809027778,
      0.5,
    ];
    const xs = 1 - (w - cornerRadius) / w;
    const ys = 1 - (h - cornerRadius) / h;
    const gx = (val) => 1 - (1 - val) * xs; // approach 1
    const ix = (val) => val * xs; // approach 0
    const gy = (val) => 1 - (1 - val) * ys; // approach 1
    const iy = (val) => val * ys; // approach 0

    let path = "";

    const A = 0.5;
    const B = 0.7190972222;
    const C = 0.8408963542;
    const D = 0.9204482639;

    path += `M${gx(A)},1`;
    path += `C${gx(B)},1,${gx(C)},1,${gx(D)},${gy(D)}`; // lower right
    path += `C1,${gy(C)},1,${gy(B)},1,${gy(A)}`; // lower right
    path += `L1,${iy(A)}`;
    path += `C1,${iy(1 - B)},1,${iy(1 - C)},${gx(D)},${iy(1 - D)}`; // upper right
    path += `C${gx(C)},0,${gx(B)},0,${gx(A)},0`; // upper right
    path += `L${ix(A)},0`;
    path += `C${ix(1 - B)},0,${ix(1 - C)},0,${ix(1 - D)},${iy(1 - D)}`; // upper left
    path += `C0,${iy(1 - C)},0,${iy(1 - B)},0,${iy(A)}`; // upper left
    path += `L0,${gy(A)}`;
    path += `C0,${gy(B)},0,${gy(C)},${ix(1 - D)},${gy(D)}`; // lower left
    path += `C${ix(1 - C)},1,${ix(1 - B)},1,${ix(A)},1Z`; // lower left

    return path;
  }

  const xmlns = "http://www.w3.org/2000/svg";
  let svgElem = document.getElementById("rounded-masks");
  if (!svgElem) {
    svgElem = document.createElementNS(xmlns, "svg");
    svgElem.setAttributeNS(null, "height", "0");
    svgElem.setAttributeNS(null, "id", "rounded-masks");
    document.body.appendChild(svgElem);
  }

  const clipPath = document.createElementNS(xmlns, "clipPath");
  const id = `mask-${generateId()}`;
  clipPath.setAttributeNS(null, "clipPathUnits", "objectBoundingBox");
  clipPath.setAttributeNS(null, "id", id);
  svgElem.appendChild(clipPath);
  const path = document.createElementNS(xmlns, "path");
  path.setAttributeNS(null, "d", getPath(defaults(props).radius));
  clipPath.appendChild(path);

  node.style.clipPath = defaults(props).active ? `url(#${id})` : "none";
  node.style.webkitClipPath = defaults(props).active ? `url(#${id})` : "none";

  let observer;
  if (!!window.ResizeObserver) {
    if (!observer) {
      observer = new ResizeObserver(function () {
        path.setAttributeNS(null, "d", getPath(defaults(this.props).radius));
      });
      observer.props = props;
    }
    observer.observe(node);
  }

  return {
    update(new_props) {
      node.style.clipPath = defaults(new_props).active ? `url(#${id})` : "none";
      node.style.webkitClipPath = defaults(new_props).active
        ? `url(#${id})`
        : "none";
      path.setAttributeNS(null, "d", getPath(defaults(new_props).radius));
      observer.props = new_props;
    },
    destroy() {
      if (observer) observer.unobserve(node);
    },
  };
};
