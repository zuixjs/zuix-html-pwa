/* global zuix */
let drawerLayout;
let viewPager;
let topicIndicator;
let topicButtons;

zuix.using('script', './service-worker.js');
zuix.using('style', '//genielabs.github.io/zkit/css/flex-layout-attribute.min.css');
zuix.using('style', './index.css');

zuix.$.find('.profile').on('click', function() {
  if (drawerLayout) drawerLayout.open();
});

window.options = {
  drawerLayout: {
    autoHideWidth: -1,
    drawerWidth: 280,
    ready: function() { drawerLayout = this; this.close(); }
  },
  viewPager: {
    enablePaging: true,
    on: {
      'page:change': function(e, page) {
        syncPageIndicator(page);
        // show header/footer
        if (viewPager) {
          const p = viewPager.get(page.in);
          zuix.context(p).show();
        }
      }
    },
    ready: function() {
      viewPager = this;
    }
  },
  topicIndicator: {
    enablePaging: true,
    ready: function() {
      topicIndicator = this;
    }
  },
  autoHidingBars: {
    header: 'header-bar',
    footer: 'footer-bar',
    height: 56,
    on: {
      'page:scroll': function(e, data) {
        zuix.componentize();
      }
    }
  },
  content: {
    css: false
  }
};

// Callback when the 'header' context is ready,
// that means that the 'layout/header' was loaded
zuix.context('header', function() {
  const view = zuix.$(this.view());
  // handle 'topic' buttons click (goto clicked topic page)
  topicButtons = view.find('.topics').children().each(function(i, el){
    this.on('click', function(e) {
      if (viewPager) viewPager.page(i);
    });
  });
  // open drawer when the profile icon is clicked
  view.find('.profile').on('click', function() {
    if (drawerLayout) drawerLayout.open();
  });
});

function syncPageIndicator(page) {
  if (topicButtons) {
    topicButtons.eq(page.out).removeClass('active');
    topicButtons.eq(page.in).addClass('active');
  }
  if (topicIndicator) topicIndicator.page(page.in);
}

/*
// set @lib to load components from my laptop ( Dev mode ON =) )
zuix.store("config", {
  "libraryPath": "http://192.168.2.104:8080/lib/"
});
*/

// Turn off debug output
window.zuixNoConsoleOutput = true;

/*
const width = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;
const w = -(width/2);
zuix.lazyLoad(true, w);
*/
