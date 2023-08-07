import { LightningElement,api,track,wire } from 'lwc';
//import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import USER_ID from '@salesforce/user/Id';
import { getRecord, updateRecord } from 'lightning/uiRecordApi';
import UserNameFIELD from '@salesforce/schema/User.Name';
import UserFirstNameFIELD from '@salesforce/schema/User.FirstName';
import UserLastNameFIELD from '@salesforce/schema/User.LastName';
import UID from '@salesforce/schema/User.Id';
import USER_OBJECT from '@salesforce/schema/User';
export default class Popup extends LightningElement {
		
		showScreen1 = false;
		showScreen2 = false;
		showScreen3 = false;
		showModal = false;
		error;
		currentUserName;
		firstName;
		lastName;
		@wire(getRecord, { recordId: USER_ID, fields: [UserNameFIELD,UserFirstNameFIELD,UserLastNameFIELD]}) 
		currentUserInfo({error, data}) {
				if (data) {
						
						this.currentUserName = data.fields.Name.value;
						this.firstName = data.fields.FirstName.value;
						this.lastName = data.fields.LastName.value;
						if (this.currentUserName.includes('Dani')) {
								this.showScreen1 = true;
								this.showScreen2 = false;
								this.showScreen3 = false;
								this.showModal = true;
						}
						
				} else if (error) {
						this.error = error ;
				}
		}
		
		handleScreen1Next() {
				this.showScreen1 = false;
				this.showScreen2 = true;
				this.showModal = true;
		}

		handleScreen2Next(event) {
				this.firstName = event.detail.firstName;
				this.lastName = event.detail.lastName;
				const fields = {};
				fields[UID.fieldApiName] = USER_ID;
				fields[UserFirstNameFIELD.fieldApiName] = this.firstName;
				fields[UserLastNameFIELD.fieldApiName] = this.lastName;

				const recordInput = { fields };

				updateRecord(recordInput)
						.then(() => {
						/*this.dispatchEvent(
								new ShowToastEvent({
										title: 'Success',
										message: 'User record updated',
										variant: 'success'
								})
						);*/
				})
						.catch(error => {
						console.log('Error updating user', error);
				});
				this.showScreen2 = false;
				this.showScreen3 = true;
				this.showModal = true;
		}
		
		handleScreen3Finish() {
				this.showScreen2 = false;
				this.showScreen3 = false;
				this.showModal = false;
				this.dispatchEvent(new CustomEvent('close'));
		}
		
}