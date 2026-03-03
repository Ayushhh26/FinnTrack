import { useState } from "react";
import { currencyFormatter } from "@/lib/utils";

import ViewExpenseModal from "./modals/ViewExpenseModal";

function ExpenseCategoryItem({ expense, displayTotal, periodLabel }) {

  const [showViewExpenseModal, setViewExpenseModal] = useState(false);

  return (
    <>
      <ViewExpenseModal
        show={showViewExpenseModal}
        onClose={setViewExpenseModal}
        expense={expense}
        periodLabel={periodLabel}
      />
      <button
        type="button"
        onClick={() => setViewExpenseModal(true)}
        className="w-full text-left"
      >
        <div className="flex items-center justify-between px-4 py-4 rounded-card bg-surface-elevated border border-border hover:border-primary transition-colors">
          <div className="flex items-center gap-3">
            <div
              className="w-[22px] h-[22px] rounded-full"
              style={{ backgroundColor: expense.color }}
            />
            <h4 className="capitalize">{expense.title}</h4>
          </div>
          <p>{currencyFormatter(typeof displayTotal === "number" ? displayTotal : expense.total)}</p>
        </div>
      </button>
    </>
  );
}

export default ExpenseCategoryItem;