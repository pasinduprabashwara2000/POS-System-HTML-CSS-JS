import { initCustomer } from "../../controller/CustomerController.js";
import { initItem } from "../../controller/ItemController.js";

const pages = {
    customers: "view/customer.html",
    items: "view/item.html"
};

$(document).on("click", ".navigation-menu a", function (e) {
    e.preventDefault();
    const page = $(this).data("page");

    if (!pages[page]) {
        Swal.fire({ icon: "info", title: "Coming Soon!", text: "This section is not available yet." });
        return;
    }

    $("#content-area").load(pages[page], function () {
        if (page === "customers") initCustomer();
        if (page === "items") initItem();
    });
});
