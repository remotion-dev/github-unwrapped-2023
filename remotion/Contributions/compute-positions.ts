export const INITIAL_SIZE = 15;

export const SPACING = 3;

export const MAX_STAR_SIZE = 6;
export const MIN_STAR_SIZE = 1;

export const MAX_STAR_GLOW = 23;

export const MIN_OPACITY = 1;

/**
 * new Array(365).fill(true).map((_, i) => {
      return random(i) * 30 + 15;
    })
 */
export const appearDelays = [
  {
    delay: 22,
    noiseX: 0.43,
    noiseY: -0.43,
  },
  {
    delay: 17,
    noiseX: 0.49,
    noiseY: 0.24,
  },
  {
    delay: 23,
    noiseX: 0.03,
    noiseY: -0.03,
  },
  {
    delay: 28,
    noiseX: 0,
    noiseY: 0.3,
  },
  {
    delay: 30,
    noiseX: -0.44,
    noiseY: 0,
  },
  {
    delay: 28,
    noiseX: 0.43,
    noiseY: -0.36,
  },
  {
    delay: 44,
    noiseX: 0.5,
    noiseY: -0.08,
  },
  {
    delay: 21,
    noiseX: 0.24,
    noiseY: 0.24,
  },
  {
    delay: 37,
    noiseX: 0.03,
    noiseY: 0.07,
  },
  {
    delay: 24,
    noiseX: 0,
    noiseY: 0.3,
  },
  {
    delay: 19,
    noiseX: -0.43,
    noiseY: -0.43,
  },
  {
    delay: 20,
    noiseX: 0.49,
    noiseY: -0.07,
  },
  {
    delay: 25,
    noiseX: 0.5,
    noiseY: 0.5,
  },
  {
    delay: 19,
    noiseX: 0.25,
    noiseY: -0.12,
  },
  {
    delay: 41,
    noiseX: -0.03,
    noiseY: 0.03,
  },
  {
    delay: 16,
    noiseX: 0,
    noiseY: -0.3,
  },
  {
    delay: 34,
    noiseX: -0.89,
    noiseY: -0.44,
  },
  {
    delay: 31,
    noiseX: -0.36,
    noiseY: -0.36,
  },
  {
    delay: 37,
    noiseX: -0.08,
    noiseY: 0.08,
  },
  {
    delay: 29,
    noiseX: 0.75,
    noiseY: 0.25,
  },
  {
    delay: 36,
    noiseX: 0.46,
    noiseY: 0,
  },
  {
    delay: 22,
    noiseX: -0.3,
    noiseY: 0.3,
  },
  {
    delay: 18,
    noiseX: 0.45,
    noiseY: -0.44,
  },
  {
    delay: 28,
    noiseX: -0.99,
    noiseY: -0.36,
  },
  {
    delay: 40,
    noiseX: -0.08,
    noiseY: 0.21,
  },
  {
    delay: 18,
    noiseX: 0.25,
    noiseY: 0.5,
  },
  {
    delay: 38,
    noiseX: -0.91,
    noiseY: 0.86,
  },
  {
    delay: 31,
    noiseX: -0.38,
    noiseY: 0.38,
  },
  {
    delay: 25,
    noiseX: -0.44,
    noiseY: -0.45,
  },
  {
    delay: 28,
    noiseX: 0.29,
    noiseY: -0.36,
  },
  {
    delay: 38,
    noiseX: -0.29,
    noiseY: 0.08,
  },
  {
    delay: 16,
    noiseX: 0.13,
    noiseY: 0.38,
  },
  {
    delay: 40,
    noiseX: 0.48,
    noiseY: 0.89,
  },
  {
    delay: 32,
    noiseX: 0,
    noiseY: 0.76,
  },
  {
    delay: 39,
    noiseX: -0.31,
    noiseY: 0.16,
  },
  {
    delay: 37,
    noiseX: -0.43,
    noiseY: -0.36,
  },
  {
    delay: 38,
    noiseX: -0.08,
    noiseY: -0.29,
  },
  {
    delay: 44,
    noiseX: 0.25,
    noiseY: 0.63,
  },
  {
    delay: 24,
    noiseX: -0.48,
    noiseY: 0.43,
  },
  {
    delay: 43,
    noiseX: -0.38,
    noiseY: 0.38,
  },
  {
    delay: 27,
    noiseX: -0.16,
    noiseY: -0.16,
  },
  {
    delay: 38,
    noiseX: -0.13,
    noiseY: -0.13,
  },
  {
    delay: 33,
    noiseX: 0.29,
    noiseY: -0.5,
  },
  {
    delay: 31,
    noiseX: 0.25,
    noiseY: -0.13,
  },
  {
    delay: 17,
    noiseX: 0.43,
    noiseY: 0.93,
  },
  {
    delay: 26,
    noiseX: 0.38,
    noiseY: 0,
  },
  {
    delay: 26,
    noiseX: -0.16,
    noiseY: 0,
  },
  {
    delay: 28,
    noiseX: 0,
    noiseY: 0.13,
  },
  {
    delay: 28,
    noiseX: -0.73,
    noiseY: 0.36,
  },
  {
    delay: 26,
    noiseX: 0.5,
    noiseY: -0.12,
  },
  {
    delay: 15,
    noiseX: -0.02,
    noiseY: -0.48,
  },
  {
    delay: 35,
    noiseX: 0.38,
    noiseY: -0.38,
  },
  {
    delay: 30,
    noiseX: -0.16,
    noiseY: -0.16,
  },
  {
    delay: 32,
    noiseX: 0.26,
    noiseY: -0.26,
  },
  {
    delay: 18,
    noiseX: -0.36,
    noiseY: -0.36,
  },
  {
    delay: 23,
    noiseX: -0.87,
    noiseY: -0.93,
  },
  {
    delay: 23,
    noiseX: 0.91,
    noiseY: -0.89,
  },
  {
    delay: 31,
    noiseX: -0.76,
    noiseY: 0.38,
  },
  {
    delay: 38,
    noiseX: 0.16,
    noiseY: 0.31,
  },
  {
    delay: 36,
    noiseX: -0.13,
    noiseY: 0.13,
  },
  {
    delay: 41,
    noiseX: -0.36,
    noiseY: -0.36,
  },
  {
    delay: 15,
    noiseX: -0.46,
    noiseY: -0.02,
  },
  {
    delay: 44,
    noiseX: -0.22,
    noiseY: -0.5,
  },
  {
    delay: 27,
    noiseX: 0,
    noiseY: -0.38,
  },
  {
    delay: 19,
    noiseX: -0.16,
    noiseY: -0.16,
  },
  {
    delay: 15,
    noiseX: -0.13,
    noiseY: -0.13,
  },
  {
    delay: 16,
    noiseX: -0.36,
    noiseY: -0.36,
  },
  {
    delay: 19,
    noiseX: -0.47,
    noiseY: 0.44,
  },
  {
    delay: 29,
    noiseX: -0.28,
    noiseY: -0.89,
  },
  {
    delay: 23,
    noiseX: -0.19,
    noiseY: 0.04,
  },
  {
    delay: 23,
    noiseX: -0.31,
    noiseY: 0.16,
  },
  {
    delay: 28,
    noiseX: 0.26,
    noiseY: 0.13,
  },
  {
    delay: 21,
    noiseX: 0.36,
    noiseY: 0.36,
  },
  {
    delay: 31,
    noiseX: -0.44,
    noiseY: -0.89,
  },
  {
    delay: 27,
    noiseX: -0.28,
    noiseY: -0.28,
  },
  {
    delay: 17,
    noiseX: -0.23,
    noiseY: -0.73,
  },
  {
    delay: 38,
    noiseX: -0.75,
    noiseY: 0.5,
  },
  {
    delay: 28,
    noiseX: -0.13,
    noiseY: -0.13,
  },
  {
    delay: 26,
    noiseX: -0.36,
    noiseY: 0.36,
  },
  {
    delay: 19,
    noiseX: -0.47,
    noiseY: -0.44,
  },
  {
    delay: 27,
    noiseX: -0.28,
    noiseY: -0.28,
  },
  {
    delay: 32,
    noiseX: 0.5,
    noiseY: 0.73,
  },
  {
    delay: 20,
    noiseX: 0.5,
    noiseY: -0.42,
  },
  {
    delay: 30,
    noiseX: -0.44,
    noiseY: -0.46,
  },
  {
    delay: 15,
    noiseX: -0.36,
    noiseY: -0.36,
  },
  {
    delay: 23,
    noiseX: -0.93,
    noiseY: -0.89,
  },
  {
    delay: 17,
    noiseX: 0.61,
    noiseY: -0.5,
  },
  {
    delay: 19,
    noiseX: -0.23,
    noiseY: 0,
  },
  {
    delay: 23,
    noiseX: 0.5,
    noiseY: 0.5,
  },
  {
    delay: 38,
    noiseX: -0.44,
    noiseY: 0.44,
  },
  {
    delay: 19,
    noiseX: 0.32,
    noiseY: 0.32,
  },
  {
    delay: 29,
    noiseX: 0.93,
    noiseY: 0.93,
  },
  {
    delay: 21,
    noiseX: -0.28,
    noiseY: 0.28,
  },
  {
    delay: 23,
    noiseX: 0.04,
    noiseY: -0.73,
  },
  {
    delay: 44,
    noiseX: 0.5,
    noiseY: 0.5,
  },
  {
    delay: 43,
    noiseX: 0.01,
    noiseY: -0.46,
  },
  {
    delay: 31,
    noiseX: 0.32,
    noiseY: -0.32,
  },
  {
    delay: 31,
    noiseX: 0.12,
    noiseY: 0.06,
  },
  {
    delay: 29,
    noiseX: 0.5,
    noiseY: 0.78,
  },
  {
    delay: 21,
    noiseX: -0.19,
    noiseY: -0.73,
  },
  {
    delay: 44,
    noiseX: 0.91,
    noiseY: 0.5,
  },
  {
    delay: 22,
    noiseX: -0.46,
    noiseY: 0.01,
  },
  {
    delay: 36,
    noiseX: -0.64,
    noiseY: 0,
  },
  {
    delay: 38,
    noiseX: -0.06,
    noiseY: -0.06,
  },
  {
    delay: 26,
    noiseX: -0.22,
    noiseY: -0.22,
  },
  {
    delay: 23,
    noiseX: 0.31,
    noiseY: 0.46,
  },
  {
    delay: 39,
    noiseX: 0.26,
    noiseY: -0.42,
  },
  {
    delay: 25,
    noiseX: -0.46,
    noiseY: -0.01,
  },
  {
    delay: 30,
    noiseX: 0.32,
    noiseY: 0,
  },
  {
    delay: 15,
    noiseX: 0.06,
    noiseY: -0.12,
  },
  {
    delay: 44,
    noiseX: -0.22,
    noiseY: 0.44,
  },
  {
    delay: 41,
    noiseX: -0.41,
    noiseY: 0.41,
  },
  {
    delay: 31,
    noiseX: 0.08,
    noiseY: -0.42,
  },
  {
    delay: 41,
    noiseX: 0.01,
    noiseY: 0.89,
  },
  {
    delay: 34,
    noiseX: -0.32,
    noiseY: 0.32,
  },
  {
    delay: 39,
    noiseX: -0.06,
    noiseY: -0.06,
  },
  {
    delay: 28,
    noiseX: -0.22,
    noiseY: 0,
  },
  {
    delay: 32,
    noiseX: 0,
    noiseY: -0.83,
  },
  {
    delay: 43,
    noiseX: -0.41,
    noiseY: -0.86,
  },
  {
    delay: 18,
    noiseX: 0.01,
    noiseY: -0.02,
  },
  {
    delay: 42,
    noiseX: 0.32,
    noiseY: 0.32,
  },
  {
    delay: 41,
    noiseX: 0.12,
    noiseY: -0.06,
  },
  {
    delay: 15,
    noiseX: -0.22,
    noiseY: 0.22,
  },
  {
    delay: 23,
    noiseX: -0.41,
    noiseY: 0,
  },
  {
    delay: 25,
    noiseX: -0.41,
    noiseY: -0.45,
  },
  {
    delay: 24,
    noiseX: 0.34,
    noiseY: 0.5,
  },
  {
    delay: 43,
    noiseX: 0.32,
    noiseY: 0.32,
  },
  {
    delay: 21,
    noiseX: 0,
    noiseY: 0,
  },
  {
    delay: 38,
    noiseX: -0.22,
    noiseY: -0.22,
  },
  {
    delay: 44,
    noiseX: -0.41,
    noiseY: 0.41,
  },
  {
    delay: 35,
    noiseX: -0.04,
    noiseY: 0.08,
  },
  {
    delay: 28,
    noiseX: -0.52,
    noiseY: -0.18,
  },
  {
    delay: 31,
    noiseX: 0.5,
    noiseY: 0.15,
  },
  {
    delay: 38,
    noiseX: 0.06,
    noiseY: 0.06,
  },
  {
    delay: 17,
    noiseX: 0.44,
    noiseY: -0.22,
  },
  {
    delay: 37,
    noiseX: 0.83,
    noiseY: 0.41,
  },
  {
    delay: 40,
    noiseX: -0.41,
    noiseY: -0.08,
  },
  {
    delay: 40,
    noiseX: -0.18,
    noiseY: 0.18,
  },
  {
    delay: 31,
    noiseX: 0.15,
    noiseY: 0.5,
  },
  {
    delay: 28,
    noiseX: 0.4,
    noiseY: -0.05,
  },
  {
    delay: 22,
    noiseX: 0.44,
    noiseY: -0.22,
  },
  {
    delay: 15,
    noiseX: -0.41,
    noiseY: -0.41,
  },
  {
    delay: 19,
    noiseX: 0.97,
    noiseY: 0.45,
  },
  {
    delay: 35,
    noiseX: -0.5,
    noiseY: 0.68,
  },
  {
    delay: 23,
    noiseX: 0,
    noiseY: -0.15,
  },
  {
    delay: 31,
    noiseX: -0.93,
    noiseY: -0.49,
  },
  {
    delay: 41,
    noiseX: 0.42,
    noiseY: 0.42,
  },
  {
    delay: 24,
    noiseX: -0.41,
    noiseY: 0.41,
  },
  {
    delay: 41,
    noiseX: 0.86,
    noiseY: 0.97,
  },
  {
    delay: 43,
    noiseX: 0.34,
    noiseY: -0.5,
  },
  {
    delay: 31,
    noiseX: -0.15,
    noiseY: -0.15,
  },
  {
    delay: 25,
    noiseX: 0,
    noiseY: -0.4,
  },
  {
    delay: 44,
    noiseX: 0.42,
    noiseY: 0.43,
  },
  {
    delay: 26,
    noiseX: 0.48,
    noiseY: -0.24,
  },
  {
    delay: 33,
    noiseX: -0.9,
    noiseY: 0.04,
  },
  {
    delay: 17,
    noiseX: -0.02,
    noiseY: 0.18,
  },
  {
    delay: 44,
    noiseX: 0.5,
    noiseY: 0,
  },
  {
    delay: 17,
    noiseX: 0.4,
    noiseY: 0.49,
  },
  {
    delay: 20,
    noiseX: 0.42,
    noiseY: 0.42,
  },
  {
    delay: 17,
    noiseX: -0.24,
    noiseY: 0.24,
  },
  {
    delay: 26,
    noiseX: 0,
    noiseY: -0.04,
  },
  {
    delay: 32,
    noiseX: -0.18,
    noiseY: -0.52,
  },
  {
    delay: 44,
    noiseX: 0.02,
    noiseY: -0.5,
  },
  {
    delay: 32,
    noiseX: 0.49,
    noiseY: 0.4,
  },
  {
    delay: 37,
    noiseX: -0.42,
    noiseY: 0.43,
  },
  {
    delay: 39,
    noiseX: 0.48,
    noiseY: 0.48,
  },
  {
    delay: 20,
    noiseX: 0,
    noiseY: 0.04,
  },
  {
    delay: 33,
    noiseX: 0,
    noiseY: -0.6,
  },
  {
    delay: 15,
    noiseX: 0.83,
    noiseY: -0.5,
  },
  {
    delay: 27,
    noiseX: 0.35,
    noiseY: 0.4,
  },
  {
    delay: 23,
    noiseX: 0.42,
    noiseY: 0,
  },
  {
    delay: 32,
    noiseX: -0.24,
    noiseY: -0.24,
  },
  {
    delay: 24,
    noiseX: 0,
    noiseY: 0.07,
  },
  {
    delay: 32,
    noiseX: -0.3,
    noiseY: -0.3,
  },
  {
    delay: 23,
    noiseX: 0.44,
    noiseY: -0.01,
  },
  {
    delay: 34,
    noiseX: 0.44,
    noiseY: 0.4,
  },
  {
    delay: 40,
    noiseX: -0.42,
    noiseY: 0.42,
  },
  {
    delay: 39,
    noiseX: -0.48,
    noiseY: 0.24,
  },
  {
    delay: 22,
    noiseX: -0.07,
    noiseY: -0.07,
  },
  {
    delay: 26,
    noiseX: -0.6,
    noiseY: -0.6,
  },
  {
    delay: 15,
    noiseX: -0.88,
    noiseY: 0.01,
  },
  {
    delay: 25,
    noiseX: 0.07,
    noiseY: -0.49,
  },
  {
    delay: 29,
    noiseX: -0.84,
    noiseY: 0.42,
  },
  {
    delay: 18,
    noiseX: 0.48,
    noiseY: 0,
  },
  {
    delay: 40,
    noiseX: 0.04,
    noiseY: -0.04,
  },
  {
    delay: 28,
    noiseX: -0.3,
    noiseY: 0,
  },
  {
    delay: 37,
    noiseX: 0.44,
    noiseY: 0.44,
  },
  {
    delay: 44,
    noiseX: -0.43,
    noiseY: -0.43,
  },
  {
    delay: 42,
    noiseX: -0.29,
    noiseY: 0.5,
  },
  {
    delay: 33,
    noiseX: 0,
    noiseY: -0.24,
  },
  {
    delay: 24,
    noiseX: -0.04,
    noiseY: -0.07,
  },
  {
    delay: 21,
    noiseX: -0.3,
    noiseY: -0.6,
  },
  {
    delay: 41,
    noiseX: 0.89,
    noiseY: 0.44,
  },
  {
    delay: 40,
    noiseX: 0,
    noiseY: 0.43,
  },
  {
    delay: 39,
    noiseX: 0.21,
    noiseY: 0.5,
  },
  {
    delay: 42,
    noiseX: -0.63,
    noiseY: 0.75,
  },
  {
    delay: 38,
    noiseX: 0.04,
    noiseY: -0.04,
  },
  {
    delay: 18,
    noiseX: -0.3,
    noiseY: -0.3,
  },
  {
    delay: 36,
    noiseX: -0.01,
    noiseY: -0.44,
  },
  {
    delay: 23,
    noiseX: 0.92,
    noiseY: 0.49,
  },
  {
    delay: 28,
    noiseX: 0.57,
    noiseY: -0.36,
  },
  {
    delay: 37,
    noiseX: 0.38,
    noiseY: -0.38,
  },
  {
    delay: 27,
    noiseX: -0.95,
    noiseY: -0.41,
  },
  {
    delay: 18,
    noiseX: -0.6,
    noiseY: -0.6,
  },
  {
    delay: 19,
    noiseX: -0.44,
    noiseY: 0.44,
  },
  {
    delay: 28,
    noiseX: 0,
    noiseY: -0.43,
  },
  {
    delay: 41,
    noiseX: -0.36,
    noiseY: -0.21,
  },
  {
    delay: 38,
    noiseX: 0.5,
    noiseY: -0.26,
  },
  {
    delay: 33,
    noiseX: 0.41,
    noiseY: -0.41,
  },
  {
    delay: 16,
    noiseX: 0.38,
    noiseY: -0.38,
  },
  {
    delay: 19,
    noiseX: -0.46,
    noiseY: -0.44,
  },
  {
    delay: 22,
    noiseX: -0.36,
    noiseY: 0.29,
  },
  {
    delay: 39,
    noiseX: -0.36,
    noiseY: -0.71,
  },
  {
    delay: 31,
    noiseX: -0.5,
    noiseY: -0.38,
  },
  {
    delay: 21,
    noiseX: 0.41,
    noiseY: -0.48,
  },
  {
    delay: 42,
    noiseX: 0.38,
    noiseY: 0,
  },
  {
    delay: 39,
    noiseX: 0.15,
    noiseY: 0.15,
  },
  {
    delay: 29,
    noiseX: 0.07,
    noiseY: 0.29,
  },
  {
    delay: 29,
    noiseX: -0.07,
    noiseY: 0.5,
  },
  {
    delay: 41,
    noiseX: -0.12,
    noiseY: 0.26,
  },
  {
    delay: 39,
    noiseX: 0.43,
    noiseY: -0.93,
  },
  {
    delay: 19,
    noiseX: 0.38,
    noiseY: 0.38,
  },
  {
    delay: 30,
    noiseX: -0.15,
    noiseY: 0,
  },
  {
    delay: 32,
    noiseX: -0.13,
    noiseY: 0.26,
  },
  {
    delay: 30,
    noiseX: -0.5,
    noiseY: -0.36,
  },
  {
    delay: 32,
    noiseX: 0.24,
    noiseY: -0.26,
  },
  {
    delay: 23,
    noiseX: -0.48,
    noiseY: 0.48,
  },
  {
    delay: 24,
    noiseX: -0.76,
    noiseY: 0.38,
  },
  {
    delay: 15,
    noiseX: -0.15,
    noiseY: -0.31,
  },
  {
    delay: 21,
    noiseX: 0.13,
    noiseY: -0.13,
  },
  {
    delay: 35,
    noiseX: -0.36,
    noiseY: -0.36,
  },
  {
    delay: 32,
    noiseX: -0.24,
    noiseY: 0.26,
  },
  {
    delay: 33,
    noiseX: -0.48,
    noiseY: 0.43,
  },
  {
    delay: 38,
    noiseX: 0,
    noiseY: 0.38,
  },
  {
    delay: 37,
    noiseX: 0.15,
    noiseY: 0,
  },
  {
    delay: 16,
    noiseX: 0.26,
    noiseY: -0.13,
  },
  {
    delay: 15,
    noiseX: -0.36,
    noiseY: 0.36,
  },
  {
    delay: 28,
    noiseX: -0.47,
    noiseY: 0.02,
  },
  {
    delay: 17,
    noiseX: 0.93,
    noiseY: 0.46,
  },
  {
    delay: 40,
    noiseX: 0.38,
    noiseY: -0.38,
  },
  {
    delay: 35,
    noiseX: 0,
    noiseY: -0.15,
  },
  {
    delay: 32,
    noiseX: 0,
    noiseY: -0.13,
  },
  {
    delay: 29,
    noiseX: 0,
    noiseY: 0.36,
  },
  {
    delay: 40,
    noiseX: -0.89,
    noiseY: 0.44,
  },
  {
    delay: 25,
    noiseX: -0.28,
    noiseY: -0.28,
  },
  {
    delay: 15,
    noiseX: 0.38,
    noiseY: 0.38,
  },
  {
    delay: 17,
    noiseX: -0.31,
    noiseY: -0.15,
  },
  {
    delay: 39,
    noiseX: 0.13,
    noiseY: 0.26,
  },
  {
    delay: 37,
    noiseX: -0.73,
    noiseY: -0.36,
  },
  {
    delay: 40,
    noiseX: -0.49,
    noiseY: -0.47,
  },
  {
    delay: 44,
    noiseX: 0.17,
    noiseY: 0.28,
  },
  {
    delay: 31,
    noiseX: -0.04,
    noiseY: -0.32,
  },
  {
    delay: 22,
    noiseX: -0.31,
    noiseY: -0.15,
  },
  {
    delay: 35,
    noiseX: -0.13,
    noiseY: -0.13,
  },
  {
    delay: 15,
    noiseX: 0.36,
    noiseY: 0,
  },
  {
    delay: 39,
    noiseX: -0.89,
    noiseY: 0.42,
  },
  {
    delay: 28,
    noiseX: -0.28,
    noiseY: 0.5,
  },
  {
    delay: 32,
    noiseX: -0.23,
    noiseY: 0.18,
  },
  {
    delay: 35,
    noiseX: -0.5,
    noiseY: -0.42,
  },
  {
    delay: 19,
    noiseX: -0.13,
    noiseY: -0.26,
  },
  {
    delay: 25,
    noiseX: 0.36,
    noiseY: -0.36,
  },
  {
    delay: 38,
    noiseX: 0.42,
    noiseY: 0.47,
  },
  {
    delay: 37,
    noiseX: -0.11,
    noiseY: -0.5,
  },
  {
    delay: 34,
    noiseX: 0.54,
    noiseY: 0.54,
  },
  {
    delay: 27,
    noiseX: -0.91,
    noiseY: -0.76,
  },
  {
    delay: 20,
    noiseX: 0.44,
    noiseY: -0.46,
  },
  {
    delay: 23,
    noiseX: 0,
    noiseY: -0.73,
  },
  {
    delay: 32,
    noiseX: -0.46,
    noiseY: 0.44,
  },
  {
    delay: 19,
    noiseX: -0.5,
    noiseY: -0.28,
  },
  {
    delay: 43,
    noiseX: 0.04,
    noiseY: 0.73,
  },
  {
    delay: 29,
    noiseX: 0.34,
    noiseY: -0.16,
  },
  {
    delay: 33,
    noiseX: 0.9,
    noiseY: 0.9,
  },
  {
    delay: 24,
    noiseX: 0,
    noiseY: -0.32,
  },
  {
    delay: 39,
    noiseX: 0.91,
    noiseY: -0.49,
  },
  {
    delay: 34,
    noiseX: 0,
    noiseY: 0.28,
  },
  {
    delay: 35,
    noiseX: 0.5,
    noiseY: -0.04,
  },
  {
    delay: 25,
    noiseX: 0.34,
    noiseY: 0.16,
  },
  {
    delay: 40,
    noiseX: -0.46,
    noiseY: -0.46,
  },
  {
    delay: 36,
    noiseX: 0.32,
    noiseY: 0.32,
  },
  {
    delay: 36,
    noiseX: 0.06,
    noiseY: 0.06,
  },
  {
    delay: 30,
    noiseX: -0.39,
    noiseY: 0.5,
  },
  {
    delay: 28,
    noiseX: -0.5,
    noiseY: 0.54,
  },
  {
    delay: 34,
    noiseX: 0.76,
    noiseY: 0.5,
  },
  {
    delay: 31,
    noiseX: -0.45,
    noiseY: -0.44,
  },
  {
    delay: 29,
    noiseX: 0.32,
    noiseY: 0.32,
  },
  {
    delay: 25,
    noiseX: -0.06,
    noiseY: -0.06,
  },
  {
    delay: 31,
    noiseX: -0.22,
    noiseY: -0.44,
  },
  {
    delay: 22,
    noiseX: 0,
    noiseY: 0.04,
  },
  {
    delay: 38,
    noiseX: 0.57,
    noiseY: -0.5,
  },
  {
    delay: 16,
    noiseX: 0,
    noiseY: -0.02,
  },
  {
    delay: 39,
    noiseX: -0.32,
    noiseY: -0.32,
  },
  {
    delay: 31,
    noiseX: 0.06,
    noiseY: 0,
  },
  {
    delay: 43,
    noiseX: 0,
    noiseY: 0.22,
  },
  {
    delay: 24,
    noiseX: -0.83,
    noiseY: 0.41,
  },
  {
    delay: 28,
    noiseX: 0.5,
    noiseY: 0.34,
  },
  {
    delay: 17,
    noiseX: 0,
    noiseY: -0.89,
  },
  {
    delay: 24,
    noiseX: -0.32,
    noiseY: 0.32,
  },
  {
    delay: 16,
    noiseX: -0.12,
    noiseY: -0.12,
  },
  {
    delay: 26,
    noiseX: -0.44,
    noiseY: 0,
  },
  {
    delay: 15,
    noiseX: 0,
    noiseY: 0,
  },
  {
    delay: 33,
    noiseX: -0.04,
    noiseY: -0.49,
  },
  {
    delay: 37,
    noiseX: -0.9,
    noiseY: 0.45,
  },
  {
    delay: 16,
    noiseX: 0.32,
    noiseY: -0.32,
  },
  {
    delay: 25,
    noiseX: -0.06,
    noiseY: 0,
  },
  {
    delay: 29,
    noiseX: 0.22,
    noiseY: 0.44,
  },
  {
    delay: 28,
    noiseX: -0.41,
    noiseY: -0.83,
  },
  {
    delay: 40,
    noiseX: -0.37,
    noiseY: -0.41,
  },
  {
    delay: 26,
    noiseX: 0,
    noiseY: 0.34,
  },
  {
    delay: 32,
    noiseX: 0.32,
    noiseY: 0.32,
  },
  {
    delay: 33,
    noiseX: -0.06,
    noiseY: 0.06,
  },
  {
    delay: 16,
    noiseX: -0.22,
    noiseY: -0.22,
  },
  {
    delay: 42,
    noiseX: -0.83,
    noiseY: -0.41,
  },
  {
    delay: 16,
    noiseX: 0.49,
    noiseY: 0.04,
  },
  {
    delay: 43,
    noiseX: -0.16,
    noiseY: -0.18,
  },
  {
    delay: 25,
    noiseX: -0.16,
    noiseY: -0.48,
  },
  {
    delay: 18,
    noiseX: -0.12,
    noiseY: 0.06,
  },
  {
    delay: 42,
    noiseX: -0.44,
    noiseY: 0.22,
  },
  {
    delay: 26,
    noiseX: -0.41,
    noiseY: 0.42,
  },
  {
    delay: 16,
    noiseX: -0.86,
    noiseY: -0.86,
  },
  {
    delay: 35,
    noiseX: -0.5,
    noiseY: 0.68,
  },
  {
    delay: 34,
    noiseX: -0.16,
    noiseY: 0.17,
  },
  {
    delay: 39,
    noiseX: 0.36,
    noiseY: 0.93,
  },
  {
    delay: 15,
    noiseX: 0.22,
    noiseY: 0.22,
  },
  {
    delay: 44,
    noiseX: 0,
    noiseY: 0.41,
  },
  {
    delay: 24,
    noiseX: -0.45,
    noiseY: -0.86,
  },
  {
    delay: 39,
    noiseX: -0.34,
    noiseY: 0,
  },
  {
    delay: 32,
    noiseX: -0.48,
    noiseY: 0.5,
  },
  {
    delay: 35,
    noiseX: 0.4,
    noiseY: -0.44,
  },
  {
    delay: 30,
    noiseX: -0.42,
    noiseY: 0,
  },
  {
    delay: 40,
    noiseX: 0,
    noiseY: 0.41,
  },
  {
    delay: 43,
    noiseX: -0.86,
    noiseY: -0.45,
  },
  {
    delay: 31,
    noiseX: -0.18,
    noiseY: -0.18,
  },
  {
    delay: 39,
    noiseX: -0.31,
    noiseY: 0.33,
  },
  {
    delay: 42,
    noiseX: -0.04,
    noiseY: -0.4,
  },
  {
    delay: 21,
    noiseX: 0.42,
    noiseY: 0.85,
  },
  {
    delay: 22,
    noiseX: 0,
    noiseY: -0.24,
  },
  {
    delay: 27,
    noiseX: 0.04,
    noiseY: -0.86,
  },
  {
    delay: 30,
    noiseX: -0.5,
    noiseY: -0.52,
  },
  {
    delay: 15,
    noiseX: -0.17,
    noiseY: -0.17,
  },
  {
    delay: 23,
    noiseX: -0.49,
    noiseY: 0.89,
  },
  {
    delay: 31,
    noiseX: -0.42,
    noiseY: 0,
  },
  {
    delay: 44,
    noiseX: 0.24,
    noiseY: 0,
  },
  {
    delay: 15,
    noiseX: -0.04,
    noiseY: -0.04,
  },
  {
    delay: 18,
    noiseX: 0.16,
    noiseY: -0.18,
  },
  {
    delay: 34,
    noiseX: -0.17,
    noiseY: -0.17,
  },
  {
    delay: 20,
    noiseX: -0.89,
    noiseY: -0.36,
  },
  {
    delay: 15,
    noiseX: 0.42,
    noiseY: -0.42,
  },
  {
    delay: 44,
    noiseX: 0.24,
    noiseY: -0.24,
  },
  {
    delay: 44,
    noiseX: 0.08,
    noiseY: 0.04,
  },
  {
    delay: 19,
    noiseX: -0.3,
    noiseY: 0.3,
  },
  {
    delay: 18,
    noiseX: -0.33,
    noiseY: -0.33,
  },
  {
    delay: 27,
    noiseX: -0.44,
    noiseY: -0.4,
  },
  {
    delay: 36,
    noiseX: 0.42,
    noiseY: 0,
  },
  {
    delay: 36,
    noiseX: 0.24,
    noiseY: -0.48,
  },
  {
    delay: 20,
    noiseX: 0,
    noiseY: 0.04,
  },
  {
    delay: 23,
    noiseX: 0.3,
    noiseY: -0.3,
  },
  {
    delay: 27,
    noiseX: 0.88,
    noiseY: -0.44,
  },
  {
    delay: 32,
    noiseX: 0.49,
    noiseY: -0.49,
  },
  {
    delay: 16,
    noiseX: 0,
    noiseY: -0.84,
  },
  {
    delay: 24,
    noiseX: -0.24,
    noiseY: 0.24,
  },
  {
    delay: 28,
    noiseX: 0.04,
    noiseY: 0.04,
  },
  {
    delay: 34,
    noiseX: 0.6,
    noiseY: 0.3,
  },
  {
    delay: 38,
    noiseX: 0.01,
    noiseY: 0.01,
  },
  {
    delay: 44,
    noiseX: 0.49,
    noiseY: 0.35,
  },
  {
    delay: 43,
    noiseX: 0,
    noiseY: 0,
  },
];
