import { CreatePostDto } from 'src/posts/dto/create-post.dto';

export const postData: CreatePostDto[] = [
  {
    title: 'Vue CLI 3.0 is here',
    short_description:
      'Over the past few months, we’ve been working really hard on the next generation of Vue CLI, the standard build toolchain for Vue applications. Today we are thrilled to announce the release of Vue CLI 3.0 and all the exciting features that come with it.',
    description:
      'We want Vue CLI to be a platform the community can built upon, so we designed the new version with a plugin architecture from day one. A Vue CLI 3 plugin can be very powerful: it can inject dependencies and files during the app’s scaffolding phase, and tweak the app’s webpack config or inject additional commands to the CLI service during development. Most of the built-in integrations like TypeScript are implemented as plugins using the same plugin API that is available to all community plugins. If you are interested in writing your own plugin, check out the plugin dev guide. In Vue CLI 3 we no longer have “templates” — instead, you can create your own remote preset to share your selection of plugins and options with other developers.',
    author: 'carloscdev',
    tags: ['web', 'frontend', 'vue'],
  },
  {
    title: 'Progressive Web Apps with React.js',
    short_description:
      'Progressive Web Apps take advantage of new technologies to bring the best of mobile sites & native apps to users. They’re reliable, fast, and engaging. They originate from a secure origin and load regardless of network state.',
    description:
      'There’s much new in the world of Progressive Web Apps (PWAs) and you might be wondering how compatible they are with existing architectures using libraries like React and JS module bundlers like Webpack. Does a PWA require a wholesale rewrite? What web performance metrics do you need to keep an eye on? In this series of posts I’ll share my experience turning React-based web apps into PWAs. We’ll also cover why shipping just what users need for a route & throwing out all other scripts are good ideas for fast perf.',
    author: 'carloscdev',
    tags: ['web', 'frontend', 'react'],
  },
  {
    title: 'Svelte / Sapper with Sass',
    short_description:
      'The Svelte-based web framework Sapper gives us a lot out of the box. Declarative routing, free SSR for every route, baked in support for API routes, and so much more. But if you want to use Sass or Stylus or another preprocessor, you’re on your own. ',
    description:
      'Make a global theme and variables/mixins I like to create a src/styles/ directory with global.scss and theme.scss. The theme.scss will contain variables and mixins which can be imported and used site-wide. The global.scss will also import theme.scss and will use some of those settings to set up the basic layout for the site.',
    author: 'carloscdev',
    tags: ['web', 'frontend', 'svelte'],
  },
  {
    title: 'The definitive Node.js handbook',
    short_description:
      'Note: you can get a PDF, ePub, or Mobi version of this handbook for easier reference, or for reading on your Kindle or tablet.',
    description:
      'Node.js runs the V8 JavaScript engine, the core of Google Chrome, outside of the browser. Node.js is able to leverage the work of the engineers that made (and will continue to make) the Chrome JavaScript runtime blazing fast, and this allows Node.js to benefit from the huge performance improvements and the Just-In-Time compilation that V8 performs. Thanks to this, JavaScript code running in Node.js can become very performant.',
    author: 'carloscdev',
    tags: ['web', 'backend', 'node'],
  },
  {
    title: 'Learning Python: From Zero to Hero',
    short_description:
      'For me, the first reason to learn Python was that it is, in fact, a beautiful programming language. It was really natural to code in it and express my thoughts.',
    description:
      'Another reason was that we can use coding in Python in multiple ways: data science, web development, and machine learning all shine here. Quora, Pinterest and Spotify all use Python for their backend web development. So let’s learn a bit about it.',
    author: 'carloscdev',
    tags: ['web', 'backend', 'python'],
  },
  {
    title: 'The Future of PHP',
    short_description:
      'On a forums like Stack Overflow people are suggesting that PHP is dead. Do they have a valid point, or could it be that they just don’t like PHP?',
    description:
      'If you take a simple look at the numbers PHP is definitely not dead. PHP is the most used server-side programming language by far. Approximately 75 percent of all webpages are powered by PHP. Take a look at the graph below and see how far PHP is ahead of its competition in terms of how often it’s used. It is fair to conclude that PHP isn’t dead based on this statistic since 75 percent is far too high number for a dead language!',
    author: 'carloscdev',
    tags: ['web', 'backend', 'php'],
  },
];
