/* global zuix */

let drawerLayout;
let viewPager;
let topicIndicator;
let topicButtons;

zuix.using('script', './service-worker.js');
zuix.using('style', '//zuixjs.github.io/zkit/css/flex-layout-attribute.min.css');
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
    headerBar: {
        ready: function() {
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
            showPage(0);
        }
    },
    footerBar: {
        ready: function(){
            const view = zuix.$(this.view());
            const buttons = view.find('button');
            buttons.each(function(i, el) {
                // TODO:
                this.on('click', function() {
                    buttons.removeClass('active');
                    this.addClass('active');
                    showPage(i);
                });
            });
        }
    },
    viewPager: {
        enablePaging: true,
        startGap: 36,
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
        startGap: 36,
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

function syncPageIndicator(page) {
    if (topicButtons) {
        topicButtons.eq(page.out).removeClass('active');
        topicButtons.eq(page.in).addClass('active');
    }
    if (topicIndicator) topicIndicator.page(page.in);
}

function showPage(i) {
    // show header top-box
    zuix.field('header-box')
        .children().hide()
        .eq(i).show();
    // show header bottom-box
    zuix.field('header-tools')
        .children().hide()
        .eq(i).show();
    // show page
    zuix.field('pages')
        .children().hide()
        .eq(i).show();
    if (viewPager) viewPager.refresh();
}

// Turn off debug output
window.zuixNoConsoleOutput = true;
