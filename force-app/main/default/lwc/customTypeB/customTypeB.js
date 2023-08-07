import { LightningElement, api } from 'lwc';

export default class CustomTypeB extends LightningElement {

    @api recordId;
    @api customValueB;

    fireCustomTypeB() {
        alert('clicked on ' + this.customValueB);
        let newCustomValueB = this.customValueB;
        
        const event = new CustomEvent('customtypeb', {
            composed: true,
            bubbles: true,
            cancelable: true,
            detail: {
                recordId: this.recordId,
                newCustomValueB: newCustomValueB
            },
        });

        this.dispatchEvent(event);
    }
}