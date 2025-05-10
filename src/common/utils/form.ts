import { HexColorRegex } from '../constants'

export const inputType = (value: any): string => {
    if (typeof value === 'boolean') return 'checkbox'
    if (typeof value === 'number') return 'number'
    if (typeof value === 'string' && HexColorRegex.test(value)) return 'color'
    return 'text'
}

export const inputValue = (value: any, inputType: any): any => {
    if (inputType === 'number') return Number(value)
    return value
}