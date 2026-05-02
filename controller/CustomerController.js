import { addCustomerData, updateCustomerData, deleteCustomerData, getCustomerData, getCustomerDataByIndex, getCustomerDataById } from "../model/CustomerModel.js";

// --------------------------- Phone Validation ---------------------------
const check_phone = (phone) => /^\d{7,15}$/.test(phone.trim());

// --------------------------- Load Customer Table ---------------------------
const loadCustomerTbl = () => {
    const $tbody = $("#customers_tbody");
    $tbody.empty();

    const customers = getCustomerData();
    $.each(customers, function (index, customer) {
        const row = `
            <tr data-index="${index}" style="cursor:pointer;">
                <td>${customer.id}</td>
                <td>${customer.name}</td>
                <td>${customer.address}</td>
                <td>${customer.contact}</td>
            </tr>`;
        $tbody.append(row);
    });
};

// --------------------------- Clear Form ---------------------------
const cleanCustomerForm = () => {
    $("#customer_id_input").val("");
    $("#customer_full_name_input").val("");
    $("#customer_address_input").val("");
    $("#customer_contact_number_input").val("");
};

// --------------------------- Main Init Function ---------------------------
export function initCustomer() {

    loadCustomerTbl();

    // Row Click
    $(document).on("click", "#customers_tbody tr", function () {
        const index = $(this).data("index");
        const customer = getCustomerDataByIndex(parseInt(index));
        if (customer) {
            $("#customer_id_input").val(customer.id);
            $("#customer_full_name_input").val(customer.name);
            $("#customer_address_input").val(customer.address);
            $("#customer_contact_number_input").val(customer.contact);
        }
    });

    // Reset
    $(document).on("click", "#customer_reset_btn", function () {
        cleanCustomerForm();
    });

    // Save
    $(document).on("click", "#customer_save_btn", function () {
        const id      = $("#customer_id_input").val().trim();
        const name    = $("#customer_full_name_input").val().trim();
        const address = $("#customer_address_input").val().trim();
        const contact = $("#customer_contact_number_input").val().trim();

        if (!id)                          { Swal.fire({ icon: "error", title: "Invalid ID!" }); return; }
        if (getCustomerDataById(id))      { Swal.fire({ icon: "error", title: "Duplicate ID!" }); return; }
        if (!name)                        { Swal.fire({ icon: "error", title: "Invalid Name!" }); return; }
        if (!address)                     { Swal.fire({ icon: "error", title: "Invalid Address!" }); return; }
        if (!check_phone(contact))        { Swal.fire({ icon: "error", title: "Invalid Contact!", text: "Use 7–15 digits only." }); return; }

        addCustomerData(id, name, address, contact);
        Swal.fire({ icon: "success", title: "Customer Saved Successfully" });
        cleanCustomerForm();
        loadCustomerTbl();
    });

    // Update
    $(document).on("click", "#customer_update_btn", function () {
        const id      = $("#customer_id_input").val().trim();
        const name    = $("#customer_full_name_input").val().trim();
        const address = $("#customer_address_input").val().trim();
        const contact = $("#customer_contact_number_input").val().trim();

        if (!getCustomerDataById(id)) { Swal.fire({ icon: "error", title: "Customer Not Found!" }); return; }
        if (!name)                    { Swal.fire({ icon: "error", title: "Invalid Name!" }); return; }
        if (!address)                 { Swal.fire({ icon: "error", title: "Invalid Address!" }); return; }
        if (!check_phone(contact))    { Swal.fire({ icon: "error", title: "Invalid Contact!", text: "Use 7–15 digits only." }); return; }

        updateCustomerData(id, name, address, contact);
        Swal.fire({ icon: "success", title: "Customer Updated Successfully" });
        cleanCustomerForm();
        loadCustomerTbl();
    });

    // Delete
    $(document).on("click", "#customer_delete_btn", function () {
        const id = $("#customer_id_input").val().trim();

        if (!getCustomerDataById(id)) { Swal.fire({ icon: "error", title: "Customer Not Found!" }); return; }

        Swal.fire({
            title: "Are you sure?", text: "Delete this customer?",
            icon: "warning", showCancelButton: true, confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteCustomerData(id);
                Swal.fire({ icon: "success", title: "Customer Deleted Successfully" });
                cleanCustomerForm();
                loadCustomerTbl();
            }
        });
    });
}
