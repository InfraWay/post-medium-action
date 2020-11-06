## meta-marked
#### The [marked](http://github.com/chjj/marked) markdown processor for Node.js with support for [YAML](http://yaml.org/) metadata

[![Dependency Status](https://david-dm.org/j201/meta-marked.svg)](https://david-dm.org/j201/meta-marked)

Just a quick extension I needed for processing markdown in Node. Props to Christopher Jeffrey for his excellent markdown processor 'marked'.

The `meta-marked` function behaves exactly the same as [`marked`](http://github.com/chjj/marked#usage), except for the following:

- Instead of returning a parsed string, `meta-marked` returns an object with the following properties:
	- `meta` contains the metadata object or `null` if metadata isn't found
	- `html` contains the parsed HTML
	- `markdown` contains the text of the markdown section of the string
- `metaMarked.noMeta` is a reference to the `marked` function, so it can be used to avoid parsing metadata.

In order to include metadata in a document, insert YAML at the top of the document surrounded by `---` and `...`. Note that if the given string doesn't start with `---`, it will not be interpreted as having metadata.

### Example

```
---
Title:   My awesome markdown file
Author:  Me
Scripts:
    - js/doStuff.js
    - js/doMoreStuff.js
...

##Header
Regular text and stuff goes here.
```

You can also use the approach below, which will result in a very nice data table at the top of your markdown when viewing the file GitHub:

```
---
Title:   My awesome markdown file
Author:  Me
Scripts:
    - js/doStuff.js
    - js/doMoreStuff.js
---

##Header
Regular text and stuff goes here.
```

Both of the above will result in the following output:

```
{
	"meta": {
		"Title": "My awesome markdown file",
		"Author": "Me",
		"Scripts": [
			"js/doStuff.js",
			"js/doMoreStuff.js"
		]
	},
	"html": "<h2>Header</h2>\n<p>Regular text and stuff goes here.</p>\n",
	"markdown": "\n\n##Header\nRegular text and stuff goes here."
}
```

###Testing

```
npm test
```

---

Licensed under [the MIT License](http://opensource.org/licenses/MIT). © 2013-2014 j201
