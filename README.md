# zuix-html-pwa

A Progressive Web App template with a responsive layout.

Bare template with no build tools, just HTML, JavaScript and CSS.


## Features

- **P**rogressive **W**eb **A**pp
- Responsive **touch-first** layout with:
    * collapsing header/footer
    * drawer layout (side menu panel)
    * example news list adapter with lazy-loaded items
- Component-based web development with zUIx.js
- In-Browser bundler to pack all resources in a single file and boost-up loading speed


![LightHouse Report](https://genielabs.github.io/zuix-html-pwa/images/lighthouse-report.png)

###### Demo Website

https://genielabs.github.io/zuix-html-pwa

# How to use this template

The **source** folder contains the *development* version of the website, while
the **docs** folder the *production* bundled version.

## Basic usage

If you have *Node.js* installed you can use the integrated web server which will serve
files from the *source* folder.
```
npm start
```

If you are not using *Node.js* just point your development web server to the
*source* folder.


## What is web page/app bundling?

Bundling is the process of collecting all resources used in a page and then compiling them into a single, optimized file.

This will drastically reduce the number of network requests the browser will have to do to complete the page loading and that will so load the page faster.

There are actually two way of doing this:

- **In-Browser** bundler:
this method does not require any build tool nor plugins, it just works in the browser as-is.

- **Web-Starter** bundler:
is the [zuix-web-starter](https://github.com/genemars/zuix-web-starter) bare template, with a bunch of extra features and enhancements. It requires *Node.js* to be installed.

this template is already configured for **in-browser** bundling.

## In-Browser bundling

When the website is ready for production you can decide to bundle it in order
to gain better performances. All of its components and resources will be
crunched into a single file and loaded from memory rather than from network/localhost.

### Step by step guide

Open the development website and generate the application bundle by typing in the
**browser console** the command

```javascript
zuix.saveBundle()
```

This will create and save the **app.bundle.js** file to the *Downloads* folder.

Copy all files from the *source* folder to the production folder (*docs*) with
the exception of *components*, *content*, *layout* and *index.css*.

These folders contain *zuix* components and content that are already packed
in the *app.bundle.js* file.

Copy *app.bundle.js* to the *production* folder.
Edit the `index.html` file in the *production* folder and in the `head` section
replace the `js/zuix-bundler.min.js` script import with `app.bundle.js`.

```html
<script src="js/zuix.min.js"></script>
<script src="app.bundle.js"></script>
```

You can remove the `js/zuix-bundler.*` files from the *production* folder.


### Remarks

When using *lazy-loading* only components loaded so far will be included in the bundle (incremental bundling).

To force inclusion of all components/resources used in the page, issue the following commands in the console:

```javascript
// disable lazy-loading
zuix.lazyLoad(false)
// force loading of all components
zuix.componentize()
// create the bundle
zuix.saveBundle()
```

Also external JavaScript libraries and CSS files can be included in the page bundle.
In order to achieve this, remove the `<script src="..."></script>` or `<link rel="stylesheet">`
and use the method `zuix.using(...)` instead to load the script/css.

```javascript
// Loading a .css style
const flaCss = 'https://cdnjs.cloudflare.com/ajax/libs/flex-layout-attribute/1.0.3/css/flex-layout-attribute.min.css';
zuix.using('style', flaCss, function(res, styleObject) {
    console.log("Added Flex Layout Attributes CSS.", res, styleObject);
});
// Loading a .js script
const momentJs = 'https://momentjs.com/downloads/moment.js';
zuix.using('script', momentJs, function(res, scriptObject){
    console.log("Added Moment.js.", res, scriptObject);
});
```

Place the *using* commands preferably at the top of `index.js`. You can remove
from the *production* folder all files imported with the *using* command.


# Further reading

- [zUIx.js](https://genielabs.github.io/zuix)
- [Progressive Web App](https://developers.google.com/web/progressive-web-apps)
- [Service Workers](https://developers.google.com/web/fundamentals/primers/service-workers)
