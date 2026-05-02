import { item_db } from "../db/db.js";

class Item {
    #item_code;
    #item_name;
    #unit_price;
    #qty;

    constructor(item_code, item_name, unit_price, qty) {
        this.#item_code  = item_code;
        this.#item_name  = item_name;
        this.#unit_price = unit_price;
        this.#qty        = qty;
    }

    get item_code() {
        return this.#item_code;
    }

    get item_name() {
        return this.#item_name;
    }

    get unit_price() {
        return this.#unit_price;
    }

    get qty() {
        return this.#qty;
    }

    set item_code(v) {
        this.#item_code  = v;
    }

    set item_name(v) {
        this.#item_name  = v;
    }

    set unit_price(v) {
        this.#unit_price = v;
    }

    set qty(v) {
        this.#qty        = v;
    }
}

const addItemData = (item_code, item_name, unit_price, qty) => {
    item_db.push(new Item(item_code, item_name, unit_price, qty));
};

const getItemsData = () => {
    return item_db;
}

export {addItemData,getItemsData};


