sap.ui.define([
	"sap/m/MessageToast",
	"sap/ui/core/mvc/Controller",
], function (MessageToast, Controller) {
	"use strict";

	return Controller.extend("sample.project1.controller.View1", {

		onInit: function () {

		},
		onCreate: function () {
			var oModel = this.getView().getModel();
			var uModel = this.getView().getModel("userModel");
			var productName = uModel.getProperty("/ProductName");
			var productDescription = uModel.getProperty("/ProductDescription");
			oModel.setUseBatch(false);
			let oPayload = {
				ID: Math.floor(Math.random() * 100000), 
				Name: productName,
				Description: productDescription,
				ReleaseDate: new Date(),
				Rating: 1,
				Price: "100.0"
			}
			oModel.create("/Products", oPayload, {
				success: function () {
					MessageToast.show("Product created successfully");
					uModel.setProperty("/ProductName", "");
					uModel.setProperty("/ProductDescription", "");
					oModel.refresh(true);
				},
				error: function (oError) {
					MessageToast.show("Failed to create product");
					console.error(oError);
				}
			})
		},
		onUpdate: function () {

			if (!this._oSelectedContext) {
				MessageToast.show("Please select a product first");
				return;
			}

			var oModel = this.getView().getModel();
			var oUserModel = this.getView().getModel("userModel");

			var sName = oUserModel.getProperty("/ProductName");
			var sDescription = oUserModel.getProperty("/ProductDescription");

			var oPayload = {
				Name: sName,
				Description: sDescription
			};

			oModel.setUseBatch(false);

			oModel.update(this._oSelectedContext.getPath(), oPayload, {
				success: function () {
					sap.m.MessageToast.show("Product updated successfully");
					oUserModel.setProperty("/ProductID", "");
					oUserModel.setProperty("/ProductName", "");
					oUserModel.setProperty("/ProductDescription", "");

					this._oSelectedContext = null;

					oModel.refresh(true);
				}.bind(this),

				error: function (oError) {
					sap.m.MessageToast.show("Update failed");
					console.error(oError);
				}
			});
		},
		onDelete: function () {
			if (!this._oSelectedContext) {
				sap.m.MessageToast.show("Please select a product to delete");
				return;
			}

			var oModel = this.getView().getModel();
			var oUserModel = this.getView().getModel("userModel");

			oModel.setUseBatch(false);

			oModel.remove(this._oSelectedContext.getPath(), {
				success: function () {
					sap.m.MessageToast.show("Product deleted successfully");

					oUserModel.setProperty("/ProductID", "");
					oUserModel.setProperty("/ProductName", "");
					oUserModel.setProperty("/ProductDescription", "");

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
			var oUserModel = this.getView().getModel("userModel");

			oUserModel.setProperty("/ProductID", oData.ID);
			oUserModel.setProperty("/ProductName", oData.Name);
			oUserModel.setProperty("/ProductDescription", oData.Description);
		}


	});
});