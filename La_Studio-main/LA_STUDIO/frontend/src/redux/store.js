import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/CounterSlide'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
}) 