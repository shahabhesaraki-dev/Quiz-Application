export const shuffeldArray = (array: any[]) =>
  [...array].sort(() => Math.random() - 0.5);
