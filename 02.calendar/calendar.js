import { program } from "commander";

program
  .option("-m, --month <n>", "1~12を入力", checkInput)
  .option("-y, --year <n>", "1970~2100を入力", checkInput);
program.parse();
const options = program.opts();

const today = new Date();
let year;
let month;

if (options.year !== undefined) {
  if (options.year >= 1970 && options.year <= 2100) year = options.year;
} else year = today.getFullYear();
if (options.month !== undefined) {
  if (options.month <= 12 && options.month >= 1) month = options.month;
} else month = today.getMonth() + 1;

const firstDate = new Date(year, month - 1, 1);
const lastDate = new Date(year, month, 0);

console.log("\t" + month + "月 " + year);
console.log("日 月 火 水 木 金 土");

process.stdout.write("   ".repeat(firstDate.getDay()));

for (let i = 1; i <= lastDate.getDate(); i++) {
  process.stdout.write(i.toString().padStart(2) + " ");
  //  現在の日付が土曜日なら改行する処理を入れる
  if (new Date(year, month - 1, i).getDay() == 6) console.log();
}

// プロンプト文字の出力の回避
console.log();

function checkInput(value) {
  // parseInt takes a string and a radix
  const parsedValue = parseInt(value, 10);
  if (isNaN(parsedValue)) {
    throw new program.InvalidArgumentError("正しい数値を入力し直してください");
  }

  return parsedValue;
}
