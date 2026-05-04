import { initCustomer } from "../../controller/CustomerController.js";
import { initItem } from "../../controller/ItemController.js";
import { initOrder } from "../../controller/OrderController.js";
import { initOrderHistory } from "../../controller/OrderHistoryController.js";

const pages = {
    customers: "view/customer.html",
    items: "view/item.html",
    orders: "view/order.html",
    orderHistory: "view/order-history.html"
};

const loadPage = (page) => {
    if (!pages[page]) {
        Swal.fire({ icon: "info", title: "Coming Soon!", text: "This section is not available yet." });
        return;
    }

    $("#content-area").load(pages[page], function () {
        if (page === "customers") {
            initCustomer();
        }

        if (page === "items") {
            initItem();
        }

        if (page === "orders") {
            initOrder();
        }

        if (page === "orderHistory") {
            initOrderHistory();
        }

    });
};

$(document).on("click", ".navigation-menu a", function (e) {
    e.preventDefault();
    loadPage($(this).data("page"));
});

$(document).on("click", "#order_history_btn", function () {
    loadPage("orderHistory");
});

$(document).on("click", "#back_to_order_btn", function () {
    loadPage("orders");
});
