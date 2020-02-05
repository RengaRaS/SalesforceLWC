import { LightningElement, track } from 'lwc';
import { fireEvent} from 'c/pubsub';

export default class LwcChild2 extends LightningElement {

    @track bindingVariable = 'Default Val';
    @track box1Result;

    getVariableValue(event){
        //var value = event.target.value;
        //this.bindingVariable = value;
        this.box1Result = 'Hello ' + this.bindingVariable;
    }

    getTypedData(){
        var input =this.template.querySelector("lightning-input");
        alert(input.value);
        // var inputVal =this.template.querySelector('.myClassName');
        // alert(inputVal.value);
        // this.template.querySelectorAll('.myClassName').forEach(element => {
        //     alert(element.value);
        // });
    }

    triggerAppEvent(){
        fireEvent(null, 'AppEventName', {'Parameter' : 'TEST LWC PARAM'});
    }

    triggerAuraCmp(){
        var data = {key : 'Hello Aura'};
        var evt = new CustomEvent('evttoAura',{detail: data});
        this.dispatchEvent(evt);
    }
}