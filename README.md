Bibtex Citations Gitbook Plugin
==============

This plugins requires gitbook `>=2.0.0`.

### Install

Add this to your `book.json`, then run `gitbook install`:

```
{
    "plugins": [
        "bibtex"
    ],
    "pluginsConfig": {
      "bibtex": {
        "bibliography": "bibliography.bib"
      }
    }
}

```

### Usage

The plugin expects a `literature.bib` file in your books root folder.
You can use the bibtex keys defined within the file to reference the literature.

```
{{ "some-key" | cite }}
```

You can also add a table of references in last file through:

```
{% references %} {% endreferences %}
```

Only used literature is included in the table of references. They are ordered by the usage within the text.


