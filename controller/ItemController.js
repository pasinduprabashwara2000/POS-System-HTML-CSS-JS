import {addItemData, updateItemData, deleteItemData, getItemDataById, getItemsData} from "../model/ItemModel.js";

export function initItem() {

    // Load Table
    const loadItemTable = () => {
        const $tbody = $("#item_tbody");
        $tbody.empty();

        $.each(getItemsData(), function (index, item) {
            const row = `
                <tr data-index="${index}" style="cursor:pointer;">
                    <td>${item.item_code}</td>
                    <td>${item.item_name}</td>
                    <td>${item.unit_price}</td>
                    <td>${item.qty}</td>
                </tr>
            `;
            $tbody.append(row);
        });
    };

    // Clear Form
    const clearItems = () => {
        $("#item_code_input").val("");
        $("#item_name_input").val("");
        $("#item_unit_price_input").val("");
        $("#item_qty_input").val("");
    };

    loadItemTable();

    // Row Click
    $(document).on("click", "#item_tbody tr", function () {
        const index = $(this).data("index");
        const item = getItemsData()[index];

        $("#item_code_input").val(item.item_code);
        $("#item_name_input").val(item.item_name);
        $("#item_unit_price_input").val(item.unit_price);
        $("#item_qty_input").val(item.qty);
    });

    // Reset
    $(document).on("click", "#item_reset_btn", function () {
        clearItems();
    });

    // Save
    $(document).on("click", "#item_save_btn", function () {

        const item_code = $("#item_code_input").val().trim();
        const item_name = $("#item_name_input").val().trim();
        const unit_price = $("#item_unit_price_input").val().trim();
        const qty = $("#item_qty_input").val().trim();

        if (!item_code) {
            Swal.fire("Error", "Invalid Code!", "error");
            return;
        }

        if (!item_name) {
            Swal.fire("Error", "Invalid Name!", "error");
            return;
        }

        if (!unit_price || isNaN(unit_price)) {
            Swal.fire("Error", "Invalid Price!", "error");
            return;
        }

        if (!qty || isNaN(qty)) {
            Swal.fire("Error", "Invalid Qty!", "error");
            return;
        }

        addItemData(item_code, item_name, unit_price, qty);

        Swal.fire("Success", "Item Saved Successfully!", "success");

        clearItems();
        loadItemTable();
    });

    // Update
    $(document).on("click", "#item_update_btn", function () {

        const item_code = $("#item_code_input").val().trim();
        const item_name = $("#item_name_input").val().trim();
        const unit_price = $("#item_unit_price_input").val().trim();
        const qty = $("#item_qty_input").val().trim();

        if (!getItemDataById(item_code)) {
            Swal.fire("Error", "Item Not Found!", "error");
            return;
        }

        if (!item_name) {
            Swal.fire("Error", "Invalid Name!", "error");
            return;
        }

        if (!unit_price || isNaN(unit_price)) {
            Swal.fire("Error", "Invalid Price!", "error");
            return;
        }

        if (!qty || isNaN(qty)) {
            Swal.fire("Error", "Invalid Qty!", "error");
            return;
        }

        updateItemData(item_code, item_name, unit_price, qty);

        Swal.fire("Success", "Item Updated Successfully!", "success");

        clearItems();
        loadItemTable();
    });

    //Delete
    $(document).on("click", "#item_delete_btn", function () {
        const item_code = $('#item_code_input').val().trim();

        if(!getItemDataById(item_code)) {
            Swal.fire({ icon: "error", title: "Item Not Found!" });
            return;
        }

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed)
                deleteItemData(item_code);
                Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
            clearItems();
            loadItemTable();
        });

    });


}