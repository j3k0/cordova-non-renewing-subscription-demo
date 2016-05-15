var app = {
    initialize: function() {
        console.log('listening to deviceready');
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function() {
        console.log('initializing the nonRenewing plugin');
        nonRenewing.initialize({
            products: []
        });
    }
};

app.initialize();
