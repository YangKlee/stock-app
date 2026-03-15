export class Stock {
    favourite: boolean = false;
    // public name: string = "";
    // public code: string = "";
    // public price: number = 0;
    // public previousPrice: number = 0;
    constructor(public name: string, 
        public code: string, 
        public price: number, 
        public previousPrice: number,
        public isFavourite: boolean) {

    }
    isIncrease(): boolean
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
