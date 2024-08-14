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
            var oColumnData=[
                    {
                        "WorkOrder": "30006433",
                        "Component": "001000",
                        "Material": "181297",
                        "MaterialDesc":"CLAMP FC 2x7-1/2 F/CI&ST, 100PSIG"
                    },
                    {
                        "WorkOrder": "30006433",
                        "Component": "001000",
                        "Material": "181297",
                        "MaterialDesc":"CLAMP FC 2x7-1/2 F/CI&ST, 100PSIG"
                    },
                    {
                        "WorkOrder": "30006433",
                        "Component": "001000",
                        "Material": "181297",
                        "MaterialDesc":"CLAMP FC 2x7-1/2 F/CI&ST, 100PSIG"
                    },
                    {
                        "WorkOrder": "30006433",
                        "Component": "001000",
                        "Material": "181297",
                        "MaterialDesc":"CLAMP FC 2x7-1/2 F/CI&ST, 100PSIG"
                    },
                    {
                        "WorkOrder": "30006433",
                        "Component": "001000",
                        "Material": "181297",
                        "MaterialDesc":"CLAMP FC 2x7-1/2 F/CI&ST, 100PSIG"
                    },
                    {
                        "WorkOrder": "30006433",
                        "Component": "001000",
                        "Material": "181297",
                        "MaterialDesc":"CLAMP FC 2x7-1/2 F/CI&ST, 100PSIG"
                    },
                ];
            
            var oJsonModel= new sap.ui.model.json.JSONModel(oColumnData);
            this.getView().setModel(oJsonModel,"RowData")

            var oTableData=[
                {
                    "Material":"White Pape Classic",
                    "MaterialNumber":"100000010",
                    "MDelivered":"2.000",
                    "MDeliveredunit":"PAC",
                    "StorageLocation":"Benton ,sat whise",
                    "StockType":"Unrestricted-use",
                    "Quantity":"2.000 PAC",
                    "Plant":"Roosevelt Little R....."
                },
                {
                    "Material":"GAS Meter Coupling",
                    "MaterialNumber":"100000010",
                    "MDelivered":"2.000",
                    "MDeliveredunit":"PAC",
                    "StorageLocation":"Benton ,sat whise",
                    "StockType":"Unrestricted-use",
                    "Quantity":"2.000 PAC",
                    "Plant":"Roosevelt Little R....."
                }
            ]
            var oJsonModel1= new sap.ui.model.json.JSONModel(oTableData);
            this.getView().setModel(oJsonModel1,"oTableData")
            
        },
        onValueHelpPress:function()
        {
            var that=this;
            this._oBasicSearchField = new SearchField();
			Fragment.load({
				name: "project1.fragments.PO",
                controller: this
			}).then(function(oDialog) {
				var oFilterBar = oDialog.getFilterBar(), oColumnWorkOrder, oColumnComponent,oColumnMaterial,oColumnMaterialDesc;
				this._oVHD = oDialog;
                oDialog.setSupportMultiselect(false);
				this.getView().addDependent(oDialog);
				
				// Set Basic Search for FilterBar
				oFilterBar.setFilterBarExpanded(false);
				oFilterBar.setBasicSearch(this._oBasicSearchField);

                oDialog.setRangeKeyFields([{
                    label: "Purchase Order",
                    key: "PD",
                    type: "string",
                    typeInstance: new TypeString({}, {
                        maxLength: 15
                    })
                }]);

				// Trigger filter bar search when the basic search is fired
				this._oBasicSearchField.attachSearch(function() {
					oFilterBar.search();
				});

				oDialog.getTableAsync().then(function (oTable) {
                    oTable.bindRows("/");
                    oTable.setModel(that.getView().getModel("RowData"));

					// For Desktop and tabled the default table is sap.ui.table.Table
					if (oTable.bindRows) {
						// Bind rows to the ODataModel and add columns
						
						oColumnWorkOrder = new UIColumn({label: new Label({text: "Work Order"}), template: new Text({wrapping: false, text: "{WorkOrder}"})});
                        oColumnComponent= new UIColumn({label: new Label({text: "Component"}), template: new Text({wrapping: false, text: "{Component}"})});
						oColumnMaterial = new UIColumn({label: new Label({text: "Material"}), template: new Text({wrapping: false, text: "{Material}"})});
                        oColumnMaterialDesc = new UIColumn({label: new Label({text: "Material Description"}), template: new Text({wrapping: false, text: "{MaterialDesc}"})});
						
						oTable.addColumn(oColumnWorkOrder);
						oTable.addColumn(oColumnComponent);
                        oTable.addColumn(oColumnMaterial);
                        oTable.addColumn(oColumnMaterialDesc);
					}
					// For Mobile the default table is sap.m.Table
					
					oDialog.update();
				}.bind(this));

				
				oDialog.open();
			}.bind(this));
            
         
            // const oRouter = this.getOwnerComponent().getRouter();
			// oRouter.navTo("detail");
        },
        onValueHelpOkPress: function (oEvent) {
			var aTokens = oEvent.getParameter("tokens");
			this.getView().byId("ID_PurchasingDocument").setValue("450000031");
			this._oVHD.close();
            this.getView().byId("ObjectPageLayout").setVisible(true)
		},
        onValueHelpCancelPress:function()
        {
            this._oVHD.close();
        }
    });
});
