const billAmount = document.getElementById("bill-amount");
const buttons = document.querySelectorAll("button");
const form = document.querySelector("form");
const customTipContainer = document.getElementById("custom-tip-container");
const customTipInput = document.getElementById("custom-tip");
const numberOfGuestsInput = document.getElementById("numbers-of-guests");
const resetButton = document.getElementById("reset-button");
const tipAmountElement = document.getElementById("tip-amount");
const tipPerGuestElement = document.getElementById("tip-per-guest");
const totalPerGuestElement = document.getElementById("total-per-guest");
let numberOfGuestDisplay = document.getElementById("guest-count-display");

// Initialize display amounts
tipAmountElement.textContent = "$0.00";
tipPerGuestElement.textContent = "$0.00";
totalPerGuestElement.textContent = "$0.00";
numberOfGuestDisplay.textContent = 1;

let tipInput = 0;
let billValue = 0;
let selectedButton = null;

// Function to reset all UI elements to default
function resetUI() {
	if (selectedButton) {
		selectedButton.classList.remove("bg-primary-dark", "text-white");
		selectedButton = null;
	}
	tipInput = 0;
	billValue = 0;
	billAmount.value = "";
	customTipInput.value = "";
	numberOfGuestsInput.value = 1;
	numberOfGuestDisplay.textContent = 1;
	customTipContainer.classList.add("hidden");
	tipAmountElement.textContent = "$0.00";
	tipPerGuestElement.textContent = "$0.00";
	totalPerGuestElement.textContent = "$0.00";
}

// Add click events to tip buttons
buttons.forEach((button) => {
	button.addEventListener("click", function (event) {
		const buttonText = button.textContent.trim();

		if (buttonText !== "Calculate") {
			event.preventDefault();
		}

		// Remove active class from previously selected button
		if (selectedButton) {
			selectedButton.classList.remove("bg-primary-dark", "text-white");
		}

		if (buttonText === "Custom") {
			customTipContainer.classList.remove("hidden");
			button.classList.add("bg-primary-dark", "text-white");
			selectedButton = button;
			customTipInput.focus();
		} else if (buttonText !== "RESET" && buttonText !== "Calculate") {
			customTipContainer.classList.add("hidden");
			tipInput = parseFloat(buttonText) / 100;
			button.classList.add("bg-primary-dark", "text-white");
			selectedButton = button;
		}
	});
});

// Update tip percentage when custom tip is entered
customTipInput.addEventListener("input", function () {
	tipInput = parseFloat(this.value) / 100;
});

// Reset the form when the reset button is clicked
resetButton.addEventListener("click", function (event) {
	event.preventDefault();
	resetUI();
});

// Update guest count display on range input change
numberOfGuestsInput.addEventListener("input", function () {
	numberOfGuestDisplay.textContent = this.value;
});
numberOfGuestsInput.value = numberOfGuestDisplay.textContent;

// Calculate tip, tip per guest, and total per guest
form.addEventListener("submit", function (event) {
	event.preventDefault();
	billValue = parseFloat(billAmount.value) || 0;
	const numberOfGuests = parseInt(numberOfGuestsInput.value) || 1;

	// Calculate amounts
	const tipAmount = billValue * tipInput;
	const tipPerGuest = tipAmount / numberOfGuests;
	const totalPerGuest = (billValue + tipAmount) / numberOfGuests;

	// Update the DOM with calculated values
	tipAmountElement.textContent = `$${tipAmount.toFixed(2)}`;
	tipPerGuestElement.textContent = `$${tipPerGuest.toFixed(2)}`;
	totalPerGuestElement.textContent = `$${totalPerGuest.toFixed(2)}`;
});
