var bibtexParse = require('bibtex-parser-js');
var _ = require('lodash');
var fs = require('fs');
var bib;
var bibCount = 0;

module.exports = {
    filters: {
        cite: function(key) {
            var citation = _.find(bib, {'citationKey': key.toUpperCase()});
            if (citation !== undefined) {
                if (!citation.used) {
                    citation.used = true;
                    bibCount++;
                    citation.number = bibCount;
                }
                return '<a href="#cite-' + citation.number + '">[' + citation.number + ']</a>';
            } else {
                return "[Citation not found]";
            }
        }
    },
    hooks: {
        init: function() {
             bib = bibtexParse.toJSON(fs.readFileSync(this.options.pluginsConfig.bibtex.bibliography, 'utf8'));
        }
    },    

    blocks: {
        references: {
            process: function(blk) {
                var usedBib = _.filter(bib, 'used');
                var sortedBib = _.sortBy(usedBib, 'number');

                var result = '<table class="references">';

                sortedBib.forEach(function(item) {
                    result += '<tr><td><span class="citation-number" id="cite-' + item.number + '">' + item.number + '</span></td><td>';

                    if (item.entryTags.AUTHOR) {
                        result += formatAuthors(item.entryTags.AUTHOR) + ', ';
                    }
                    if (item.entryTags.TITLE) {
                        if (item.entryTags.URL) {
                            result += '<a href="' + item.entryTags.URL + '">' + item.entryTags.TITLE + '</a>, ';
                        } else {
                            result += item.entryTags.TITLE + ', ';
                        }
                    }
                    if (item.entryTags.BOOKTITLE) {
                        if (item.entryTags.BOOKURL) {
                            result += '<a href="' + item.entryTags.BOOKURL + '">' + item.entryTags.BOOKTITLE + '</a>, ';
                        } else {
                            result += '<i>' + item.entryTags.BOOKTITLE + '</i>, ';
                        }
                    }
                    if (item.entryTags.PUBLISHER) {
                        result += '<i>' + item.entryTags.PUBLISHER + '</i>, ';
                    }
                    if (item.entryTags.YEAR) {
                        result += item.entryTags.YEAR + '.';
                    }

                    result += '</td></tr>';
                });

                result += '</table>';

                return result;
            }
        }
    }
};



function formatAuthors (authorsString) {
    var authors = authorsString.split('and');

    if (authors.length > 3) {
        return authors[0] + ' <i>et al.</i>';
    } else {
        return authorsString;
    }
}
