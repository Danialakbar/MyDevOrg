import { LightningElement, track} from 'lwc';
import searchHolidays from '@salesforce/apex/HolidaysController.searchHolidays';

export default class UserStory3 extends LightningElement {
  @track idNumber ;
 // @track holidaysFound = false;
 // @track holidays = [];
 dateOfBirth;
 gender  ;
 citizenship ;

  isValid = false;
  get isButtonDisabled() {
    return !this.isValid;
  }
 
  

  searchHoliday() {
    console.log("Search called");
   // console.log("Citizenship");
  //  alert(this.idNumber);

    this.dateOfBirth = this.decodeDateOfBirth(this.idNumber);
    
    this.gender = this.decodeGender(this.idNumber);
    this.citizenship = this.decodeSACitizen(this.idNumber);
   //  this.showDecodedInfo=true;


 console.log(this.dateOfBirth,this.gender,this.citizenship);




 
    searchHolidays({
        idNumber: this.idNumber,
        dateOfBirth: this .decodeDateOfBirth(this.idNumber),
        gender: this.decodeGender(this.idNumber),
        citizenship: this.decodeSACitizen(this.idNumber)
    })
    .then(result => {
        
        console.log('Result from Apex:', result);
    })
    .catch(error => {
        console.error('Error calling Apex:', error);
    });
}

  



  handleInputChange(event) {
    //this.idNumber = event.target.value;
    const idNumber = event.target.value;
   // if (idNumber.length !== 13) {
   //     this.isValid = false;
   //     return;
   // }
    this.idNumber = idNumber;
    const firstTwelveDigits = idNumber.slice(0, 12);
   // const firstsixDigits = idNumber.slice(0, 6);

    const lastDigit = parseInt(idNumber.charAt(12), 10);

    const checksumDigit = this.calculateChecksumDigit(firstTwelveDigits);
       console.log('lastDigit ',lastDigit);
    console.log('checksumDigit ',checksumDigit);
if(checksumDigit===lastDigit){
    this.isValid=true;
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
  
    return (10 - (sum % 10)) ;
  }
  
  decodeDateOfBirth(idNumber) {
    debugger;
  //  console.log("DOB");
    // Extract the first 6 digits (YYMMDD) to get the Date of Birth
 this.dateOfBirth = idNumber.slice(0, 6);
  let   year =  idNumber.slice(0, 2); 
  let   month = idNumber.slice(2, 4);
   let  day = idNumber.slice(4, 6);

   let currentYear = new Date().getFullYear() % 100;
    
   // Determine the full year by considering the 21st century
   if (year <= currentYear) {
       year = '20' + year;
   } else {
       year = '19' + year;
   }
    
    this.dateOfBirth=  year + '/' + month + '/' + day;
    return this.dateOfBirth;
}
decodeGender( idNumber) {

   this.gender=idNumber.slice(6,10);
    return (this.gender < 5000) ? 'Female' : 'Male';
}
decodeSACitizen( idNumber) {

   this.citizenship = idNumber.slice(10, 11);
    return (this.citizenship=== '0') ? 'SA Citizen' : 'Permanent Resident';
}


}