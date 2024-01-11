import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here

class MoneyManager extends Component {
  state = {
    history: [],
    income: 0,
    expenses: 0,
    title: '',
    amount: '',
    type: transactionTypeOptions[0].optionId,
  }

  addTransaction = event => {
    event.preventDefault()
    const {title, amount, type} = this.state
    const selectedType = type || transactionTypeOptions[0].optionId
    const newTransaction = {
      id: uuidv4(),
      title,
      amount,
      type: selectedType,
    }

    /* this.setState(prevState => ({
            history: [...prevState.history, newTransaction]
            if (title === "INCOME"){
                income: prevState.income + amount
            }
            if (title === "EXPENSES"){
                expenses: prevState.expenses + amount
            }

            title: '',
            amount: 0,
            type: ''
        })) */

    this.setState(prevState => {
      const updatedHistory = [...prevState.history, newTransaction]
      let updatedIncome = prevState.income
      let updatedExpenses = prevState.expenses

      if (type === 'INCOME') {
        updatedIncome += amount
      } else if (type === 'EXPENSES') {
        updatedExpenses += amount
      }

      return {
        history: updatedHistory,
        income: updatedIncome,
        expenses: updatedExpenses,
        title: '',
        amount: '',
        type: '',
      }
    })
  }

  setTitleInput = event => {
    this.setState({title: event.target.value})
  }

  setAmountInput = event => {
    this.setState({amount: parseFloat(event.target.value)})
  }

  setTransactionType = event => {
    this.setState({type: event.target.value})
  }

  deleteTransaction = id => {
    const {history} = this.state
    const transactionToDelete = history.find(
      transaction => transaction.id === id,
    )
    if (transactionToDelete) {
      this.setState(prevState => {
        const updatedHistory = prevState.history.filter(
          eachPastTransaction => eachPastTransaction.id !== id,
        )
        let updatedIncome = prevState.income
        let updatedExpenses = prevState.expenses

        if (transactionToDelete.type === 'INCOME') {
          updatedIncome -= transactionToDelete.amount
        } else if (transactionToDelete.type === 'EXPENSES') {
          updatedExpenses -= transactionToDelete.amount
        }

        return {
          history: updatedHistory,
          income: updatedIncome,
          expenses: updatedExpenses,
        }
      })
    }
  }

  calculateBalance = () => {
    const {income, expenses} = this.state
    return income - expenses
  }

  render() {
    const {history, income, expenses, title, amount, type} = this.state

    return (
      <div className="money-manager-container">
        <div className="user-details-card">
          <h1 className="user-name">Hi, Richard</h1>
          <p className="greetings">
            Welcome back to your
            <span className="greetings-span-element">Money Manager</span>
          </p>
        </div>
        <MoneyDetails income={income} expenses={expenses} />

        <div className="user-transaction-details">
          <form className="form" onSubmit={this.addTransaction}>
            <h1 className="form-heading">Add Transaction</h1>
            <label className="label" htmlFor="transaction-title">
              TITLE
            </label>
            <input
              className="input"
              id="transaction-title"
              placeholder="Title"
              value={title}
              onChange={this.setTitleInput}
            />

            <label className="label" htmlFor="transaction-amount">
              AMOUNT
            </label>
            <input
              className="input"
              id="transaction-amount"
              placeholder="Amount"
              value={amount}
              onChange={this.setAmountInput}
            />

            <label className="label" htmlFor="transaction-type">
              TYPE
            </label>
            <select
              className="input"
              id="transaction-type"
              value={type}
              onChange={this.setTransactionType}
            >
              {transactionTypeOptions.map(option => (
                <option key={option.optionId} value={option.optionId}>
                  {option.displayText}
                </option>
              ))}
            </select>

            <button className="button" type="submit">
              Add
            </button>
          </form>

          <div className="history-container">
            <h1>History</h1>
            <div className="past-history">
              <p className="text">Title</p>
              <p className="text">Amount</p>
              <p className="text">Type</p>
            </div>
            <ul>
              {history.map(eachPastTransaction => (
                <TransactionItem
                  key={eachPastTransaction.id}
                  transactionDetails={eachPastTransaction}
                  deleteTransaction={this.deleteTransaction}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
