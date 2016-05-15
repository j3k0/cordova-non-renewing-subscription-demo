var app = {};

app.initialize = function() {
    console.log('listening to deviceready');
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
};

app.onDeviceReady = function() {
    console.log('initializing the nonRenewing plugin');
    /* store.register({
        type: store.PAID_SUBSCRIPTION,
        id: 'cc.fovea.purchase.subscription1'
    }); */
    nonRenewing.initialize({
        verbosity: store.DEBUG,
        products: [{
            id: 'cc.fovea.purchase.nonrenewing.1hour',
            duration: 3600
        }, {
            id: 'cc.fovea.purchase.nonrenewing.5minutes',
            duration: 300
        }]
    });
    this.showMainScreen();
};

app.showMainScreen = function() {
    document.getElementsByClassName('app')[0].innerHTML = '<h1>Demo</h1><p><a href="#" class="manage-subscription">Manage your subscription</a></p>';
    document.getElementsByClassName('manage-subscription')[0].addEventListener('click', function(event) {
        console.log('showMainScreen -> openSubscriptionManager');
        event.preventDefault();
        nonRenewing.openSubscriptionManager();
    });
};

app.initialize();
