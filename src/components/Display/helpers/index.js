export function sumSign(sum) {
    return sum > 0 ? `+${sum}` : sum;
}

export function sumClass(sum) {
    return sum > 0 ? `trsPos` : `trsNeg`;
}