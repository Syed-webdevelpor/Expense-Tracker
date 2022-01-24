import { Header } from './components/Header';
import { Balance } from './components/Balance';
import { IncomeExpenses } from './components/IncomeExpenses';
import { TransactionList } from './components/TransactionList';
import { AddTransection } from './components/AddTransection';
import { GlobalProvider } from './context/Globlestate';
import './App.css';
function App() {
  return (
    <GlobalProvider>
    <Header />
    <div class="container">
      <Balance />
      <IncomeExpenses />
      <TransactionList />
      <AddTransection />
    </div>

    </GlobalProvider>
  );
}

export default App;
