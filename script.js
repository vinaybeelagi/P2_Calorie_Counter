const calorieCounter = document.getElementById('calorie-counter');
const budgetNumberInput = document.getElementById('budget');
const entryDropdown = document.getElementById('entry-dropdown');
const addEntryButton = document.getElementById('add-entry');
const clearButton = document.getElementById('clear');
const output = document.getElementById('output');
let isError = false;
// Step 2: Function to clean input string by removing specific characters
function cleanInputString(str) {
    const regex = /[+-\s]/g;
    return str.replace(regex, '');
  }
  // Step 3: Function to check if input string has invalid exponential notation
function isInvalidInput(str) {
    const regex = /\d+e\d+/i;
    return str.match(regex);
  }