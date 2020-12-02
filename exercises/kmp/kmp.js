function kmp(source, pattern) {
  // 计算 Next 数组
  let next = new Array(pattern.length).fill(0);

  {
    // 寻找模式窜中的公共前后缀
    let i = 1,
      j = 0;

    while (i < pattern.length - 1) {
      if (pattern[i] === pattern[j]) {
        ++j, ++i;
        next[i] = j;
      } else {
        if (j > 0) {
          j = next[j];
        } else {
          ++i;
        }
      }
    }

    next[0] = -1;
  }

  // 匹配
  {
    let i = 0,
      j = 0;

    while (i < source.length) {
      if (pattern[j] === source[i]) {
        ++j, ++i;
      } else {
        if (j > 0) {
          j = next[j];
        } else {
          ++i;
        }
      }
      if (j === pattern.length) return true;
    }
    return false;
  }
}

console.log(kmp('ABABABAABABAAABABAA', 'ABABAAABABAA'));
console.log(kmp('helbbblo', 'll'));
