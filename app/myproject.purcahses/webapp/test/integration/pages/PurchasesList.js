sap.ui.define(['sap/fe/test/ListReport'], function(ListReport) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ListReport(
        {
            appId: 'myproject.purcahses',
            componentId: 'PurchasesList',
            contextPath: '/Purchases'
        },
        CustomPageDefinitions
    );
});