import { LightningElement,api,wire } from 'lwc';

export default class PopUpScreen2 extends LightningElement {
		@api firstName;
		@api lastName;

		handleFirstNameChange(event) {
        this.firstName = event.target.value;
    }

    handleLastNameChange(event) {
        this.lastName = event.target.value;
    }
		handleNextClick() {
				if(this.firstName == '' || this.lastName == ''){
						return;
				}
				const nextEvent = new CustomEvent('next',{
						detail:{
								firstName:this.firstName,
								lastName:this.lastName
						}
				});
				this.dispatchEvent(nextEvent);
		}
}