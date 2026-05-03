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

const updateItemData = (item_code, item_name, unit_price, qty) => {
    const obj = getItemDataById(item_code);

    if(obj) {
        obj.item_name = item_name;
        obj.unit_price = unit_price;
        obj.qty = qty;
    }
};

const deleteItemData = (item_code) => {
    const index = item_db.findIndex(i => i.item_code === item_code);

    if (index !== -1){
        item_db.splice(index,1);
    }
};

const getItemsData = () => {
    return item_db;
}

const getItemDataById = (item_code) => {
    return item_db.find(i => i.item_code === item_code);
}

export {addItemData,updateItemData,getItemsData,getItemDataById,deleteItemData};


