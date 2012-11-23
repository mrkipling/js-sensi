#js-sensi

* **Author**: [Bradley Abrahams](https://github.com/mrkipling)

##What is js-sensi?

I was inspired by the work of [@jakiestfu](https://github.com/jakiestfu) when he released [Sparky.js](http://sparkyjs.com "Sparky.js homepage") upon the world. I immediately saw great potentional in what he was trying to achieve: a no-frills, well-defined and structured JS framework - putting the organised fun (and sanity) back into JavaScript.

I have been muddling along with a custom $.feature function which controls which JS should be executed and when, even (especially?) when dealing with a compiled JS files. It works fine, but I've always thought that there must be more. [@jakiestfu](https://github.com/jakiestfu) showed me more!

The only problem was, the way that [@jakiestfu](https://github.com/jakiestfu)'s work is a bit different to mine. And that's just an inevitablity - there is no one "right" way to do things, especially in 2012. Front-end development is a cruel and ever-changing mistress.

He encouraged customisation. So the same night after reading the article, I went home from work (on a Friday no less) and created a rough draft of how I would like his super-structured framework to work (in a few hours). So please bear with me if it's super-rough around the edges.

##Using this

Ultimately I would like this to be the "JS scaffolding" that I use on most of my web projects (although admittedly it has a way to go). The way that **I** (and this JS scaffold work) is as follows:

* You have PAGES, and each page either has some code that should be excuted when the DOM is ready, or it doesn't.

* You have FEATURES (e.g. an "attachment uploader") that you might want to apply to a particular page (features being generic / reusable / applicable to multiple pages).

* The 'page' is available as a meta element in the header. That's how we know which page init function to call. The page is just meta[name=page][context=pagename] - so where pagename=page1 (this is an example pagename from the test folder), Sparkles.Pages.page1.init() gets called. Which in the example calls another function within the namespace. No other extra crap gets called. It's a nice (if poorly explained) way of ensuring that you only execute certain code on certain pages.

* I liked the more structured approach of having an init() function for something that you want to call, so if you add a page or feature in the meta tags, their respective init functions will be called first. You are responsible for calling any other functions from within this function.

* This script allows you to split pages and features into their own JS files and still fit into this framwork (see test/index.html, and associated JS files, for examples of how to create "page"-specific code and a "feature")

* I also really liked the Utils.settings stuff, so that went in with a few modifications. Being able to tell easily what 'page' you are on and who the currently logged in user is - that is very useful. Same with the console.log wrapper. I can see how this could be expanded upon as the site and requirements grow. Why think small with any of this? Get the structure in place first; then in a few months time the code might not want to make you drink 8 cups of coffee every morning and secretly cry when you don't think that anybody is looking, becase a somewhat (if not perfect) structure is already in place.

* I moved the Sparky.utils.setting.debug bool into DEBUG (much shorter!) into the main template as a global (DEBUG) as that is easier to set automatically in a template when using a framework. DEBUG is now used everywhere.

##Why not just use Sparky?

Sparky is fantastic, and if that was my only option then I would be all over it. However, I know how I like to write JS code and I had a spare Friday evening (and the skills to change code! fancy that) so I created something that is more suited to my particular needs and development style (no AJAX wrapper, and controller/action stuff removed in favour of pages and features, amongst other things).

I don't expect my modification to be useful to many people but me. It would be great if there were people out there that found it useful in some way, but mostly, it's just my (very similar to Sparky, albeit tweaked to favour my particular dev style) interpretation of what I think makes a good JS scaffold.

That said, it is very much a work in progress. It is 2-3 hours of work piggy-backed on top of somebody elses much more well-thought out work. I hope (and plan, through usage) to make it more awesome over time. I think that it is ready for smaller projects already, so I imagine that it will just grow over time.

##Why am I rambling so much?

I got home from work, drank some mostly-Belgian beers, and decided to hack away for most of the evening at my interpretation of Sparky.js, which I read about at work (and was inspired).

I like this kinda stuff. New ways to structure javascript? That's pretty exciting.

##Why is it called js-sensi?

Offical line: it's a sensible way to structure your JavaScript files. (as in, "sensi"-ble)

Unofficial-line: you're a front-end developer; you can probably use your imagination.
