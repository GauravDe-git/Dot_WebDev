import { password, copyBtn, copyMsg, passLengthDisplay, passLengthSlider, 
  upperCaseCheck, lowerCaseCheck, numbersCheck, symbolsCheck, 
  allCheckBox, strengthIndicator, generateBtn } from "./constants.js";
//--------------------------------//
let passLengthText = 10;
let checkCount = 0;

updateSlider();

function updateSlider() {
  passLengthSlider.value = passLengthText;
  passLengthDisplay.textContent = passLengthText;
}

function setIndicator(color) {
  strengthIndicator.style.backgroundColor = color;
  //shadow
}

function getRndInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//* --Generate functions--------------------------
function generateRandNum() {
  return getRndInt(0, 9);
}

function generateUpperCase() {
  return String.fromCharCode(getRndInt(65, 91));
}

function generateLowerCase() {
  return String.fromCharCode(getRndInt(97, 123));
}

function generateSymbol() {
  const symbols = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
  const rndNum = getRndInt(0, symbols.length);
  return symbols.charAt(rndNum);
}

//* -- Some more-----
function calcStrength() {
  let upperCaseCheck = false;
  let lowerCaseCheck = false;
  let numbersCheck = false;
  let symbolsCheck = false;

  if (upperCaseCheck.checked) upperCaseCheck = true;
  if (lowerCaseCheck.checked) lowerCaseCheck = true;
  if (numbersCheck.checked) numbersCheck = true;
  if (symbolsCheck.checked) symbolsCheck = true;

  if (
    upperCaseCheck &&
    lowerCaseCheck &&
    (numbersCheck || symbolsCheck) &&
    passLengthText >= 8
  ) {
    setIndicator("#0f0");
  } else if (
    (upperCaseCheck || lowerCaseCheck) &&
    (numbersCheck || symbolsCheck) &&
    passLengthText >= 6
  ) {
    setIndicator("#ff0");
  } else {
    setIndicator("#f00");
  }
}

async function copyContent() {
  try {
    await navigator.clipboard.writeText(password.value);
    copyMsg.textContent = "Copied";
  } catch (e) {
    copyMsg.textContent = e + "Failed";
  }
  //to make copy span visible
  copyMsg.classList.add("active");

  setTimeout(() => copyMsg.classList.remove("active"), 2000);
}

//* --Event Listeners--------------------

passLengthSlider.addEventListener("input", (e) => {
  passLengthText = e.target.value;
  updateSlider();
});

copyBtn.addEventListener("click", copyContent);

function handleCheckBoxChange() {
  checkCount = 0;
  allCheckBox.forEach((check) => {
    if (check.checked) checkCount++;
  });

  //special condition
  if (passLengthText < checkCount) passLengthText = checkCount;
  updateSlider();
}

allCheckBox.forEach((check) => {
  check.addEventListener("change", handleCheckBoxChange);
});

function shufflePassword(shuffle)
{
    //fisher Yates Method
    for (let i = shuffle.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffle[i], shuffle[j]] = [shuffle[j], shuffle[i]];
    }
    return shuffle.join('');
}

//*THE PASSWORD GENERATE FN.
generateBtn.addEventListener("click", () => {
  if (checkCount <= 0) return;

  if (passLengthText < checkCount) {
    passLengthText = checkCount;
    updateSlider();
  }

  //remove old pass
  password.value = "";

  //check checkboxes
  
  let funcArr = [];

  if (upperCaseCheck.checked) funcArr.push(generateUpperCase);
  if (lowerCaseCheck.checked) funcArr.push(generateLowerCase);
  if (numbersCheck.checked) funcArr.push(generateRandNum);
  if (symbolsCheck.checked) funcArr.push(generateSymbol);

  for (let i = 0; i < funcArr.length; i++) {
    password.value += funcArr[i]();
  }

  for (let i = 0; i < passLengthText - funcArr.length; i++) {
    let randIndex = getRndInt(0, funcArr.length);
    password.value += funcArr[randIndex]();
  }

  //shuffle the password
  password.value = shufflePassword(Array.from(password.value));

  calcStrength();
  copyMsg.textContent = "Copy";
});
