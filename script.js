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
  // Step 4: Function to dynamically add entry fields based on selected category
function addEntry() {
    const targetInputContainer = document.querySelector(`#${entryDropdown.value} .input-container`);
    const entryNumber = targetInputContainer.querySelectorAll('input[type="text"]').length + 1;
    const HTMLString = `
      <label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>
      <input type="text" id="${entryDropdown.value}-${entryNumber}-name" placeholder="Name" />
      <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
      <input
        type="number"
        min="0"
        id="${entryDropdown.value}-${entryNumber}-calories"
        placeholder="Calories"
      />`;
    targetInputContainer.insertAdjacentHTML('beforeend', HTMLString);
  }

  // Step 5: Function to calculate calories and update the output
function calculateCalories(e) {
    e.preventDefault();
    isError = false;
  
    // Get number inputs for each category
    const breakfastNumberInputs = document.querySelectorAll('#breakfast input[type=number]');
    const lunchNumberInputs = document.querySelectorAll('#lunch input[type=number]');
    const dinnerNumberInputs = document.querySelectorAll('#dinner input[type=number]');
    const snacksNumberInputs = document.querySelectorAll('#snacks input[type=number]');
    const exerciseNumberInputs = document.querySelectorAll('#exercise input[type=number]');
  
    // Calculate calories for each category
    const breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs);
    const lunchCalories = getCaloriesFromInputs(lunchNumberInputs);
    const dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs);
    const snacksCalories = getCaloriesFromInputs(snacksNumberInputs);
    const exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs);
    const budgetCalories = getCaloriesFromInputs([budgetNumberInput]);
  
    if (isError) {
      return;
    }
    // Calculate remaining calories and update output
  const consumedCalories = breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;
  const remainingCalories = budgetCalories - consumedCalories + exerciseCalories;
  const surplusOrDeficit = remainingCalories >= 0 ? 'Surplus' : 'Deficit';
  output.innerHTML = `
    <span class="${surplusOrDeficit.toLowerCase()}">${Math.abs(remainingCalories)} Calorie ${surplusOrDeficit}</span>
    <hr>
    <p>${budgetCalories} Calories Budgeted</p>
    <p>${consumedCalories} Calories Consumed</p>
    <p>${exerciseCalories} Calories Burned</p>
  `;

  output.classList.remove('hide');
}
// Step 6: Function to get total calories from a list of inputs
function getCaloriesFromInputs(list) {
    let calories = 0;
  
    for (let i = 0; i < list.length; i++) {
      const currVal = cleanInputString(list[i].value);
      const invalidInputMatch = isInvalidInput(currVal);
  
      if (invalidInputMatch) {
        alert(`Invalid Input: ${invalidInputMatch[0]}`);
        isError = true;
        return null;
      }
      calories += Number(currVal);
    }
    return calories;
  }

  // Step 7: Function to clear the form
function clearForm() {
    const inputContainers = Array.from(document.querySelectorAll('.input-container'));
  
    for (let i = 0; i < inputContainers.length; i++) {
      inputContainers[i].innerHTML = '';
    }
  
    budgetNumberInput.value = '';
    output.innerText = '';
    output.classList.add('hide');
  }
  // Step 8: Event listener for the "Add Entry" button
addEntryButton.addEventListener("click", addEntry);

// Step 9: Event listener for the form submission to calculate calories
calorieCounter.addEventListener("submit", calculateCalories);

// Step 10: Event listener for the "Clear" button to clear the form
clearButton.addEventListener('click', clearForm);
