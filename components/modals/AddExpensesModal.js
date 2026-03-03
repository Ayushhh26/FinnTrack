import Modal from "@/components/Modal";
import { useState, useContext, useRef } from "react";
import { financeContext } from "@/lib/store/finance-context";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

function AddExpensesModal({ show, onClose }) {

    const [expenseAmount, setExpenseAmount] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showAddExpense, setShowAddExpense] = useState(false);


    const { expenses, addExpenseItem, addCategory } = useContext(financeContext);
    const titleRef = useRef();
    const colorRef = useRef();

    const addExpenseItemHandler = async () => {

        const expense = expenses.find(e => {
            return e.id === selectedCategory
        });
        const newExpense = {
            color: expense.color,
            title: expense.title, 
            total: expense.total + +expenseAmount,
            items: [
                ...expense.items,
                {
                    amount : +expenseAmount,
                    createdAt : new Date(),
                    id : uuidv4(),
                },
            ],
        };

        try {
            await addExpenseItem(selectedCategory, newExpense);
    
            
            setExpenseAmount("");
            setSelectedCategory(null);
            onClose();
            toast.success("Expense Item added")
            
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }
    }

    const addCategoryHandler = async () => {
        const title = titleRef.current.value;
        const color = colorRef.current.value;
        try {
            await addCategory({ title, color, total: 0 });
            setShowAddExpense(false);
            toast.success("Category created!")

          } catch (error) {
            console.log(error.message);
            toast.error(error.message);
          }
    };

  return (
    <Modal show={show} onClose={onClose}>
      <div className="input-group">
        <Input
          id="expenseAmount"
          label="Enter an Amount"
          type="number"
          min={1}
          step={1}
          placeholder="Enter Expense Amount"
          value={expenseAmount}
          onChange={(e) => {
            setExpenseAmount(e.target.value);
          }}
        />
      </div>

      {/* Expense Categories */}

      {expenseAmount > 0 && (
        <div className="flex flex-col gap-4 mt-6">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-xl font-semibold capitalize">Select Expense Category</h3>
            <button
              type="button"
              onClick={() => {
                setShowAddExpense(true);
              }}
              className="text-sm font-medium text-primary"
            >
              + New Category
            </button>
          </div>

          {showAddExpense && (
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex-1">
                <Input
                  id="newCategoryTitle"
                  label="Title"
                  placeholder="Enter title"
                  ref={titleRef}
                />
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                <label
                  className="text-sm text-gray-300"
                  htmlFor="newCategoryColor"
                >
                  Pick color
                </label>
                <input
                  id="newCategoryColor"
                  type="color"
                  className="w-20 h-9 rounded-input border border-border bg-surface-elevated"
                  ref={colorRef}
                />
                <Button variant="outline" size="sm" onClick={addCategoryHandler}>
                  Create
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => {
                    setShowAddExpense(false);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {expenses.map((expense) => {
            const isSelected = expense.id === selectedCategory;
            return (
              <button
                type="button"
                aria-pressed={isSelected}
                key={expense.id}
                onClick={() => {
                  setSelectedCategory(expense.id);
                }}
                className="w-full text-left"
              >
                <div
                  className={`flex items-center justify-between px-4 py-4 rounded-card bg-surface-elevated border ${
                    isSelected ? "border-primary shadow-card" : "border-border"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-[22px] h-[22px] rounded-full"
                      style={{
                        backgroundColor: expense.color,
                      }}
                    />
                    <h4 className="capitalize">{expense.title}</h4>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {expenseAmount > 0 && selectedCategory && (
        <div className="mt-6">
          <Button variant="primary" size="md" onClick={addExpenseItemHandler}>
            Add Expense
          </Button>
        </div>
      )}
    </Modal>
  );
}

export default AddExpensesModal 