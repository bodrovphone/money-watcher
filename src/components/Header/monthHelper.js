// +core+
import dateFormat from 'dateformat';

const createListOfMonth = (t) => {
    const months = [];
    while (t) {
      months.push(dateFormat(new Date().setMonth(new Date().getMonth() - (t - 3)), "mmmm"));
      t--;
    }
    return months;
}

const ListOfMonth = createListOfMonth(5);
export default ListOfMonth; 