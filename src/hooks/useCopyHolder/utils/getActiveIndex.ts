// TODO: write test so we be sure there are all characters listed.
const validCharacters = [
  13,
  32,
  48,
  49,
  50,
  51,
  52,
  53,
  54,
  55,
  56,
  57,
  65,
  66,
  67,
  68,
  69,
  70,
  71,
  72,
  73,
  74,
  75,
  76,
  77,
  78,
  79,
  80,
  81,
  82,
  83,
  84,
  85,
  86,
  87,
  88,
  89,
  90,
  96,
  97,
  98,
  99,
  100,
  101,
  102,
  103,
  104,
  105,
  106,
  107,
  109,
  110,
  111,
  186,
  187,
  188,
  189,
  190,
  191,
  192,
  219,
  220,
  221,
  222
];

export const getActiveIndex = (prevActiveIndex: number, keyCode: number) => {
  switch (true) {
    // backspace
    case keyCode === 8:
      return prevActiveIndex - 1;

    default:
      return validCharacters.includes(keyCode) ? prevActiveIndex + 1 : prevActiveIndex;
  }
};
