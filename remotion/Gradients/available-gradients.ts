export const availableGradients = {
  orange: "radial-gradient(#DD8B5A, #000000 70%)",
  blue: "radial-gradient(#32588D, #000000 70%)",
  yellow: "radial-gradient(#E7D541, #000000 70%)",
};

export type GradientType = keyof typeof availableGradients;
