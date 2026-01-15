sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("sample.project1.controller.BaseController", {

        getRouter: function () {
            return this.getOwnerComponent().getRouter();
        },
        navTo: function (sRouteName, oParams) {
            this.getRouter().navTo(sRouteName, oParams || {});
        },


        onBack: function () {
            console.log("On nav back trigerred!");
            window.history.go(-1);
        }
    });
});
