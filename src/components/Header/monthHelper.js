// +core+
import dateFormat from 'dateformat';

// two functions are intended to create startPoint and endPoint to make the approrpiate request to firebase 
const createListOfMonth = (t) => {
    const months = [];
    while (t) {
      months.push(dateFormat(new Date().setMonth(new Date().getMonth() - (t - 3)), "mmmm"));
      t--;
    }
    return months;
}

export const filterByMonth = (num) => {
        var d = new Date();
        var delta = [-2, -1, 0, 1, 2];
        var item = delta[num]
        var startPoint = dateFormat(new Date().setMonth(d.getMonth() + item), "yyyy-mm-");
        var endPoint = dateFormat(new Date().setMonth(d.getMonth() + item + 1), "yyyy-mm-");
        return {startPoint, endPoint};
}

export const ListOfMonth = createListOfMonth(5);