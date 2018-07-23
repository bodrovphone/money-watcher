// +core+
import dateFormat from 'dateformat';

const d = new Date();

export const startPoint = dateFormat(d, "yyyy-mm-");
export const endPoint = dateFormat(d.setMonth(d.getMonth() + 1), "yyyy-mm-");
