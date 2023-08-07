import { LightningElement,api } from 'lwc';
export default class PopUpScreen1 extends LightningElement {
    handleNextClick() {
        const nextEvent = new CustomEvent('next');
        this.dispatchEvent(nextEvent);
    }
}