import { SetState } from './react'

export type OutletContext<T> = {
    settings: T
    updateSettings: SetState<T>,
    unit: number
}