const insertItemAt = <T >(array: T[], index: number, newItem: T): T[] => [
  ...array.slice(0, index),
  newItem,
  ...array.slice(index),
];

export default insertItemAt;
