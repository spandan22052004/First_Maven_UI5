sap.ui.define([
    "sample/project1/controller/BaseController",
	"sap/m/MessageToast",
], function (BaseController,MessageToast) {
	"use strict";

	return BaseController.extend("sample.project1.controller.View3", {

		onInit: function () {

		},
		onCreate: function () {
			var oModel = this.getView().getModel();
			var uModel = this.getView().getModel("userModel");
			var supplierName = uModel.getProperty("/SupplierName");
            var supplierStreet = uModel.getProperty("/SupplierStreet");
            var supplierCity = uModel.getProperty("/SupplierCity");
            var supplierState = uModel.getProperty("/SupplierState");
            var supplierZipCode= uModel.getProperty("/SupplierZipCode");
            var supplierCountry= uModel.getProperty("/SupplierCountry");
			oModel.setUseBatch(false);
			let oPayload = {
				ID: Math.floor(Math.random() * 100000), 
				Name: supplierName,
                Address:{
                    Street:supplierStreet,
                    City:supplierCity,
                    State:supplierState,
                    ZipCode:supplierZipCode,
                    Country:supplierCountry
                }
			}
			oModel.create("/Suppliers", oPayload, {
				success: function () {
					MessageToast.show("Supplier created successfully");
					uModel.setProperty("/SupplierName", "");
                    uModel.setProperty("/SupplierStreet", "");
                    uModel.setProperty("/SupplierCity", "");
                    uModel.setProperty("/SupplierState", "");
                    uModel.setProperty("/SupplierZipCode", "");
                    uModel.setProperty("/SupplierCountry", "");
					oModel.refresh(true);
				},
				error: function (oError) {
					MessageToast.show("Failed to create Supplier");
					console.error(oError);
				}
			})
		},
		onUpdate: function () {

			if (!this._oSelectedContext) {
				MessageToast.show("Please select a Supplier first");
				return;
			}

			var oModel = this.getView().getModel();
			var uModel = this.getView().getModel("userModel");

				var supplierName = uModel.getProperty("/SupplierName");
            var supplierStreet = uModel.getProperty("/SupplierStreet");
            var supplierCity = uModel.getProperty("/SupplierCity");
            var supplierState = uModel.getProperty("/SupplierState");
            var supplierZipCode= uModel.getProperty("/SupplierZipCode");
            var supplierCountry= uModel.getProperty("/SupplierCountry");

			var oPayload = {
				Name: supplierName,
                Address:{
                    Street:supplierStreet,
                    City:supplierCity,
                    State:supplierState,
                    ZipCode:supplierZipCode,
                    Country:supplierCountry
                }
			};

			oModel.setUseBatch(false);

			oModel.update(this._oSelectedContext.getPath(), oPayload, {
				success: function () {
					sap.m.MessageToast.show("Supplier updated successfully");
                    uModel.setProperty("/SupplierID","");
					uModel.setProperty("/SupplierName", "");
                    uModel.setProperty("/SupplierStreet", "");
                    uModel.setProperty("/SupplierCity", "");
                    uModel.setProperty("/SupplierState", "");
                    uModel.setProperty("/SupplierZipCode", "");
                    uModel.setProperty("/SupplierCountry", "");
					this._oSelectedContext = null;

					oModel.refresh(true);
				}.bind(this),

				error: function (oError) {
					MessageToast.show("Update failed");
					console.error(oError);
				}
			});
		},
		onDelete: function () {
			if (!this._oSelectedContext) {
				MessageToast.show("Please select a category to delete");
				return;
			}

			var oModel = this.getView().getModel();
			var uModel = this.getView().getModel("userModel");

			oModel.setUseBatch(false);

			oModel.remove(this._oSelectedContext.getPath(), {
				success: function () {
					MessageToast.show("category deleted successfully");

					uModel.setProperty("/SupplierID","");
					uModel.setProperty("/SupplierName", "");
                    uModel.setProperty("/SupplierStreet", "");
                    uModel.setProperty("/SupplierCity", "");
                    uModel.setProperty("/SupplierState", "");
                    uModel.setProperty("/SupplierZipCode", "");
                    uModel.setProperty("/SupplierCountry", "");


					this._oSelectedContext = null;

					oModel.refresh(true);
				}.bind(this),

				error: function (oError) {
					sap.m.MessageToast.show("Delete failed");
					console.error(oError);
				}
			});
		},
		onSelection: function (oEvent) {
			var oItem = oEvent.getSource();

			var oContext = oItem.getBindingContext();

			if (!oContext) {
				return;
			}

			this._oSelectedContext = oContext;

			var oData = oContext.getObject();
			var uModel = this.getView().getModel("userModel");
                   uModel.setProperty("/SupplierID",oData.ID);
			       uModel.setProperty("/SupplierName",oData.Name);
                    uModel.setProperty("/SupplierStreet",oData.Address.Street);
                    uModel.setProperty("/SupplierCity", oData.Address.City);
                    uModel.setProperty("/SupplierState", oData.Address.State);
                    uModel.setProperty("/SupplierZipCode",oData.Address.ZipCode);
                    uModel.setProperty("/SupplierCountry",oData.Address.Country);
		}


	});
});