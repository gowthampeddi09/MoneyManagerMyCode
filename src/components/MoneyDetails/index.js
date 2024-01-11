// Write your code here
import './index.css'

const MoneyDetails = props => {
  const {income, expenses} = props

  const balance = income - expenses

  return (
    <div className="money-details-container">
      <div className="balance-card">
        <img
          className="icon"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-icon.png"
          alt="balance"
          style={{display: 'none'}}
        />
        <div className="balance-details">
          <p className="card-text">Your Balance</p>
          <p className="amount" data-testid="balanceAmount">
            {balance.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="income-card">
        <img
          className="icon"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-icon.png"
          alt="income"
          style={{display: 'none'}}
        />
        <div className="income-details">
          <p className="card-text">Your Income</p>
          <p className="amount" data-testid="incomeAmount">
            {income.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="expenses-card">
        <img
          className="icon"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-icon.png"
          alt="expenses"
          style={{display: 'none'}}
        />
        <div className="expenses-details">
          <p className="card-text">Your Expenses</p>
          <p className="amount" data-testid="expensesAmount">
            {expenses.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  )
}
export default MoneyDetails
