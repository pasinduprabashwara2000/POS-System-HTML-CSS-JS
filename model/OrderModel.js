import {order_db} from "../db/db.js";
import {order_item_db} from "../db/db.js";

class Order{
    #id;
    #customer_name;
    #date;
    #total

    constructor(id,customer_name,date,total) {
        this.#id = id;
        this.#customer_name = customer_name;
        this.#date = date;
        this.#total = total;
    }

    get id(){
        return this.#id;
    }

    get customer_name(){
        return this.#customer_name;
    }

    get date(){
        return this.#date;
    }

    get total(){
        return this.#total;
    }

    set id(id) {
        return this.#id = id;
    }

    set customer_name(customer_name){
        return this.#customer_name = customer_name;
    }

    set date(date){
        return this.#date = date;
    }

    set total(total){
        return this.#total = total;
    }

}

class Oder_Item{
    #order_id;
    #item_code;
    #qty;
    #unit_price;
    #subtotal;

    constructor(order_id,item_code,qty,unit_price) {
        this.#order_id = order_id;
        this.#item_code = item_code;
        this.#qty = qty;
        this.#unit_price = unit_price;
        this.#subtotal = this.#unit_price*this.#qty;
    }

    get order_id(){
        return this.#order_id;
    }

    get item_code(){
        return this.#item_code;
    }

    get qty(){
        return this.#qty;
    }

    get unit_price(){
        return this.#unit_price;
    }

    get total(){
        return this.#subtotal;
    }

    set order_id(order_id){
        return this.#order_id = order_id;
    }

    set item_code(item_code){
        return this.#item_code = item_code;
    }

    set qty(qty){
        return this.#qty = qty;
    }

    set unit_price(unit_price){
        return this.#unit_price = unit_price;
    }

    set sub_total(sub_total){
        return this.#subtotal = sub_total;
    }

}

const placeOrder = (id, customer_id, date, cart_items) => {
    const total = cart_items.reduce((sum, item) => sum + (Number(item.unit_price) * Number(item.qty)), 0);
    const order = new Order(id, customer_id, date, total);

    order_db.push(order);

    cart_items.forEach((item) => {
        const order_item = new Oder_Item(id, item.item_code, Number(item.qty), Number(item.unit_price));
        order_item_db.push(order_item);
    });

    return order;
};

const getOrdersData = () => {
    return order_db;
};

const getOrderItemsData = () => {
    return order_item_db;
};

const getOrderDataById = (id) => {
    return order_db.find(order => order.id === id);
};

export {placeOrder, getOrdersData, getOrderItemsData, getOrderDataById};

