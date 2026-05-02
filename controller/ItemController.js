import { addItemData, getItemsData} from "../model/ItemModel.js";

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
                </tr>`;
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
        if (item) {
            $("#item_code_input").val(item.item_code);
            $("#item_name_input").val(item.item_name);
            $("#item_unit_price_input").val(item.unit_price);
            $("#item_qty_input").val(item.qty);
        }
    });

    // Reset
    $(document).on("click", "#item_reset_btn", function () {
        clearItems();
    });

    // Save
    $(document).on("click", "#item_save_btn", function () {
        const code = $("#item_code_input").val().trim();
        const name = $("#item_name_input").val().trim();
        const price = $("#item_unit_price_input").val().trim();
        const qty = $("#item_qty_input").val().trim();

        addItemData(code, name, price, qty);
        Swal.fire({icon: "success", title: "Item Saved Successfully"});
        clearItems();
        loadItemTable();
    });

}
