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
});

