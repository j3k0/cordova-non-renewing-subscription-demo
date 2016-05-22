var app = {};

app.initialize = function() {
    console.log('listening to deviceready');
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
};

app.onDeviceReady = function() {
    console.log('initializing the nonRenewing plugin');

    // Initialize the non-renewing extension
    // when 'deviceready' has been received.
    // It takes a "products" option, which is
    // an array containing products IDs and duration
    // of the subscription in seconds.

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

    nonRenewing.onStatusChange(function(status) {
        if (status) {
            document.getElementsByClassName('status')[0].innerHTML =
                'isSubscribed: ' + status.subscriber + '\n' +
                'expiryDate: ' + status.expiryDate + '\n';
        }
        else {
            document.getElementsByClassName('status')[0].innerHTML =
                'Status is Unknown';
        }
    });
};

app.showMainScreen = function() {

    // Create some dummy HTML page (for testing).
    // Your content, somewhere, has a "Manage Subscription" button, right?

    document.getElementsByClassName('app')[0].innerHTML =
        '<h1>Demo</h1><p><a href="#" class="manage-subscription">Manage your subscription</a></p><pre class="status"></pre>';

    // Make sure this button opens the subscription manager:
    // nonRenewing.openSubscriptionManager();

    var button = document.getElementsByClassName('manage-subscription')[0];
    button.addEventListener('click', function(event) {
        console.log('showMainScreen -> openSubscriptionManager');
        event.preventDefault();
        nonRenewing.openSubscriptionManager();
    });
};

app.initialize();
