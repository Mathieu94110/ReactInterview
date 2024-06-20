import { ReactNode } from "react"

function formatNumber(number: number): ReactNode {
    // Use the toLocaleString method to add suffixes to the number
    return number.toLocaleString('en-US', {
        // add suffixes for thousands, millions, and billions
        // specify the abbreviations to use for the suffixes
        notation: 'compact',
        compactDisplay: 'short'
    })
}

export { formatNumber }