(function() {
  if (!window.cordova)
    return;

  // Define and export nonRenewing
  var nonRenewing = window.nonRenewing = {};

  var className = function(names) {
    if (typeof names == 'string')
      return 'cordova-non-renewing-' + names;
    else // array
      return names.map(className).join(' ');
  };

  var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
  };

  function escapeHtml(string) {
    return String(string).replace(/[&<>"'\/]/g, function (s) {
      return entityMap[s];
    });
  }

  var View = function(parent) {
      this.el = document.createElement('div');
      this.el.className = className('root');
      this.el.style.position = 'absolute';
      this.el.style.top = 0;
      this.el.style.bottom = 0;
      this.el.style.left = 0;
      this.el.style.right = 0;
      this.el.style.backgroundColor = 'rgba(0,0,0,0.5)';
      this.hide();
      parent.appendChild(this.el);
  };

  View.prototype.show = function() {
    this.el.style.display = 'block';
  };

  View.prototype.hide = function() {
    this.el.style.display = 'none';
  };

  View.prototype.html = function(html) {
    this.el.innerHTML = html || '';
  };

  var Templates = {
    title: function(content, extraClass) {
      var cname = extraClass ? className("title", extraClass) : className("title");
      return '<h2 class="' + cname + '">' + content + '</h2>';
    },

    message: function(content, extraClass) {
      var cname = extraClass ? className("message", extraClass) : className("message");
      return '<p class="' + cname + '">' + content + '</p>';
    },

    closeButton: function() {
      var style =
        'text-decoration:none;color:#54c7fc';
      return '<p><a style="' + style + '" href="#" class="' + className('close') + '">Close</a></p>';
    },

    dialogBox: function(innerHTML) {
      var innerStyle =
         'position:absolute;' +
         'padding:1em;' +
         'left:2em; right:2em; top:5em; bottom:5em;' +
         'background-color:white;' +
         'border-radius:1em;' +
         'text-align:center';
      return '<div style="' + innerStyle + '">' + innerHTML + '</div>';
    },

    errorScreen: function(message) {
      var content = Templates.message(escapeHtml(message), 'error');
      return Templates.dialogBox(content + Templates.closeButton());
    }
  };

  View.prototype.bindEvents = function() {
    var that = this;
    document.getElementsByClassName(className('close'))[0].addEventListener('click', function(event) {
      event.preventDefault();
      that.hide();
    });
  };

  View.prototype.showError = function(err) {
    this.html(Templates.errorScreen(err));
    this.bindEvents();
    this.show();
  };

  var Controller = function(options) {
    store.verbosity = options.verbosity || store.DEBUG;
    this.expiryStore = new ExpiryStore(options.loadExpiryDate, options.saveExpiryDate);
    this.registerProducts(options.products);
  };

  Controller.prototype.registerProducts = function(products) {
    for (var i = 0; i < products.length; ++i) {
      store.register({
        id: products[i].id,
        type: store.NON_RENEWING_SUBSCRIPTION,
        duration: products[i].duration
      });
    }
  };

  // The subscription status needs to be stored on a server, linked to a user.
  // I won't assume anything about what you have in place.
  //
  // The lib will use user provided callbacks:
  //   - saveExpiryDate(expiryDate, function(err) {})
  //   - loadExpiryDate(function(err, expiryDate) { ... })
  var ExpiryStore = function(load, save) {
    this.load = load;
    this.save = save;
  };

  nonRenewing.initialize = function(options) {

    this.view = new View(document.body);

    if (true || !window.store) {
      this.view.showError('The in-app purchase plugin is not available.');
      return;
    }

    this.controller = new Controller({
      verbosity: options.verbosity,
      products:  options.products,
      view:      this.view
    });
  };

  nonRenewing.manage = function(options) {
    this.view.showLoading();
    this.controller.loadStatus(function(err, status) {
      if (err) {
        alert("ERROR: " + err);
        return;
      }
      this.view.showStatus(status);
    });
  };

  /*
  Method "manageSubscription":
  This opens a dialog over the existing content (in HTML) which shows
  the user's subscription status and expiry date
  a button to subscribe / renew / extend the subscription.
  Click on Subscribe/renew will open the list of products, with a Buy button for each.
  Click "Buy" will initiate the native purchase process.
  The above dialogs provides a default basic CSS that can be customized.
  Every aspects of the purchase flow is managed internally by the lib.
  Method "initialize":
  Requires the list of product IDs.
  Requires an adapter to an user account backend.

  Concerning the "user account" backend.


  make sure my code allows to offload rendering the list of products to the server by "POST"ing the products details to a URL that will return the HTML. This can be the general interaction pattern.
  */
}).apply(this);
// vim: ts=2:sw=2:et:
