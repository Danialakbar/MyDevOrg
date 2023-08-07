import { LightningElement, wire ,api} from 'lwc';
import getemail from '@salesforce/apex/AccountController.getemail';
import fetchAccounts from '@salesforce/apex/AccountController.fetchAccounts';

export default class SendEmaillwc extends LightningElement {

    @api recordId;
    @api emailofcontact='';
    @api renderred=false;

    renderedCallback()
    {
        if(this.recordId != undefined && this.recordId != null && this.renderred == false)
        {
        this.GetEmail(this.recordId);
        this.renderred = true;
        }
    }

    @api async GetEmail(recordId)
    {       
        await getemail({recordId: recordId})
        .then(result => {      
              this.emailofcontact = result;
        }) .catch(error => {
            console.log(error);
            this.error = error;
        });
    }

}