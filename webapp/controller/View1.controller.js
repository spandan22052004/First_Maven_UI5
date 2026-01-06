sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sample/project1/model/formatter",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment"
], function (Controller, formatter, MessageToast,Fragment) {
    "use strict";

    return Controller.extend("sample.project1.controller.View1", {

        formatter: formatter,

        onInit: function () {
            var oModel = this.getOwnerComponent().getModel("appModel");
            var sStatus = oModel.getProperty("/status");

            var sText = formatter.statusText(sStatus);
            console.log("Formatted Status:", sText);
        },

        onShowStatus: function () {
            var oModel = this.getOwnerComponent().getModel("appModel");
            var sStatus = oModel.getProperty("/status");

            MessageToast.show(formatter.statusText(sStatus));
        },


        // ------------------------------valuehelp------------------------------------------------
        onValueHelp: function () {
            if (!this._oDialog) {
                Fragment.load({
                    name: "sample.project1.view.ValueHelp",
                    controller: this
                }).then(function (oDialog) {
                    this._oDialog = oDialog;
                    this.getView().addDependent(oDialog);
                    oDialog.open();
                }.bind(this));
            } else {
                this._oDialog.open();
            }
        },
         onValueSelected: function (oEvent) {
            var oItem = oEvent.getParameter("selectedItem");
            if (!oItem) {
                return;
            }
            this.byId("myInput").setValue(oItem.getTitle());
        },
         onAdd: function () {
            var sValue = this.byId("myInput").getValue();
            if (!sValue) {
                return;
            }

            var oModel = this.getOwnerComponent().getModel("appModel");
            var aSelected = oModel.getProperty("/selected");

            aSelected.push({ name: sValue });
            oModel.setProperty("/selected", aSelected);

            this.byId("myInput").setValue("");
        }
    });
});
