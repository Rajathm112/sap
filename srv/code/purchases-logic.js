/**
 * @On(event = { "CREATE" }, entity = "myprojectSrv.Purchases")
 * @param {Object} request - User information, tenant-specific CDS model, headers and query parameters
 */
module.exports = async function(request) {
    const { Purchases, Customers } = cds.entities;

    // Calculate reward points as one tenth of the purchase value
    const rewardPoints = Math.floor(request.data.purchaseValue / 10);
    request.data.rewardPoints = rewardPoints;

    // Retrieve the related customer
    const customer = await SELECT.one.from(Customers).where({ ID: request.data.customer_ID });

    if (customer) {
        // Update the total purchase value and total reward points for the customer
        const updatedCustomer = {
            totalPurchaseValue: (customer.totalPurchaseValue || 0) + request.data.purchaseValue,
            totalRewardPoints: (customer.totalRewardPoints || 0) + rewardPoints
        };

        // Update the customer record
        await UPDATE(Customers).set(updatedCustomer).where({ ID: customer.ID });
    } else {
        console.error('Customer not found for the given ID:', request.data.customer_ID);
    }
}