export class Stock {
    favourite: boolean = false;
    // public name: string = "";
    // public code: string = "";
    // public price: number = 0;
    // public previousPrice: number = 0;
    public isFavourite: boolean = false;
    constructor(
        public id: number,
        public name: string, 
        public code: string, 
        public price: number, 
        public previousPrice: number,
        public exchange: string) {

    }
    public isIncrease(): boolean
    {
        return this.price > this.previousPrice;
    }
    chenhLech(): number
    {
        return this.price - this.previousPrice;
    }
    addFavourite(): void {
        this.favourite = true;
    }
    removeFavourite(): void {
        this.favourite = false;
    }


}
