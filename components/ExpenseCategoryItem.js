import { useState } from "react";
import { currencyFormatter } from "@/lib/utils";

import ViewExpenseModal from "./modals/ViewExpenseModal";

function ExpenseCategoryItem({ expense, displayTotal, periodLabel }) {

    const [showViewExpenseModal, setViewExpenseModal]=useState(false);
    return (
        <>
        <ViewExpenseModal
        show={showViewExpenseModal} onClose={setViewExpenseModal}
        expense ={expense}
        periodLabel={periodLabel}
        
        />
        <button type="button" onClick={() => setViewExpenseModal(true)} className="w-full text-left">
            <div className="flex items-center justify-between px-4 py-4 bg-slate-700 rounded-3xl">
                <div className="flex items-center gap-2">
                    <div className="w-[25px] h-[25px] rounded-full" style={{ backgroundColor: expense.color }} />
                    <h4 className="capitalize">{expense.title}</h4>
                </div>
                <p>{currencyFormatter(typeof displayTotal === "number" ? displayTotal : expense.total)}</p>
            </div>
        </button>
        </>
    );
}

export default ExpenseCategoryItem;