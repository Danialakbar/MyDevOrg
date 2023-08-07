import { LightningElement, wire ,api} from 'lwc';
import fetchAccounts from '@salesforce/apex/AccountController.fetchAccounts';
import updateAccounts from '@salesforce/apex/AccountController.updateAccounts';
import { NavigationMixin } from 'lightning/navigation';

const actions = [
    { label: 'View', name: 'view' },
    { label: 'Edit', name: 'edit' },
];
 
const columns = [   
    { label: 'Name', fieldName: 'Name' },
    { label: 'Industry', fieldName: 'Industry' },
    { label: 'Custom Field 1', fieldName: 'Id', type: 'customTypeA', typeAttributes: { customValueA: { fieldName: 'Custom_Field_1__c' }}},
    { label: 'Custom Field 2', fieldName: 'Id', type: 'customTypeB', typeAttributes: { customValueB: { fieldName: 'Custom_Field_2__c' }}},
    {
        type: 'action',
        typeAttributes: { rowActions: actions },
    },
];

export default class LightingDataTableSearch extends NavigationMixin( LightningElement ) {
     
    availableAccounts;
    error;
    columns = columns;
    searchString;
    initialRecords;

    @wire( fetchAccounts )  
    wiredAccount( { error, data } ) {

        if ( data ) {

            this.availableAccounts = data;
            this.initialRecords = data;
            this.error = undefined;

        } else if ( error ) {

            this.error = error;
            this.availableAccounts = undefined;

        }

    }

    handleRowAction( event ) {

        const actionName = event.detail.action.name;
        const row = event.detail.row;
        switch ( actionName ) {
            case 'view':
                this[NavigationMixin.Navigate]({
                    type: 'standard__recordPage',
                    attributes: {
                        recordId: row.Id,
                        actionName: 'view'
                    }
                });
                break;
            case 'edit':
                this[NavigationMixin.Navigate]({
                    type: 'standard__recordPage',
                    attributes: {
                        recordId: row.Id,
                        objectApiName: 'Account',
                        actionName: 'edit'
                    }
                });
                break;
            default:
        }

    }

    handleSearchChange( event ) {

        this.searchString = event.detail.value;
        console.log( 'Updated Search String is ' + this.searchString );

    }

    handleSearch( event ) {

        const searchKey = event.target.value.toLowerCase();
        console.log( 'Search String is ' + searchKey );

        if ( searchKey ) {

            this.availableAccounts = this.initialRecords;
            console.log( 'Account Records are ' + JSON.stringify( this.availableAccounts ) );
            
            if ( this.availableAccounts ) {

                let recs = [];
                
                for ( let rec of this.availableAccounts ) {

                    console.log( 'Rec is ' + JSON.stringify( rec ) );
                    let valuesArray = Object.values( rec );
                    console.log( 'valuesArray is ' + JSON.stringify( valuesArray ) );
 
                    for ( let val of valuesArray ) {

                        console.log( 'val is ' + val );
                        let strVal = String( val );
                        
                        if ( strVal ) {

                            if ( strVal.toLowerCase().includes( searchKey ) ) {

                                recs.push( rec );
                                break;
                        
                            }

                        }

                    }
                    
                }

                console.log( 'Matched Accounts are ' + JSON.stringify( recs ) );
                this.availableAccounts = recs;

             }
 
        }  else {

            this.availableAccounts = this.initialRecords;

        }        

    }

    handleCustomTypeA(event) {
        const { recordId,newCustomValueA} = event.detail;
        console.log('CUSTOM TYPE Id - ' + recordId);
        console.log('CUSTOM TYPE Name - ' + newCustomValueA);
        this.UpdateAccount(recordId,'Custom Field 1',newCustomValueA);
        //this.availableAccounts.find(item => item.id == recordId).newCustomValueA = updatedvalue;
        //this.availableAccounts = [...this.availableAccounts]; //datatable will be rerender
    }
    handleCustomTypeB(event) {
        const { recordId,newCustomValueB} = event.detail;
        console.log('CUSTOM TYPE Id - ' + recordId);
        console.log('CUSTOM TYPE Name - ' + newCustomValueB);
        this.UpdateAccount(recordId,'Custom Field 2',newCustomValueB);
        //this.availableAccounts.find(item => item.id == recordId).newCustomValueA = updatedvalue;
        //this.availableAccounts = [...this.availableAccounts]; //datatable will be rerender
    }
    @api async UpdateAccount(recordId,clickedcolumn,clickedvalue)
    {       
        alert('came to call '+ recordId +':'+ clickedcolumn + ':' + clickedvalue);
        await updateAccounts({recordId: recordId,clickedcolumn:clickedcolumn,clickedvalue:clickedvalue})
        .then(result => {      
              //this.availableAccounts.find(item => item.Id == recordId).Industry = result;
            this.availableAccounts = [...this.availableAccounts]; //datatable will be rerender
        }) .catch(error => {
            console.log(error);
            this.error = error;
        });
    }

}