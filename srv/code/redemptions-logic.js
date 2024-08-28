/**
 * @On(event = { "CREATE" }, entity = "myprojectSrv.Redemptions")
 * @param {Object} request - User information, tenant-specific CDS model, headers and query parameters
 */
module.exports = async function(request) {
    const { Redemptions, Customers } = cds.entities;

    // Extract the customer ID and redeemed amount from the request payload
    const { customer_ID, redeemedAmount } = request.data;

    if (customer_ID === undefined || redeemedAmount === undefined) {
        request.reject(400, "Missing required fields: customer_ID or redeemedAmount");
        return;
    }

    // Retrieve the current total reward points and total redeemed reward points for the customer
    const customer = await SELECT.one.from(Customers)
        .where({ ID: customer_ID })
        .columns(['totalRewardPoints', 'totalRedeemedRewardPoints']);

    if (!customer) {
        request.reject(404, `Customer with ID ${customer_ID} not found`);
        return;
    }

    // Check if the customer has enough reward points to redeem
    if (customer.totalRewardPoints < redeemedAmount) {
        request.reject(400, "Insufficient reward points to redeem the specified amount");
        return;
    }

    // Calculate the new total reward points and total redeemed reward points
    const newTotalRewardPoints = customer.totalRewardPoints - redeemedAmount;
    const newTotalRedeemedRewardPoints = customer.totalRedeemedRewardPoints + redeemedAmount;

    // Update the customer's reward points
    await UPDATE(Customers)
        .set({
            totalRewardPoints: newTotalRewardPoints,
            totalRedeemedRewardPoints: newTotalRedeemedRewardPoints
        })
        .where({ ID: customer_ID });
};