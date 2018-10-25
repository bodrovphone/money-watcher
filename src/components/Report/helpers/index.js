export default function getSumOfTransactions(transactions) {
    return transactions.reduce((sum, current) => Number(sum) + Number(current.sum), 0);
}