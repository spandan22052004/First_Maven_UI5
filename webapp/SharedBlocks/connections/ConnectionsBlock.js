sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend(
        "sample.project1.SharedBlocks.connections.ConnectionsBlock",
        {
            onEmployeeSelect: function (oEvent) {
                var oItem = oEvent.getParameter("listItem");
                var oContext = oItem.getBindingContext("ObjectPageModel");

                if (!oContext) {
                    return;
                }

                var oSelectedEmployeeModel = new JSONModel(
                    oContext.getObject()
                );

                this.getView().setModel(
                    oSelectedEmployeeModel,
                    "selectedEmployee"
                );
            }
        }
    );
});
