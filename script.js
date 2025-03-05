// Initialize an empty array to store transactions
let transactions = [];

// Get references to the DOM elements
const addTransactionBtn = document.getElementById("addTransactionBtn");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");

const transactionsList = document.getElementById("transactionsList");
const totalIncomeSpan = document.getElementById("totalIncome");
const totalExpensesSpan = document.getElementById("totalExpenses");
const balanceSpan = document.getElementById("balance");

// Format numbers as Peso (₱) currency with two decimal places
function formatCurrency(amount) {
  return '₱' + amount.toFixed(2);
}

// Update the totals and display transactions
function updateFinancialSummary() {
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpenses;

  totalIncomeSpan.textContent = formatCurrency(totalIncome);  // Add the Peso sign once
  totalExpensesSpan.textContent = formatCurrency(totalExpenses);  // Add the Peso sign once
  balanceSpan.textContent = formatCurrency(balance);  // Add the Peso sign once

  displayTransactions();
}

// Display all transactions in the list
function displayTransactions() {
  transactionsList.innerHTML = '';  // Clear the list before re-rendering

  transactions.forEach((transaction, index) => {
    const li = document.createElement('li');
    li.classList.add('transaction-item');
    li.classList.add(transaction.type);

    li.innerHTML = `
      <span>${transaction.description}</span>
      <span>${formatCurrency(transaction.amount)}</span>
      <button onclick="deleteTransaction(${index})">Delete</button>
    `;

    transactionsList.appendChild(li);
  });
}

// Add a new transaction
function addTransaction() {
  const description = descriptionInput.value.trim();
  const amount = parseFloat(amountInput.value.trim());
  const type = typeInput.value;

  // Validate the input
  if (!description || isNaN(amount) || amount <= 0) {
    alert("Please enter a valid description and amount.");
    return;
  }

  // Add the new transaction to the array
  transactions.push({ description, amount, type });

  // Clear the input fields
  descriptionInput.value = '';
  amountInput.value = '';

  // Update the totals and display the updated list
  updateFinancialSummary();
}

// Delete a transaction
function deleteTransaction(index) {
  transactions.splice(index, 1);  // Remove the transaction at the specified index
  updateFinancialSummary();  // Recalculate and display the updated data
}

// Event listener for the "Add Transaction" button
addTransactionBtn.addEventListener('click', addTransaction);
