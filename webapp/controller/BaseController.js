sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/core/UIComponent"
], function (Controller, History,UIComponent) {
    "use strict";

    return Controller.extend("sample.project1.controller.BaseController", {

        onNavProducts: function () {
            this.getOwnerComponent().getRouter().navTo("RouteView1");
        },

        onNavCategories: function () {
            this.getOwnerComponent().getRouter().navTo("RouteView2");
        },

        onNavSuppliers: function () {
            this.getOwnerComponent().getRouter().navTo("RouteView3");
        },

        onNavBack: function () {
                window.history.go(-1);
        }
    });
});
