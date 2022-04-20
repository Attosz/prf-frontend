export class Order {

    constructor (id: string, username: string, productname: string,
                 itemcount: number, status: string, iscompleated: boolean) {
        this.id = id;
        this.username = username;
        this.productname = productname;
        this.itemcount = itemcount;
        this.status = status;
        this.iscompleated = iscompleated;
    }

    public getId(): string {
        return this.id;
    }
    public getUserName(): string {
        return this.username;
    }
    public getProductName(): string {
        return this.productname;
    }
    public getItemCount(): number {
        return this.itemcount;
    }
    public getStatus(): string {
        return this.status;
    }
    public isCompleated(): boolean {
        return this.iscompleated;
    }

    private id: string;
    private username: string;
    private productname: string;
    private itemcount: number;
    private status: string;
    private iscompleated: boolean;

}