import { LightningElement, track } from 'lwc';

export default class PublicHolidayChecker extends LightningElement {
    @track idNumber = '';
    @track holidays;
    @track error = '';
    
    get isSearchDisabled() {
        return !this.isValidIdNumber();
    }

    handleIdNumberChange(event) {
        this.idNumber = event.target.value;
    }

    isValidIdNumber() {
        return this.idNumber !== '';
    }

    searchForHolidays() {
        if (!this.isValidIdNumber()) {
            this.error = 'Please enter a valid ID Number.';
            return;
        }

        this.error = '';

        this.holidays = [
            { id: '1', name: 'New Year\'s Day', date: '2023-01-01' },
            { id: '2', name: 'Human Rights Day', date: '2023-03-21' },
            { id: '3', name: 'Freedom Day', date: '2023-04-27' },
        ];
    }
}