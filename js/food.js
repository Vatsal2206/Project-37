class Food{
    constructor(){
        this.foodStock = 0;
        this.lastFed = 0;
    }

    getFoodStock(){
        return this.foodStock;      

    }

    updateFoodStock(foodStock){
        this.foodStock = foodStock
    }

    deductFood() {
        if(this.foodStock - 1){
            this.foodStock = this.foodStock - 1;
        }
    }

    bedroom(){
        background(bedroomI);

    }

    garden(){
        background(gardenI);

    }

    washroom(){
        background(washroomI);

    }

    livingroom(){
        background(livingroomI);

    }
      
}