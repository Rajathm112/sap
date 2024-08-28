sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'myproject/purcahses/test/integration/FirstJourney',
		'myproject/purcahses/test/integration/pages/PurchasesList',
		'myproject/purcahses/test/integration/pages/PurchasesObjectPage'
    ],
    function(JourneyRunner, opaJourney, PurchasesList, PurchasesObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('myproject/purcahses') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onThePurchasesList: PurchasesList,
					onThePurchasesObjectPage: PurchasesObjectPage
                }
            },
            opaJourney.run
        );
    }
);