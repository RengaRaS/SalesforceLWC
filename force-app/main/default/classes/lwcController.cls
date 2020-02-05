public with sharing class lwcController {
    
    @AuraEnabled(cacheable=true)
    public static List<Account> getFewAccounts(){
        return [select Id, Name from Account order by CreatedDate Desc Limit 3];    
    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> getFewContacts(){
        return [select Id, Name from Contact order by CreatedDate Desc Limit 3];    
    }

    @AuraEnabled(cacheable=true)
    public static Contact getContactById(String recId){
        return [select Id, Name from Contact where id=: recId limit 1];    
    }

    @AuraEnabled
    public static List<Lead> getContracts(List<String> excludeIds){
        return [select Id, Name from Lead where id not in: excludeIds order by CreatedDate Desc Limit 3];
    }
}