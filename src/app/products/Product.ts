export class Product {

    constructor (id: string, name: string, price: number, itemcount: number) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.itemcount = itemcount;
    }

    public getId(): string {
        return this.id;
    }
    public getName(): string {
        return this.name;
    }
    public getPrice(): number {
        return this.price;
    }
    public getItemCount(): number {
        return this.itemcount;
    }

    private id: string;
    private name: string;
    private price: number;
    private itemcount: number;

}