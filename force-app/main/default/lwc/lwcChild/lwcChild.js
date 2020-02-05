import { LightningElement, track, api } from 'lwc';
import getContracts from '@salesforce/apex/lwcController.getContracts';
import { functionName1} from 'c/external';
import { registerListener, unregisterAllListeners} from 'c/pubsub';

export default class LwcChild extends LightningElement {

    @track leadResult;
    @track leadError;
    @track appEventParam;
    @api globalParam = 'I am global';
    @track dummyTrackParamAccessCheck = 'Track Variable in child';

    shownIds = [];

    connectedCallback() {
        registerListener('AppEventName', this.appEventHandler, this); 
    }
    disconnectedCallback() {
        unregisterAllListeners(this);
    }

    getContracts(){
        getContracts({excludeIds: this.shownIds})
        .then(result => {
            this.leadResult = result;
            this.shownIds = [];
            for(var i in result){
                this.shownIds.push(result[i].Id);
            }
        })
        .catch(error => {
            this.leadError = error;
        });
    }

    fireExternalJs(){
        functionName1('1','2');
    }

    triggerEvent(event){
        var data = {id: event.target.id,
                    label: event.target.label};
        var myEvent = new CustomEvent('senddata', {detail:data});
        this.dispatchEvent(myEvent);
    }

    appEventHandler(event){
        this.appEventParam = event.Parameter;
    }
}