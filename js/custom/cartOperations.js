var price = 0;
var total = 0;
//var cartquantity=0;
const cartOperations = {
    itemList: [],
    add(currentobject) {
        this.itemList.push(currentobject);
    },

    // calcQuantity(quantity){
    //    return cartquantity=quantity-1;
    // },

    calcPrice(totalprice) {
        return price = price + totalprice;
    },
    calcCartSubtotal(cartprice) {
        return total = cartprice + (cartprice * 0.1);
    },

    deleteItem() {
        return this.itemList.splice(0, this.itemList.length);
    }
}