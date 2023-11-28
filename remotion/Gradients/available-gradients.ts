export const availableGradients = {
  orange: "radial-gradient(#DD8B5A, rgba(0, 0, 0, 0) 70%)",
  blue: "radial-gradient(#32588D, rgba(0, 0, 0, 0) 70%)",
  yellow: "radial-gradient(#E7D541, rgba(0, 0, 0, 0) 70%)",
  brown: "radial-gradient(#3E3429, rgba(0, 0, 0, 0) 70%)",
  blueRadial:
    "radial-gradient(100% 100% at 47.08% 100%, #0F102E 0%, #000 100%)",
};

export type GradientType = keyof typeof availableGradients;
