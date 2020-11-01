/**
 * 字符转数字
 * @param {String} str
 */
function stringToNumber(str) {
  let number = 0;
  // 这些字符可以用于 2、8、16 进制
  let digits = '0123456789abcdef';

  const factor = 0; // 基数

  if (str.startsWith('0x')) factor = 16; // 16 进制
  if (str.startsWith('0o')) factor = 8; // 8 进制
  if (str.startsWith('0b')) factor = 2; // 2 进制

  if (factor === 0) return Number(str); // 都不是就是 10 进制，直接返回 Number()

  for (let i = str.length - 1; i >= 2; i--) {
    const v = str[i];
    number += Number(digits.indexOf(v)) * factor ** (str.length - 1 - i);
  }

  return number;
}

function numberToString(number, base) {
  let string = '';
  let num = Math.abs(number);
  let sign = number > 0 ? '' : '-';

  if (number == 0) return '0';

  switch (base) {
    case 2:
      while (num > 0) {
        if (num % 2) string = (num % 2) + string;
        else string = 0 + string;
        num >>= 1;
      }
      break;
    case 8:
      while (num > 0) {
        if (num % 8) string = (num % 8) + string;
        else string = 0 + string;
        num >>= 3;
      }
      break;
    case 16:
      while (num > 0) {
        if (num % 16) string = (num % 16) + string;
        else string = 0 + string;
        num >>= 4;
      }
      break;

    default:
      return String(num);
  }

  return sign + string;
}

console.log(numberToString(1027, 16));
