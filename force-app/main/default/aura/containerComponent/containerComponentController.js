({
    captureLwcEvt : function(component, event, helper) {
       
        var param = event.getParam('key');
        component.set('v.lwcParam',param);
    }
})