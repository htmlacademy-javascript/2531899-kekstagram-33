function checkStringLength (string, maxLength) {
  return string.length <= maxLength;
}
checkStringLength('kmknupn', 4);

function isPalindrome (string) {
  string = string.replaceAll(' ', '');
  string = string.toLowerCase();
  let reverseString = '';

  for (let i = string.length - 1; i >= 0; i--) {
    reverseString += string[i];
  }

  return reverseString === string;
}
isPalindrome('Лёша на полке клопа нашёл');

function findNumbers (string) {
  let numbersString = '';
  string = string.toString();

  for (let i = 0; i <= string.length; i++) {
    const sign = parseInt(string[i], 10);

    if (!Number.isNaN(sign)) {
      numbersString += string[i];
    }
  }

  return parseInt(numbersString, 10);
}
findNumbers('агент -0.07');
