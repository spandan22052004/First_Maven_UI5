sap.ui.define([
  "sample/project1/controller/BaseController",
  "sap/m/MessageToast",
  "sap/ui/core/Fragment"
], function (BaseController, MessageToast, Fragment) {
  "use strict";

  return BaseController.extend("sample.project1.controller.View2", {

    onInit: function () {
      this.getRouter()
        .getRoute("RouteView2")
        .attachPatternMatched(this._onMatched, this);
    },

    _onMatched: function (oEvent) {
      var sEmpId = oEvent.getParameter("arguments").empId;
      var oModel = this.getView().getModel("employeeModel");

      var oEmp = oModel.getProperty("/Employees")
        .find(e => e.EmpID === sEmpId);

      oModel.setProperty("/selectedEmployee", oEmp);
      oModel.setProperty("/editMode", false);

      this.getView().bindElement("employeeModel>/selectedEmployee");
    },

    //edt mode onnnnn

    onEdit: function () {
      this.getView().getModel("employeeModel").setProperty("/editMode", true);
    },

    onSave: function () {
      var oModel = this.getView().getModel("employeeModel");

      // swtch back to read only
      oModel.setProperty("/editMode", false);

      MessageToast.show("Employee details saved");
    },

    //projects ..

    onAddProject: function () {
      var oModel = this.getView().getModel("employeeModel");

      oModel.setProperty("/newProject", {
        ProjectID: "",
        Name: "",
        StartDate: "",
        EndDate: ""
      });

      if (!this._oProjectDialog) {
        Fragment.load({
          name: "sample.project1.fragment.AddProject",
          controller: this
        }).then(function (oDialog) {
          this._oProjectDialog = oDialog;
          this.getView().addDependent(oDialog);
          oDialog.open();
        }.bind(this));
      } else {
        this._oProjectDialog.open();
      }
    },

    onSaveProject: function () {
      var oModel = this.getView().getModel("employeeModel");
      var oNewProject = oModel.getProperty("/newProject");
      var aProjects = oModel.getProperty("/selectedEmployee/Projects");

      aProjects.push(oNewProject);
      oModel.setProperty("/selectedEmployee/Projects", aProjects);

      this._oProjectDialog.close();
      MessageToast.show("Project added");
    },

    onCancelProject: function () {
      this._oProjectDialog.close();
    },


    onNavBack: function () {
      this.onBack();
    }

  });
});
