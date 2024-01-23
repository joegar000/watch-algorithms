export default function generateNumbers(numCount: number) {
  const nums: number[] = [];
  for (let x = 0; x < numCount; x++) {
    let num = Math.ceil(Math.random() * numCount);
    while (nums.includes(num))
      num = Math.ceil(Math.random() * numCount);
    nums.push(num);
  }
  return nums;
};
