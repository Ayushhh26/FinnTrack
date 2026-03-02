import React from 'react';
import { render, screen } from '@testing-library/react';
import { financeContext } from '@/lib/store/finance-context';
import AddIncomeModal from '../AddIncomeModal';

jest.mock('@/lib/firebase', () => ({
  db: {},
  auth: {},
}));

const mockAddIncomeItem = jest.fn();
const mockRemoveIncomeItem = jest.fn();

const wrapper = ({ children }) => (
  <financeContext.Provider
    value={{ income: [], addIncomeItem: mockAddIncomeItem, removeIncomeItem: mockRemoveIncomeItem }}
  >
    {children}
  </financeContext.Provider>
);

describe('AddIncomeModal', () => {
  it('renders form fields when visible', () => {
    render(<AddIncomeModal show={true} onClose={jest.fn()} />, { wrapper });

    expect(screen.getByText(/Income Amount/i)).toBeInTheDocument();
    expect(screen.getByText(/Description/i)).toBeInTheDocument();
  });
});

