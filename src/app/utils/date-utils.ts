export class DateUtils {

    public static getTodayDateString(): string {
        let today = new Date();
        let yyyy = today.getFullYear();
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let dd = String(today.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`; // Format: yyyy-mm-dd
    }
}