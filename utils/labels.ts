import { Label } from "../components/canvas";

export function transformLabels(labels: Label[], scale: number) {
  console.log(labels);
  return labels.map((label) => {
    return {
      ...label,
      bounding_box: {
        x: label.bounding_box.x * scale,
        y: label.bounding_box.y * scale,
        w: label.bounding_box.w * scale,
        h: label.bounding_box.h * scale,
      },
      polygon: {
        path: label.polygon.path
          .map((point) => {
            return {
              ...point,
              x: point.x * scale,
              y: point.y * scale,
            };
          })
          .reduce((prevValue, accumulator) => {
            return [...prevValue, accumulator.x, accumulator.y];
          }, []),
      },
    };
  });
}
