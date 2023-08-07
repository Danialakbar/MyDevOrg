import { LightningElement, track } from 'lwc';
export default class UserStory2 extends LightningElement {
  @track idNumber;

  dateOfBirth;
  gender;
  citizenship;

  isValid = false;
  get isButtonDisabled() {
    return !this.isValid;
  }



  searchHolidays() {

    this.dateOfBirth = this.decodeDateOfBirth(this.idNumber);

    this.gender = this.decodeGender(this.idNumber);
    this.citizenship = this.decodeSACitizen(this.idNumber);

  }










  handleInputChange(event) {
    const idNumber = event.target.value;

    this.idNumber = idNumber;
    const firstTwelveDigits = idNumber.slice(0, 12);

    const lastDigit = parseInt(idNumber.charAt(12), 10);

    const checksumDigit = this.calculateChecksumDigit(firstTwelveDigits);
    console.log('lastDigit ', lastDigit);
    console.log('checksumDigit ', checksumDigit);
    if (checksumDigit === lastDigit) {
      this.isValid = true;
    }
    this.isValid = checksumDigit === lastDigit;

  }
  calculateChecksumDigit(firstTwelveDigits) {

    let sum = 0;
    let alternate = true;

    for (let i = firstTwelveDigits.length - 1; i >= 0; i--) {
      let digit = parseInt(firstTwelveDigits.charAt(i), 10);

      if (alternate) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      alternate = !alternate;
    }

    return (10 - (sum % 10));
  }

  decodeDateOfBirth(idNumber) {
    this.dateOfBirth = idNumber.slice(0, 6);
    let year = idNumber.slice(0, 2);
    let month = idNumber.slice(2, 4);
    let day = idNumber.slice(4, 6);

    let currentYear = new Date().getFullYear() % 100;

    if (year <= currentYear) {
      year = '20' + year;
    } else {
      year = '19' + year;
    }

    this.dateOfBirth = year + '/' + month + '/' + day;
    return this.dateOfBirth;
  }
  decodeGender(idNumber) {
    console.log("Gender");

    this.gender = idNumber.slice(6, 10);
    return (this.gender < 5000) ? 'Female' : 'Male';
  }
  decodeSACitizen(idNumber) {
    console.log("Citizen");

    this.citizenship = idNumber.slice(10, 11);
    return (this.citizenship === '0') ? 'SA Citizen' : 'Permanent Resident';
  }



}