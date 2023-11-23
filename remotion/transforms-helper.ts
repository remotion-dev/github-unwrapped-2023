type Transform =
  | {
      type: "scale";
      scale: number;
    }
  | {
      type: "scale-x";
      scale: number;
    }
  | {
      type: "scale-y";
      scale: number;
    }
  | {
      type: "rotate-x";
      rotation: `${number}deg` | `${number}turn` | `${number}rad`;
    }
  | {
      type: "rotate-y";
      rotation: `${number}deg` | `${number}turn` | `${number}rad`;
    }
  | {
      type: "rotate-z";
      rotation: `${number}deg` | `${number}turn` | `${number}rad`;
    }
  | {
      type: "translate-x";
      x: number;
    }
  | {
      type: "translate-y";
      y: number;
    }
  | {
      type: "translate-z";
      z: number;
    }
  | {
      type: "skew";
      skew: string;
    };

export const scale = (factor: number): Transform => ({
  type: "scale",
  scale: factor,
});

export const scaleX = (factor: number): Transform => ({
  type: "scale-x",
  scale: factor,
});

export const scaleY = (factor: number): Transform => ({
  type: "scale-y",
  scale: factor,
});

export const rotateX = (rotation: number): Transform => ({
  type: "rotate-x",
  rotation: `${rotation}deg`,
});

export const rotateY = (rotation: number): Transform => ({
  type: "rotate-y",
  rotation: `${rotation}deg`,
});

export const rotateZ = (rotation: number): Transform => ({
  type: "rotate-z",
  rotation: `${rotation}deg`,
});

export const translateX = (x: number): Transform => ({
  type: "translate-x",
  x,
});

export const translateY = (y: number): Transform => ({
  type: "translate-y",
  y,
});

export const translateZ = (z: number): Transform => ({
  type: "translate-z",
  z,
});

export const skew = (factor: string): Transform => ({
  type: "skew",
  skew: factor,
});

export const transformToCss = (transform: Transform): string => {
  switch (transform.type) {
    case "scale":
      return `scale(${transform.scale})`;
    case "scale-x":
      return `scaleX(${transform.scale})`;
    case "scale-y":
      return `scaleY(${transform.scale})`;
    case "rotate-x":
      return `rotateX(${transform.rotation})`;
    case "rotate-y":
      return `rotateY(${transform.rotation})`;
    case "rotate-z":
      return `rotateZ(${transform.rotation})`;
    case "translate-x":
      return `translateX(${transform.x}px)`;
    case "translate-y":
      return `translateY(${transform.y}px)`;
    case "translate-z":
      return `translateZ(${transform.z}px)`;
    case "skew":
      return `skew(${transform.skew})`;
    default:
      throw new Error(`Unknown transform type: ${transform}`);
  }
};

export const transformsToCssString = (
  transforms: (Transform | undefined | null)[]
): string => {
  return (transforms.filter(Boolean) as Transform[])
    .map((t) => transformToCss(t))
    .join(" ");
};
