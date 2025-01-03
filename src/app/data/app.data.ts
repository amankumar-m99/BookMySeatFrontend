export class AppData{
    public static baseUrl = "http://localhost:8080";

    public static logIn(userId: string, role: string): void {
        localStorage.setItem('userId', userId);
        localStorage.setItem('role', role);
    }

    public static isLoggedIn(): boolean {
        if (localStorage.getItem('userId')) {
            return true;
        }
        return false;
    }

    public static logout(): void {
        localStorage.removeItem('userId');
        localStorage.removeItem('role');
    }

}