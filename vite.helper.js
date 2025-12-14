export const [isLib, isProd] = ['lib', 'production'].map(
  (targetMode) => (mode) => mode === targetMode
);
