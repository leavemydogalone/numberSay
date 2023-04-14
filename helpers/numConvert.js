const singles = {
  0: "",
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
};
const tens = {
  1: "ten",
  2: "twenty",
  3: "thirty",
  4: "fourty",
  5: "fifty",
  6: "sixty",
  7: "seventy",
  8: "eighty",
  9: "ninety",
};
const group = {
  1: "thousand",
  2: "million",
  3: "billion",
  4: "trillion",
};

const teens = {
  11: "eleven",
  12: "twelve",
  13: "thirteen",
  14: "fourteen",
  15: "fifteen",
  16: "sixteen",
  17: "seventeen",
  18: "eighteen",
  19: "nineteen",
};

export default function numToStr(input) {
  if (input === 0) return "0";
  if (teens[input]) return teens[input];

  const convertedInput = input.toString();

  let output = "";

  function dive(number, depth) {
    if (number === "") return;

    let current = "";
    for (let i = number.length - 1; i >= 0; i--) {
      const position = number.length - i;
      let possibleTeen = teens[parseInt(number[i - 1] + number[i])];
      switch (position) {
        case 1:
          if (possibleTeen) {
            current = current + possibleTeen;
            i--;
            break;
          }
          current = current + singles[parseInt(number[i])];
          break;
        case 2:
          current = tens[parseInt(number[i])] + " " + current;
          break;
        case 3:
          current = singles[parseInt(number[i])] + " hundred " + current;
          break;
        default:
          current = current;
          break;
      }
    }
    output = current + " " + (group[depth] || "") + " " + output;
    dive(convertedInput.slice(-3 * (depth + 2), -3 * (depth + 1)), depth + 1);
  }
  dive(convertedInput.slice(-3), 0);
  return output;
}
