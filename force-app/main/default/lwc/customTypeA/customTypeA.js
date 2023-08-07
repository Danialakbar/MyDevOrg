import { LightningElement, api } from 'lwc';

export default class CustomTypeA extends LightningElement {

    @api recordId;
    @api customValueA;

    fireCustomTypeA() {
        alert('clicked on ' + this.customValueA);
        let newCustomValueA = this.customValueA;
        
        const event = new CustomEvent('customtypea', {
            composed: true,
            bubbles: true,
            cancelable: true,
            detail: {
                recordId: this.recordId,
                newCustomValueA: newCustomValueA
            },
        });

        this.dispatchEvent(event);
    }
}