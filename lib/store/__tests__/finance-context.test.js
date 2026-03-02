import React from 'react';
import { act, renderHook } from '@testing-library/react';
import { addDoc } from 'firebase/firestore';
import FinanceContextProvider, { financeContext } from '../finance-context';

jest.mock('@/lib/firebase', () => ({
  db: {},
  auth: {},
}));

jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  addDoc: jest.fn(),
  deleteDoc: jest.fn(),
  getDocs: jest.fn().mockResolvedValue({
    docs: [],
  }),
  updateDoc: jest.fn(),
  doc: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
}));

jest.mock('../auth-context', () => {
  const React = require('react');
  const authContext = React.createContext({ user: { uid: 'test-user' } });
  const AuthContextProvider = ({ children }) => (
    <authContext.Provider value={{ user: { uid: 'test-user' } }}>
      {children}
    </authContext.Provider>
  );
  return { authContext, default: AuthContextProvider };
});

describe('FinanceContextProvider', () => {
  it('adds income items locally when addIncomeItem is called', async () => {
    const wrapper = ({ children }) => <FinanceContextProvider>{children}</FinanceContextProvider>;

    const { result } = renderHook(() => React.useContext(financeContext), { wrapper });

    const newIncome = { amount: 100, description: 'Test income', createdAt: new Date(), uid: 'user-1' };
    addDoc.mockResolvedValueOnce({ id: 'income-1' });

    await act(async () => {
      await result.current.addIncomeItem(newIncome);
    });

    expect(result.current.income).toHaveLength(1);
    expect(result.current.income[0]).toMatchObject({
      id: 'income-1',
      amount: 100,
      description: 'Test income',
    });
  });

  it('removes income items and updates totals correctly', async () => {
    const wrapper = ({ children }) => <FinanceContextProvider>{children}</FinanceContextProvider>;
    const { result } = renderHook(() => React.useContext(financeContext), { wrapper });

    const firstIncome = { amount: 100, description: 'First', createdAt: new Date(), uid: 'user-1' };
    const secondIncome = { amount: 50, description: 'Second', createdAt: new Date(), uid: 'user-1' };

    addDoc.mockResolvedValueOnce({ id: 'income-1' });
    await act(async () => {
      await result.current.addIncomeItem(firstIncome);
    });

    addDoc.mockResolvedValueOnce({ id: 'income-2' });
    await act(async () => {
      await result.current.addIncomeItem(secondIncome);
    });

    expect(result.current.income.map((i) => i.amount)).toEqual([100, 50]);

    await act(async () => {
      await result.current.removeIncomeItem('income-1');
    });

    expect(result.current.income).toHaveLength(1);
    expect(result.current.income[0]).toMatchObject({
      id: 'income-2',
      amount: 50,
    });
  });

  it('creates expense categories and keeps their initial totals', async () => {
    const wrapper = ({ children }) => <FinanceContextProvider>{children}</FinanceContextProvider>;
    const { result } = renderHook(() => React.useContext(financeContext), { wrapper });

    const category = { title: 'Food', color: '#ff0000', total: 0 };
    addDoc.mockResolvedValueOnce({ id: 'cat-1' });

    await act(async () => {
      await result.current.addCategory(category);
    });

    expect(result.current.expenses).toHaveLength(1);
    expect(result.current.expenses[0]).toMatchObject({
      id: 'cat-1',
      title: 'Food',
      color: '#ff0000',
      total: 0,
    });
  });

  it('adds and removes expense items while keeping category totals in sync', async () => {
    const wrapper = ({ children }) => <FinanceContextProvider>{children}</FinanceContextProvider>;
    const { result } = renderHook(() => React.useContext(financeContext), { wrapper });

    const baseCategory = { title: 'Groceries', color: '#00ff00', total: 0 };
    addDoc.mockResolvedValueOnce({ id: 'cat-1' });

    await act(async () => {
      await result.current.addCategory(baseCategory);
    });

    const categoryId = 'cat-1';
    const expenseItem = {
      amount: 150,
      createdAt: new Date(),
      id: 'item-1',
    };

    const updatedCategory = {
      ...baseCategory,
      total: 150,
      items: [expenseItem],
    };

    await act(async () => {
      await result.current.addExpenseItem(categoryId, updatedCategory);
    });

    expect(result.current.expenses[0]).toMatchObject({
      id: categoryId,
      total: 150,
    });
    expect(result.current.expenses[0].items).toHaveLength(1);
    expect(result.current.expenses[0].items[0].amount).toBe(150);

    const afterDelete = {
      items: [],
      total: 0,
    };

    await act(async () => {
      await result.current.deleteExpenseItem(afterDelete, categoryId);
    });

    expect(result.current.expenses[0].total).toBe(0);
    expect(result.current.expenses[0].items).toHaveLength(0);
  });

  it('deletes an entire expense category', async () => {
    const wrapper = ({ children }) => <FinanceContextProvider>{children}</FinanceContextProvider>;
    const { result } = renderHook(() => React.useContext(financeContext), { wrapper });

    const rentCategory = { title: 'Rent', color: '#123456', total: 1000 };
    const funCategory = { title: 'Fun', color: '#abcdef', total: 200 };

    addDoc.mockResolvedValueOnce({ id: 'cat-rent' });
    await act(async () => {
      await result.current.addCategory(rentCategory);
    });

    addDoc.mockResolvedValueOnce({ id: 'cat-fun' });
    await act(async () => {
      await result.current.addCategory(funCategory);
    });

    expect(result.current.expenses.map((e) => e.id)).toEqual(['cat-rent', 'cat-fun']);

    await act(async () => {
      await result.current.deleteExpenseCategory('cat-rent');
    });

    expect(result.current.expenses).toHaveLength(1);
    expect(result.current.expenses[0].id).toBe('cat-fun');
  });
});

