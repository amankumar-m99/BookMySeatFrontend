export class CookieData {

    public static setCookie(name: string, value: string) {
        const d = new Date();
        d.setTime(d.getTime() + (0.25 * 24 * 60 * 60 * 1000)); // 6 hrs
        let expires = "expires=" + d.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    public static getCookie(cname: string) {
        let name = cname + "=";
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    public static hasCookie(cookie: string): boolean {
        let result = this.getCookie(cookie);
        if (result === undefined || result == null) {
            return false;
        }
        return true;
    }

    public static deleteCookie(cookie: string): void {
        document.cookie = cookie + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
}