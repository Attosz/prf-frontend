export class User {

    constructor (id: string, username: string, email: string,
                 wallet: number, accessLevel: string) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.wallet = wallet;
        this.accessLevel = accessLevel;
    }

    public getId(): string {
        return this.id;
    }
    public getUserName(): string {
        return this.username;
    }
    public getEmail(): string {
        return this.email;
    }
    public getWallet(): number {
        return this.wallet;
    }
    public getAccessLevel(): string {
        return this.accessLevel;
    }

    private id: string;
    private username: string;
    private email: string;
    private wallet: number;
    private accessLevel: string;
}