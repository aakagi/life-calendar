// NOTE: Pattern from https://github.com/vercel/next.js/blob/main/examples/with-zustand/lib/store.js

import { useLayoutEffect } from 'react'
import create from 'zustand'
import type { UseBoundStore } from 'zustand'
import createContext from 'zustand/context'

const initialState = {
  lastUpdate: 0,
  light: false,
  count: 0,
}

type StoreState = typeof initialState

let store: UseBoundStore<StoreState>

const zustandContext = createContext<StoreState>()
export const ZustandProvider = zustandContext.Provider
export const useStore = zustandContext.useStore

export const initializeStore = (preloadedState = {}) => {
  return create<StoreState>((set, get) => ({
    ...initialState,
    ...preloadedState,
    tick: (lastUpdate, light) => {
      set({
        lastUpdate,
        light: !!light,
      })
    },
    increment: () => {
      set({
        count: get().count + 1,
      })
    },
    decrement: () => {
      set({
        count: get().count - 1,
      })
    },
    reset: () => {
      set({
        count: initialState.count,
      })
    },
  }))
}

// export function useSideBarCalendars

export function useCreateStore(preloadedState: StoreState) {
  // For SSR & SSG, always use a new store.
  if (typeof window === 'undefined') {
    return () => initializeStore(preloadedState)
  }

  // For CSR, always re-use same store.
  store = store ?? initializeStore(preloadedState)

  // And if preloadedState changes, then merge states in the next render cycle.
  useLayoutEffect(() => {
    if (preloadedState) {
      store.setState({
        ...store.getState(),
        ...preloadedState,
      })
    }
  }, [preloadedState])

  return () => store
}
