public class AccountController {
 
    @AuraEnabled( cacheable = true )
    public static List< Account > fetchAccounts() {
     System.debug('recordId ');
        return [
            SELECT Id, Name, Industry,Custom_Field_1__c,Custom_Field_2__c
            FROM Account
            LIMIT 10
        ];
         
    }

    @AuraEnabled( cacheable = false)
    public static string updateAccounts(string recordId,string clickedcolumn,string clickedvalue) 
    { 
        Account acctobj = [Select Id,Industry from Account where Id =: recordId];
        System.debug('acctobj '+ acctobj.Industry);
        acctobj.Industry = acctobj.Industry + ' Updated Value';
        //update acctobj;
         
        return acctobj.Industry;
    }

    @AuraEnabled(cacheable = false)
    public static string getemail(string recordId) 
    { 
    System.debug('record Id '+ recordId);
       Contact con = [Select Id,Email from Contact where Id =: recordId];

        //update acctobj;
         
        return con.Email;
    }
     
}