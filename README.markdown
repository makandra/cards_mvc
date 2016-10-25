== CardsMVC

Sample project to evaluate different JavaScript frameworks in the spirit of [TodoMVC](http://todomvc.com/).

The idea was to have a small app that demonstrates the following concepts:

- How to integrate with a Rails app
- How to use a router (see top navigation + show views etc)
- How to do search
- How to do pagination
- How to have some global state (Sign in / sign out, with changing permissions)
- How to to forms with server-side validations
- How to have a complex component (tab component) in and outside of forms
- How to use custom form elements (the wysiwyg editor)
- How to intergrate an external JavaScript library (the wysiwyg editor)
- How to do flash notifications


The sample implementations are in different states of completeness and some of them have obvious bugs.
The most complete one is the Angular 1 implementation.


How to run
----------

First do a
```
bundle install
rake db:migrate
rake db:seed
```

Then run a rails server, using
```
rails s
```


Angular
-------

The most complete implementation.

JavaScript code lives in `app/assets/javascript/angular`.
Templates live in `app/view/angular`.

No build process needed.


Ember
-----

Use the angular sign-in / sign-out to see everything.

JavaScript code and templates live in `em/app`.

Build process:

Go into `/em`, then:
```
npm install
npm install bower -g
bower install
npm run-script start
```

This is currently broken for me, maybe there is some npm or node version conflict...


Riot
----

Use the angular sign-in / sign-out to see everything.

Javascript code and templates live in `app/assets/javascript/riot`.

No build process needed.


React
-----

Javascript code and templates live in `app/assets/javascript/react`.

No build process needed.

Second most complete variant.


Angular 2
---------

The angular 2 source code uses babel + some extensions, since the TypeScript compiler was not very
good at the time I evaluated this. It might be a better fit now.

JavaScript code lives in `ng2/src`. Templates live in `app/views/ng2`.

Build process:

Go to `ng2`, then:
```
npm install
npm run-script watch
```


Vue
---

JavaScript code lives in `vue/src`, templates live in `app/views/vue`.


Build process:

Go to `vue`, then:
```
npm install
npm run-script watchify
```


