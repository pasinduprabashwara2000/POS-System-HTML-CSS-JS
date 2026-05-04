import { getCustomerDataById } from "../model/CustomerModel.js";
import { getItemDataById } from "../model/ItemModel.js";
import { placeOrder, getOrderDataById } from "../model/OrderModel.js";

export function initOrder() {
    let cart = [];

    const formatCurrency = (value) => Number(value).toFixed(2);

    const loadCartTable = () => {
        const $tbody = $("#order_cart_tbody");
        $tbody.empty();

        cart.forEach((item, index) => {
            const row = `
                <tr data-index="${index}" style="cursor:pointer;">
                    <td>${item.item_code}</td>
                    <td>${item.item_name}</td>
                    <td>${formatCurrency(item.unit_price)}</td>
                    <td>${item.qty}</td>
                    <td>${formatCurrency(item.unit_price * item.qty)}</td>
                </tr>
            `;
            $tbody.append(row);
        });

        const total = cart.reduce((sum, item) => sum + (item.unit_price * item.qty), 0);
        $("#order_total").text(formatCurrency(total));
    };

    const clearItemFields = () => {
        $("#order_item_code_input").val("");
        $("#order_item_qty_input").val("");
    };

    const clearOrderForm = () => {
        $("#order_id_input").val("");
        $("#order_customer_id_input").val("");
        $("#order_date_input").val(new Date().toISOString().slice(0, 10));
        clearItemFields();
        cart = [];
        loadCartTable();
    };

    $("#order_date_input").val(new Date().toISOString().slice(0, 10));
    loadCartTable();

    $(document).off("click", "#order_add_item_btn").on("click", "#order_add_item_btn", function () {
        const item_code = $("#order_item_code_input").val().trim();
        const qty = Number($("#order_item_qty_input").val().trim());
        const item = getItemDataById(item_code);

        if (!item) {
            Swal.fire({ icon: "error", title: "Item Not Found!" });
            return;
        }

        if (!Number.isInteger(qty) || qty <= 0) {
            Swal.fire({ icon: "error", title: "Invalid Qty!" });
            return;
        }

        const available_qty = Number(item.qty);
        const cart_item = cart.find(i => i.item_code === item_code);
        const requested_qty = qty + (cart_item ? cart_item.qty : 0);

        if (requested_qty > available_qty) {
            Swal.fire({ icon: "error", title: "Not Enough Stock!", text: `Available qty is ${available_qty}.` });
            return;
        }

        if (cart_item) {
            cart_item.qty = requested_qty;
        } else {
            cart.push({
                item_code: item.item_code,
                item_name: item.item_name,
                unit_price: Number(item.unit_price),
                qty: qty
            });
        }

        clearItemFields();
        loadCartTable();
    });

    $(document).off("click", "#order_cart_tbody tr").on("click", "#order_cart_tbody tr", function () {
        const index = Number($(this).data("index"));
        const selected_item = cart[index];

        if (selected_item) {
            $("#order_item_code_input").val(selected_item.item_code);
            $("#order_item_qty_input").val(selected_item.qty);
        }
    });

    $(document).off("click", "#order_remove_item_btn").on("click", "#order_remove_item_btn", function () {
        const item_code = $("#order_item_code_input").val().trim();
        const index = cart.findIndex(item => item.item_code === item_code);

        if (index === -1) {
            Swal.fire({ icon: "error", title: "Cart Item Not Found!" });
            return;
        }

        cart.splice(index, 1);
        clearItemFields();
        loadCartTable();
    });

    $(document).off("click", "#order_reset_btn").on("click", "#order_reset_btn", function () {
        clearOrderForm();
    });

    $(document).off("click", "#place_order_btn").on("click", "#place_order_btn", function () {
        const order_id = $("#order_id_input").val().trim();
        const customer_id = $("#order_customer_id_input").val().trim();
        const order_date = $("#order_date_input").val();

        if (!order_id) {
            Swal.fire({ icon: "error", title: "Invalid Order ID!" });
            return;
        }

        if (getOrderDataById(order_id)) {
            Swal.fire({ icon: "error", title: "Duplicate Order ID!" });
            return;
        }

        if (!getCustomerDataById(customer_id)) {
            Swal.fire({ icon: "error", title: "Customer Not Found!" });
            return;
        }

        if (!order_date) {
            Swal.fire({ icon: "error", title: "Invalid Order Date!" });
            return;
        }

        if (cart.length === 0) {
            Swal.fire({ icon: "error", title: "Cart Is Empty!" });
            return;
        }

        for (const cart_item of cart) {
            const item = getItemDataById(cart_item.item_code);

            if (!item || Number(item.qty) < cart_item.qty) {
                Swal.fire({ icon: "error", title: "Stock Changed!", text: `${cart_item.item_code} is no longer available in the requested qty.` });
                return;
            }
        }

        cart.forEach((cart_item) => {
            const item = getItemDataById(cart_item.item_code);
            item.qty = Number(item.qty) - cart_item.qty;
        });

        placeOrder(order_id, customer_id, order_date, cart);

        Swal.fire({ icon: "success", title: "Order Placed Successfully!" });
        clearOrderForm();
    });
}
