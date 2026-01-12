sap.ui.define([
	"sample/project1/controller/BaseController",
	"sap/m/MessageToast",
], function (BaseController,MessageToast) {
	"use strict";

	return BaseController.extend("sample.project1.controller.View2", {

		onInit: function () {

		},
		onCreate: function () {
			var oModel = this.getView().getModel();
			var uModel = this.getView().getModel("userModel");
			var categoryName = uModel.getProperty("/CategoriesName");
			oModel.setUseBatch(false);
			let oPayload = {
				ID: Math.floor(Math.random() * 100000), 
				Name: categoryName,
			}
			oModel.create("/Categories", oPayload, {
				success: function () {
					MessageToast.show("Catgeory created successfully");
					uModel.setProperty("/CategoriesName", "");
					oModel.refresh(true);
				},
				error: function (oError) {
					MessageToast.show("Failed to create Catgeory");
					console.error(oError);
				}
			})
		},
		onUpdate: function () {

			if (!this._oSelectedContext) {
				MessageToast.show("Please select a Catgeory first");
				return;
			}

			var oModel = this.getView().getModel();
			var oUserModel = this.getView().getModel("userModel");

			var sName = oUserModel.getProperty("/CategoriesName");

			var oPayload = {
				Name: sName,
			};

			oModel.setUseBatch(false);

			oModel.update(this._oSelectedContext.getPath(), oPayload, {
				success: function () {
					sap.m.MessageToast.show("Catgeory updated successfully");
					oUserModel.setProperty("/CategoriesID", "");
					oUserModel.setProperty("/CategoriesName", "");

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
				MessageToast.show("Please select a category to delete");
				return;
			}

			var oModel = this.getView().getModel();
			var oUserModel = this.getView().getModel("userModel");

			oModel.setUseBatch(false);

			oModel.remove(this._oSelectedContext.getPath(), {
				success: function () {
					sap.m.MessageToast.show("category deleted successfully");

					oUserModel.setProperty("/CategoriesID", "");
					oUserModel.setProperty("/CategoriesName", "");


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

			oUserModel.setProperty("/CategoriesID", oData.ID);
			oUserModel.setProperty("/CategoriesName", oData.Name);
		}


	});
});