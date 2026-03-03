"use client"
import { useState, useContext, useEffect} from "react";
import { financeContext } from "@/lib/store/finance-context";
import { authContext } from "@/lib/store/auth-context";

import { currencyFormatter, formatMonthLabel, getMonthRange, isWithinRange, toJsDate } from "@/lib/utils"
import ExpenseCategoryItem from "@/components/ExpenseCategoryItem"
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

import AddIncomeModal from "@/components/modals/AddIncomeModal";
import AddExpensesModal from "@/components/modals/AddExpensesModal";
import SignIn from "@/components/SignIn";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Doughnut } from "react-chartjs-2";

// Firebase
import { db } from "@/lib/firebase";
import { collection,addDoc, getDocs, doc, deleteDoc } from "firebase/firestore";

// Icons

import { FaRegTrashAlt } from 'react-icons/fa'


ChartJS.register(ArcElement, Tooltip, Legend);





export default function Home() {

  
  

  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);

  const [balance, setBalance] = useState(0);
  const [monthFilter, setMonthFilter] = useState("this"); // "this" | "last" | "all"

  const { expenses, income } = useContext(financeContext);
  const { user } = useContext(authContext);
  

  
useEffect(() => {
  if (monthFilter === "all") {
    const incomeTotal = income.reduce((total, i) => total + i.amount, 0);
    const expensesTotal = expenses.reduce((total, e) => total + (e.total ?? 0), 0);
    setBalance(incomeTotal - expensesTotal);
    return;
  }

  const monthOffset = monthFilter === "last" ? -1 : 0;
  const range = getMonthRange(new Date(), monthOffset);

  const incomeTotal = income.reduce((total, i) => {
    const createdAt = toJsDate(i.createdAt);
    if (!createdAt || !isWithinRange(createdAt, range)) return total;
    return total + i.amount;
  }, 0);

  const expensesTotal = expenses.reduce((total, category) => {
    const items = Array.isArray(category.items) ? category.items : [];
    const monthSpend = items.reduce((sum, item) => {
      const createdAt = toJsDate(item.createdAt);
      if (!createdAt || !isWithinRange(createdAt, range)) return sum;
      return sum + item.amount;
    }, 0);
    return total + monthSpend;
  }, 0);

  const newBalance = incomeTotal - expensesTotal;

  setBalance(newBalance);
}, [expenses, income, monthFilter]);


  if(!user){
    return <SignIn />
  }

  const monthOffset = monthFilter === "last" ? -1 : 0;
  const range = monthFilter === "all" ? null : getMonthRange(new Date(), monthOffset);
  const periodLabel = monthFilter === "all" ? "All time" : formatMonthLabel(new Date(), monthOffset);

  const expensesWithDisplayTotals =
    monthFilter === "all"
      ? expenses.map((category) => ({ category, total: category.total ?? 0 }))
      : expenses.map((category) => {
          const items = Array.isArray(category.items) ? category.items : [];
          const monthTotal = items.reduce((sum, item) => {
            const createdAt = toJsDate(item.createdAt);
            if (!createdAt || !isWithinRange(createdAt, range)) return sum;
            return sum + item.amount;
          }, 0);

          return { category, total: monthTotal };
        });

  const hasAnyData =
    monthFilter === "all"
      ? income.length > 0 || expenses.some((e) => (e.total ?? 0) > 0)
      : income.some((i) => {
          const createdAt = toJsDate(i.createdAt);
          return createdAt && isWithinRange(createdAt, range);
        }) || expensesWithDisplayTotals.some(({ total }) => total > 0);

  return (

    <>
      {/* Add income Modal */}
      
      <AddIncomeModal show={showAddIncomeModal} onClose={setShowAddIncomeModal}/>

      {/* Add Expenses Modal */}
      <AddExpensesModal
      show={showAddExpenseModal}
      onClose={setShowAddExpenseModal}
      />


      <main className="w-full min-w-0 max-w-2xl mx-auto px-4 sm:px-6">
        <section className="py-3">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <small className="text-gray-400 text-md">My Balance</small>
              <h2 className="text-4xl font-bold">{currencyFormatter(balance)}</h2>
              <p className="mt-1 text-sm text-gray-400">Showing {periodLabel}</p>
            </div>

            <div className="flex flex-shrink-0 flex-wrap items-center justify-center sm:justify-end gap-2 rounded-xl bg-slate-800 p-1 w-full sm:w-auto">
              <button
                type="button"
                aria-pressed={monthFilter === "this"}
                onClick={() => setMonthFilter("this")}
                className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                  monthFilter === "this" ? "bg-slate-700 text-lime-300" : "text-gray-300"
                }`}
              >
                This month
              </button>
              <button
                type="button"
                aria-pressed={monthFilter === "last"}
                onClick={() => setMonthFilter("last")}
                className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                  monthFilter === "last" ? "bg-slate-700 text-lime-300" : "text-gray-300"
                }`}
              >
                Last month
              </button>
              <button
                type="button"
                aria-pressed={monthFilter === "all"}
                onClick={() => setMonthFilter("all")}
                className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                  monthFilter === "all" ? "bg-slate-700 text-lime-300" : "text-gray-300"
                }`}
              >
                All time
              </button>
            </div>
          </div>
        </section>

        <section className="flex flex-wrap items-center gap-2 py-3 w-full">
          <Button
            onClick={() => {
              setShowAddExpenseModal(true)
            }}
            variant="primary"
          >
            + Expenses
          </Button>
          <Button onClick={() => {setShowAddIncomeModal(true)}} variant="outline">
            + Income
          </Button>
        </section>

        {/* Expenses */}

        <section className="py-6">
          
          <h3 className="text-2xl">My Expenses</h3>

          <div className="flex flex-col gap-4 mt-6">
            {expenses.length === 0 && (
              <Card>
                <p className="font-semibold">No expense categories yet</p>
                <p className="mt-1 text-sm text-gray-400">
                  Add an expense and create your first category to start tracking spending.
                </p>
              </Card>
            )}

            {expensesWithDisplayTotals.map(({ category, total }) => {
              return (
                <ExpenseCategoryItem
                  key={category.id}
                  expense={category}
                  displayTotal={total}
                  periodLabel={monthFilter === "all" ? null : periodLabel}
                />
              )
            })}



          </div>
        </section>

        {/* Chart Section */}

        <section className="py-6">
        <a id="stats"/>
          <h3 className="text-2xl">Stats</h3>

          {!hasAnyData ? (
            <Card className="mt-4">
              <p className="font-semibold">No data for {periodLabel}</p>
              <p className="mt-1 text-sm text-gray-400">
                Add income or expenses to see your stats.
              </p>
            </Card>
          ) : (
          <div className="w-full flex flex-col items-center mt-4">
            <Doughnut className="h-[260px] w-[260px] sm:h-[300px] sm:w-[300px] max-w-full" data={{
              labels: expenses.map(expense => expense.title),
              datasets: [
                {
                  label: monthFilter === "all" ? "Expenses (all time)" : "Expenses (month)",
                  data: expensesWithDisplayTotals.map(({ total }) => total),
                  backgroundColor: expenses.map(expense => expense.color),
                  borderColor: ['#18181b'],
                  borderWidth: 5
                }
              ]
            }

            } />
          </div>
          )}

        </section>
      </main>
    </>
  )
}
