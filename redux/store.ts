import { configureStore } from '@reduxjs/toolkit'
import dashboardReducer from './features/dashboardSlice'
import transactionReducer from './features/transactions/transactionSlice'

const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    transactions: transactionReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export { store }
