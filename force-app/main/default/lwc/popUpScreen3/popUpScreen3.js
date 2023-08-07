import { LightningElement,api } from 'lwc';
export default class PopUpScreen3 extends LightningElement {
	 handleFinishClick() {
        const finishEvent = new CustomEvent('finish');
        this.dispatchEvent(finishEvent);
    }
}