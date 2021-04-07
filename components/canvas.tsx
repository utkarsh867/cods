import React, { useEffect, useRef, useState } from "react";
import { Layer, Stage, Image as KonvaImage, Line, Text } from "react-konva";
import { transformLabels } from "../utils/labels";
import NextImage from "next/image";

interface BoundingBox {
  h: number;
  w: number;
  x: number;
  y: number;
}

interface Path {
  x: number;
  y: number;
}

interface Polygon {
  path: Path[];
}

export interface Label {
  bounding_box: BoundingBox;
  confidence: number;
  label: string;
  name: string;
  polygon: Polygon;
}

export interface CanvasLabel {
  bounding_box: BoundingBox;
  confidence: number;
  label: string;
  name: string;
  polygon: {
    path: number[];
  };
}

export default function Canvas({
  image,
  labels,
}: {
  image: string;
  labels: Label[];
}) {
  const [imageCanvas, setImageCanvas] = useState<CanvasImageSource>();
  const [imageLabels, setImageLabels] = useState<CanvasLabel[]>([]);
  const WIDTH = 800;

  useEffect(() => {
    const imageObj = new Image();
    imageObj.src = image;
    setImageCanvas(imageObj);
  }, [image]);

  useEffect(() => {
    if (imageCanvas) {
      const newLabels = transformLabels(
        labels,
        WIDTH / (imageCanvas.width as number)
      );
      setImageLabels(newLabels);
    }
  }, [labels]);

  if (image) {
    return (
      <>
        <NextImage
          src={image}
          width={800}
          height={
            WIDTH /
            ((imageCanvas.width as number) / (imageCanvas.height as number))
          }
        />
        <Stage
          width={WIDTH}
          height={
            WIDTH /
            ((imageCanvas.width as number) / (imageCanvas.height as number))
          }
        >
          <Layer>
            <KonvaImage
              image={imageCanvas}
              x={0}
              width={WIDTH}
              height={
                WIDTH /
                ((imageCanvas.width as number) / (imageCanvas.height as number))
              }
            />
            {imageLabels.map((label) => {
              const color = [
                Math.floor(Math.random() * 255),
                Math.floor(Math.random() * 255),
                Math.floor(Math.random() * 255),
              ];
              return (
                <>
                  <Line
                    x={0}
                    y={0}
                    points={label.polygon.path}
                    tension={0.5}
                    closed
                    stroke={`rgba(${color[0]}, ${color[1]}, ${color[2]})`}
                    fill={`rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.4)`}
                  />
                  <Text
                    text={label.label}
                    x={label.bounding_box.x}
                    y={label.bounding_box.y}
                  />
                </>
              );
            })}
          </Layer>
        </Stage>
      </>
    );
  } else {
    return <></>;
  }
}
