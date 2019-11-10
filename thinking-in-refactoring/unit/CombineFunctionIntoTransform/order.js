
/** original */
const orderData = orderString.split(/\s+/);
const productionPrice = priceList[orderData[0].split('-')[1]];
const orderPrice = parseInt(orderData[1]) * productionPrice;

/** refactoring */
const orderRecord = parseOrder(order);
const orderPrice = price(orderRecord, priceList);

function parseOrder(aString) {
    const values = aString.split(/\s+/);
    return ({
        productID: values[0].split('-')[1],
        quantity: parseInt(values[1])
    })
}
function price(order, priceList) {
    return order.quantity * priceList[order.productID];
}

