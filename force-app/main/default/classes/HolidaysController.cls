public with sharing class HolidaysController {
    private static String API_KEY = '24c5e86734eb44dc4a962826324a5546e74dc42f';
    private static String API_ENDPOINT = 'https://calendarific.com/api/v2/holidays';
    private static String COUNTRY = 'ZA';

    @AuraEnabled
    public static List<holidayslist> searchHolidays(String idNumber, String dateOfBirth, String gender, String citizenship) {
        List<ID_Number_Info__c> idNumberList = [SELECT IDNumber__c, DateOfBirth__c, Gender__c, Citizenship__c, SearchCount__c FROM ID_Number_Info__c WHERE IDNumber__c = :idNumber LIMIT 1];
        ID_Number_Info__c idNumberInfo = new ID_Number_Info__c();
        if (idNumberList.size() == 0) {
            idNumberInfo = new ID_Number_Info__c();
            idNumberInfo.IDNumber__c = idNumber;
            idNumberInfo.DateOfBirth__c = dateOfBirth;
            idNumberInfo.Gender__c = gender;
            idNumberInfo.Citizenship__c = citizenship;
            idNumberInfo.SearchCount__c = 1;
        } else {
            idNumberInfo = idNumberList[0];
            idNumberInfo.DateOfBirth__c = dateOfBirth;
            idNumberInfo.Gender__c = gender;
            idNumberInfo.Citizenship__c = citizenship;
            idNumberInfo.SearchCount__c++;
        }

        Integer year = Integer.valueOf(dateOfBirth.substring(0, 4));
        String holidaysEndpoint = API_ENDPOINT + '?api_key=' + API_KEY + '&country=' + COUNTRY + '&year=' + year;
        HttpRequest request = new HttpRequest();
        request.setEndpoint(holidaysEndpoint);
        request.setMethod('GET');

        Http http = new Http();
        HttpResponse response = http.send(request);

        List<Object> holidaysList = new List<Object>();
        if (response.getStatusCode() == 200) {
            Map<String, Object> apiResponse = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
            Map<String, Object> holidaysResponse = (Map<String, Object>) apiResponse.get('response');
            holidaysList = (List<Object>) holidaysResponse.get('holidays');
        }

        List<holidayslist> holidayss = new List<holidayslist>();
        for (Object holidayObj : holidaysList) {
            Map<String, Object> holidayMap = (Map<String, Object>) holidayObj;
            String name = (String) holidayMap.get('name');
            String primarytype = (String) holidayMap.get('primary_type');
            
    Map<String, Object> dateMap = (Map<String, Object>) holidayMap.get('date');
    Map<String, Object> datetimeMap = (Map<String, Object>) dateMap.get('datetime');
    Integer day = (Integer) datetimeMap.get('day');
    Integer month = (Integer) datetimeMap.get('month');
    Integer hyear = (Integer) datetimeMap.get('year');
    string holidaydate = hyear + '-' + month + '-' + day;

       holidayslist holidayrecord = new holidayslist();
       holidayrecord.holidayname = name;
       holidayrecord.holidaydate = holidaydate;
       holidayrecord.holidaytype = primarytype;
       if(primarytype == 'Public Holiday' || primarytype == 'Bank Holiday'){
       holidayss.add(holidayrecord);}
        }
        System.debug('holidayss '+JSON.serialize(holidayss));

        upsert idNumberInfo;

        return holidayss;
    }

    public class holidayslist
    {
        @AuraEnabled
        public string holidayname{get;set;}
        @AuraEnabled
        public string holidaydate{get;set;}
        @AuraEnabled
        public string holidaytype{get;set;}
    }
}