import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  createSelector,
} from '@reduxjs/toolkit'
import { RootState } from '../../store'

interface Transaction {
  id: string
  amount: string
  type: string
  date: string
  time: string
  accountType: string
  status: boolean
}

interface DateRange {
  from: string | null // Store as ISO string
  to: string | null // Store as ISO string
}

interface TransactionState {
  transactions: Transaction[]
  loading: boolean
  error: string | null
  selectedAccount: string
  dateRange: DateRange
}

const initialState: TransactionState = {
  transactions: [],
  loading: false,
  error: null,
  selectedAccount: 'all',
  dateRange: {
    from: null,
    to: null,
  },
}

export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async ({
    accountType,
    dateRange,
  }: {
    accountType?: string
    dateRange?: { from: Date | null; to: Date | null }
  }) => {
    try {
      const response = await fetch(
        'https://678007010476123f76a941fe.mockapi.io/api/v1/transactions'
      )
      if (!response.ok) {
        throw new Error('Failed to fetch transactions')
      }
      const data = await response.json()
      return data
    } catch (error) {
      throw error
    }
  }
)

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setSelectedAccount: (state, action: PayloadAction<string>) => {
      state.selectedAccount = action.payload
    },
    setDateRange: (
      state,
      action: PayloadAction<{ from: Date | null; to: Date | null }>
    ) => {
      // Convert Date objects to ISO strings before storing in state
      state.dateRange = {
        from: action.payload.from?.toISOString() || null,
        to: action.payload.to?.toISOString() || null,
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false
        state.transactions = action.payload
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch transactions'
      })
  },
})

export const { setSelectedAccount, setDateRange } = transactionSlice.actions

export const selectTransactions = (state: RootState) =>
  state.transactions.transactions
export const selectTransactionsLoading = (state: RootState) =>
  state.transactions.loading
export const selectTransactionsError = (state: RootState) =>
  state.transactions.error
export const selectSelectedAccount = (state: RootState) =>
  state.transactions.selectedAccount

// Memoized selectors
const selectDateRangeState = (state: RootState) => state.transactions.dateRange

export const selectDateRange = createSelector(
  [selectDateRangeState],
  (dateRange) => ({
    from: dateRange.from ? new Date(dateRange.from) : null,
    to: dateRange.to ? new Date(dateRange.to) : null,
  })
)

export const transactionsReducer = transactionSlice.reducer
export default transactionSlice.reducer
