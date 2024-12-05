export const EmptyGrid = () =>
  Array(9)
    .fill(null)
    .map(() => Array(9).fill(0));

export const EmptyHintGrid = () =>
  Array(9)
    .fill(null)
    .map(() =>
      Array(9).fill({
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false,
      })
    );

export const DifficultySelections = { Easy: 25, Medium: 40, Hard: 60 };
