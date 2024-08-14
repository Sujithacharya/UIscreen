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

    return Controller.extend("project1.controller.View1", {
        onInit: function () {
            var oColumnData=[
                    {
                        "PD": "450000031",
                        "PS": "Standard PO",
                        "PO": "Purchasing Organiaztion",
                        "PSU":"200"
                    },
                    {
                        "PD": "450000041",
                        "PS": "Manual PO",
                        "PO": "Purchasing Organiaztion",
                        "PSU":"300"
                    },
                    {
                        "PD": "450000051",
                        "PS": "Standard PO",
                        "PO": "Purchasing Organiaztion",
                        "PSU":"500"
                    },
                    {
                        "PD": "450000061",
                        "PS": "Manual PO",
                        "PO": "Purchasing Organiaztion",
                        "PSU":"600"
                    },
                    {
                        "PD": "450000031",
                        "PS": "Standard PO",
                        "PO": "Purchasing Organiaztion",
                        "PSU":"800"
                    },
                    {
                        "PD": "450000071",
                        "PS": "Standard PO",
                        "PO": "Purchasing Organiaztion",
                        "PSU":"900"
                    }
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
				var oFilterBar = oDialog.getFilterBar(), oColumnPurchasingDocument, oColumnPurchasingStandard,oColumnPurchasingOrganization,oColumnSupplier;
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
						
						oColumnPurchasingDocument = new UIColumn({label: new Label({text: "Purchasing Document"}), template: new Text({wrapping: false, text: "{PD}"})});
                        oColumnPurchasingStandard = new UIColumn({label: new Label({text: "Purchasing Standard"}), template: new Text({wrapping: false, text: "{PS}"})});
						oColumnPurchasingOrganization = new UIColumn({label: new Label({text: "Purchasing Organization"}), template: new Text({wrapping: false, text: "{PO}"})});
                        oColumnSupplier = new UIColumn({label: new Label({text: "Supplier"}), template: new Text({wrapping: false, text: "{PSU}"})});
						
						oTable.addColumn(oColumnPurchasingDocument);
						oTable.addColumn(oColumnPurchasingStandard);
                        oTable.addColumn(oColumnPurchasingOrganization);
                        oTable.addColumn(oColumnSupplier);
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
