sap.ui.define([], function () {
    "use strict";

    return {

        statusText: function (sStatus) {
            return sStatus === "A" ? "Active" : "Inactive";
        },

        statusState: function (sStatus) {
            return sStatus === "A" ? "Success" : "Error";
        },

        amountFormat: function (fAmount) {
            return fAmount ? fAmount.toFixed(2) : "0.00";
        }

    };
});
