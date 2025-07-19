
export const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    })
}

export const formatCurrency = (amount: number | string) => {
    return `₱${Number.parseFloat(amount.toString()).toLocaleString("en-US", { minimumFractionDigits: 2 })}`
}