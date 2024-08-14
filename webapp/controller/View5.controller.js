sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    'sap/ui/comp/library',
	'sap/ui/model/type/String',
	'sap/m/ColumnListItem',
	'sap/m/Label',
	'sap/m/SearchField',
	'sap/m/Token',
	'sap/ui/model/Filter',
	'sap/ui/model/FilterOperator',
	'sap/ui/model/odata/v2/ODataModel',
	'sap/ui/table/Column',
	'sap/m/Column',
	'sap/m/Text'
],
function (Controller,Fragment,compLibrary, TypeString, ColumnListItem, Label, SearchField, Token, Filter, FilterOperator, ODataModel, UIColumn, MColumn, Text) {
    "use strict";

    return Controller.extend("project1.controller.View2", {
        onInit: function () {
            var oTableData=[
				{
					"Line":"1",
					"ext":"PVC Steel TOE PR16",
					"Qunit":"2",
					"Unit":"PR",
					"SLoc":"Roosevelt Whse"

				},
				{
					"Line":"2",
					"ext":"PVC Steel TOE PR16",
					"Qunit":"2",
					"Unit":"EA",
					"SLoc":"Roosevelt Whse"
				},
				{
					"Line":"3",
					"ext":"PVC Steel TOE PR16",
					"Qunit":"2",
					"Unit":"EA",
					"SLoc":"Roosevelt Whse"

				}
			];
			var oJsonModel= new sap.ui.model.json.JSONModel(oTableData);
            this.getView().setModel(oJsonModel,"oTableData")

            
        }
           
    });
});
