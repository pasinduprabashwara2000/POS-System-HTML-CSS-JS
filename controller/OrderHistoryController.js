import { getOrdersData } from "../model/OrderModel.js";

export function initOrderHistory() {
    const formatCurrency = (value) => Number(value).toFixed(2);
    const $tbody = $("#order_history_tbody");
    $tbody.empty();

    getOrdersData().forEach((order) => {
        const row = `
            <tr>
                <td>${order.id}</td>
                <td>${order.customer_name}</td>
                <td>${order.date}</td>
                <td>Rs. ${formatCurrency(order.total)}</td>
            </tr>
        `;

        $tbody.append(row);
    });

    if (getOrdersData().length === 0) {
        $tbody.append(`
            <tr>
                <td colspan="4" class="text-center">No order history found.</td>
            </tr>
        `);
    }
}
