// +core+
import dateFormat from 'dateformat';

const d = new Date();

// current month and next month entries for initial request to FB
export const startPoint = dateFormat(d, "yyyy-mm-");
export const endPoint = dateFormat(d.setMonth(d.getMonth() + 1), "yyyy-mm-");

// function to add + and - sign for transactions in Display
export function sumSign(sum) {
    return sum > 0 ? `+${sum}` : sum;
}

// function to add appropriate classes for negative and positive transactions
export function sumClass(sum) {
    return sum > 0 ? `trsPos` : `trsNeg`;
}