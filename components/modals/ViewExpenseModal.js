import { useContext } from 'react';
import { financeContext } from '@/lib/store/finance-context';
import Modal from '@/components/Modal'
import { currencyFormatter, toJsDate } from '@/lib/utils'
import { FaRegTrashAlt } from 'react-icons/fa'
import { toast } from 'react-toastify';
import Button from "@/components/ui/Button";


function ViewExpenseModal({ show, onClose, expense, periodLabel }) {

    const {deleteExpenseItem, deleteExpenseCategory} = useContext(financeContext);

    const deleteExpenseHandler = async () => {
        try { 

            await deleteExpenseCategory(expense.id);
            toast.success("Expense Category deleted successfully");

        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }
    }

    const deleteExpenseItemHandler = async (item) => {
            try {
                
                // Remove the item from the array
                const updatedItems = expense.items.filter((i) => i.id !== item.id );


                // update the expense balance
                const updatedExpense = {
                    items : [...updatedItems],
                    total : expense.total - item.amount,
                };

                await deleteExpenseItem(updatedExpense, expense.id);
                toast.success("Expense Item removed successfully");


            } catch (error) {
                console.log(error.message);
                toast.error(error.message);
            }
    };

  const items = Array.isArray(expense.items) ? expense.items : [];

  return (
    <Modal show={show} onClose={onClose}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold capitalize">{expense.title}</h2>
          {periodLabel && periodLabel !== "All time" && (
            <p className="mt-1 text-sm text-gray-400">
              Dashboard totals show {periodLabel}. This history is all-time.
            </p>
          )}
        </div>
        <Button variant="danger" size="sm" onClick={deleteExpenseHandler}>
          Delete
        </Button>
      </div>

      <div className="mt-6">
        <h3 className="mb-3 text-xl font-semibold">Expense History</h3>
        {items.length === 0 && (
          <p className="text-sm text-gray-400">No expense items yet.</p>
        )}
        {items.map((item) => {
          const createdAt = toJsDate(item.createdAt);
          return (
            <div
              key={item.id}
              className="flex items-center justify-between py-2 border-b border-border last:border-b-0"
            >
              <small className="text-xs text-muted">
                {createdAt ? createdAt.toISOString() : "—"}
              </small>
              <p className="flex items-center gap-2">
                {currencyFormatter(item.amount)}
                <button
                  type="button"
                  aria-label="Delete expense item"
                  onClick={() => {
                    deleteExpenseItemHandler(item);
                  }}
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center"
                >
                  <FaRegTrashAlt />
                </button>
              </p>
            </div>
          );
        })}
      </div>
    </Modal>
  );
}

export default ViewExpenseModal