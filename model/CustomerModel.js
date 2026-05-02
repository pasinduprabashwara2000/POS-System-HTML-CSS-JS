import { customer_db } from "../db/db.js";

class Customer {
    #id;
    #name;
    #address;
    #contact;

    constructor(id, name, address, contact) {
        this.#id = id;
        this.#name = name;
        this.#address = address;
        this.#contact = contact;
    }

    get id() {
        return this.#id;
    }

    get name() {
        return this.#name;
    }

    get address() {
        return this.#address;
    }

    get contact() {
        return this.#contact;
    }

    set id(v) {
        this.#id = v;
    }

    set name(v) {
        this.#name = v;
    }

    set address(v) {
        this.#address = v;
    }

    set contact(v) {
        this.#contact = v;
    }
}

const addCustomerData = (id, name, address, contact) => {
    customer_db.push(new Customer(id, name, address, contact));
};

const updateCustomerData = (id, name, address, contact) => {
    const obj = getCustomerDataById(id);

    if (obj) {
        obj.name = name;
        obj.address = address;
        obj.contact = contact;
    }
};

const deleteCustomerData = (id) => {
    const index = customer_db.findIndex(c => c.id === id);

    if (index !== -1) {
        customer_db.splice(index, 1);
    }
};

const getCustomerData = () => {
    return customer_db;
}

const getCustomerDataByIndex = (index) => {
    return customer_db[index];
}

const getCustomerDataById = (id) => {
    return customer_db.find(c => c.id === id);
}

export {addCustomerData, updateCustomerData, deleteCustomerData, getCustomerData, getCustomerDataByIndex, getCustomerDataById};