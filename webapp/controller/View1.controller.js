sap.ui.define([
	"sample/project1/controller/BaseController",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (BaseController, Filter, FilterOperator) {
	"use strict";

	return BaseController.extend("sample.project1.controller.View1", {

		onInit: function () {
			console.log("Router instance:", this.getRouter());
			console.log("RouteView2:", this.getRouter().getRoute("RouteView2"));
		},

		onSelectEmployee: function (oEvent) {
			var oItem = oEvent.getParameter("listItem");
			var oCtx = oItem.getBindingContext("employeeModel");

			if (!oCtx) {
				console.error("Binding context missing");
				return;
			}

			var sEmpId = oCtx.getProperty("EmpID");

			if (!sEmpId) {
				console.error("EmpID missing in model data");
				return;
			}

			console.log("Navigating to EmpID:", sEmpId);

			this.navTo("RouteView2", {
				empId: sEmpId
			});
		},

		onSearch: function (oEvent) {
			var sValue = oEvent.getParameter("newValue");
			var oBinding = this.byId("empList").getBinding("items");

			oBinding.filter(
				sValue ? [new Filter("Name", FilterOperator.Contains, sValue)] : []
			);
		},

		onDeptFilter: function (oEvent) {
			var sDept = oEvent.getSource().getSelectedKey();
			var oBinding = this.byId("empList").getBinding("items");

			oBinding.filter(
				sDept ? [new Filter("Dept", FilterOperator.EQ, sDept)] : []
			);
		}
	});
});
