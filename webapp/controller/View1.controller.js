sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel"
], (Controller, MessageBox, JSONModel) => {
    "use strict";

    return Controller.extend("sample.project1.controller.View1", {
        onInit() {
            // MessageBox.success("OnInit");
            // let oData = {
            //     "name": "Spandan"
            // }
            // let oModel = new JSONModel(oData);
            // this.getView().setModel(oModel, "model1");
        },
        // onBeforeRendering(){
        //     MessageBox.success("On before rendering");
        // },
        // onAfterRendering(){
        //     MessageBox.error("On after rendering");
        // }
        onPress: function () {
            console.log("Button clicked");
        },
        onAddToTable: function () {
            var oFormData = this.getView().getModel("formModel").getData();
            var oTableModel = this.getView().getModel("tableModel");
            var aItems = oTableModel.getProperty("/items");

            aItems.push({ ...oFormData });
            oTableModel.setProperty("/items", aItems);

            this._clearForm();
        },

        onAddToList : function(){
           var oFormData = this.getView().getModel("formModel").getData();
           var oListModel = this.getView().getModel("listModel");
           var aItems = oListModel.getProperty("/items");

           aItems.push({...oFormData});
           oListModel.setProperty("/items",aItems);

           this._clearForm();
        },

        _clearForm: function () {
            this.getView().getModel("formModel").setData({
                name: "",
                age: "",
                city: ""
            });
        }



    });
});