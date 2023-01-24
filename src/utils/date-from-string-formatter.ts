export const dateFromStringFormatter = (date: string) => {
    const dateType = new Date(date)
    const formatter = new Intl.DateTimeFormat('en-Us', { month: 'long', day: 'numeric', year: 'numeric' })
    return formatter.format(dateType)
}