import { LightningElement, wire, track } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import getFewAccountFromDB from '@salesforce/apex/lwcController.getFewAccounts';
import getFewContacts from '@salesforce/apex/lwcController.getFewContacts';
import getContactById from '@salesforce/apex/lwcController.getContactById';

export default class LwcParentCmp extends LightningElement {

    @track contactResult;
    @track errors;
    @track wiredContResult;
    @track singleContact;
    @track eventResult;
    contactId;

    // wiring an attribute without Params
    @wire(getFewAccountFromDB) threeDbAccs;
    
    // wiring a function without Params
    @wire(getFewContacts)  
    threeDbContacts(result){
        this.wiredContResult = result;
        if(result.data){
            this.contactResult = result.data;
            for(var i in result.data){
                this.contactId = result.data[i].Id;     
            }
        }else if(result.error){
            this.errors = JSON.stringify(result.error);
        }
    }

    // Wiring a function with Param
    @wire(getContactById,{recId : '$contactId'})
    getSingleContact(result){
        if(result.data){
            this.singleContact = result.data.Name;
        }
    }

    //Imperative function calls
    handleButtonClick(){
        refreshApex(this.threeDbAccs);
        refreshApex(this.wiredContResult);
    }

    getChildParam(){
        var childCmp =this.template.querySelector("c-lwc-child");
        alert(childCmp.globalParam);
        alert(childCmp.dummyTrackParam);
    }
    //Event Handler
    handleEvent(event){
        this.eventResult = event.detail;
        console.log(this.eventResult.id);

        console.log(this.eventResult.label);
    }
}