import { squared } from '@/';

const input: HTMLInputElement = document.getElementById(
  'input',
) as HTMLInputElement;
const output: HTMLInputElement = document.getElementById(
  'output',
) as HTMLInputElement;

input.addEventListener('input', () => {
  output.value = squared(Number(input.value)).toString();
});
