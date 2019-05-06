Sixcycle Take Home.

Simply run 'npm install' to install all the node_modules.

Then 'npm start'.

That should be it!

MESSAGE FROM THE DEVELOPER:
A few quick notes.

MISSING FEATURES
First and foremost this is currently missing properly modularized CSS and an alphabetized result set. Some detail on why below:

I was unfortunately on a MegaBus traveling home from Philadelphia during the entirety of the allotted question time. I did my best to review the project, but internet is spotty on those things and so I was unable to install packages and boot it up for a proper review.

Once of the main questions I would have asked is what 'properly scoped' CSS meant in the context of this project. Since it is using React 15.5 I would need to eject to achieve properly modularized CSS. Since that is an irreversible action I would not do that without first asking. As such I simply defined classNames in the 'project-global-styles' for "themeatic" styling and then inside each component's directory with a separate file to override based on a root className for that component.

The second question I would have asked is the preferred method to achieve an alphabetized search result. From what I can see the API does not provide that option. Since the APIs response for search is paginated all pages would have to be pulled in order to achieve a proper alphatized response. If a user types in a single letter (e.g. 'B') and hits submit that equates to 85473 results in 4274 pages. An amount of data that is excessive to say the least.

ECMA NOTES
STRING.startsWith not IE friendly
used backtick strings not IE friendly
used const / let
used ... spread
used Object.assign not IE friendly

ADDITIONAL FEATURES
I have been building the page with the intent of adding additional search parameters / filters that the API accepts. E.g. type of search (movie, tv, person etc.), genre (when applicable), and paginated movement are the three key ones that are prepped and just need a bit more work.

The search is currently memoizing queries in the store so that a repeat call is avoided when the same search is made.

I've constructed some basic unit tests for the components I created, as well as a few prototypes / 'classes' to help with code reuse

THANK YOU
I will likely continue to finish the additional features I'm in the middle of (noted above) on the 'dev' branch, but will keep this master branch locked as the deadline delivered product. Thanks for your time and consideration. I look forward to hearing from you soon.
