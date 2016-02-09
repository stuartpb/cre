# cre

Micro-framework for constructing DOM nodes.

`cre` is, effectively, a better `document.createElement`, one that will also work as `document.createDocumentFragment` when given an array of nodes to insert into the fragment, or `document.createTextNode` when given an array of only one string.

Its interface is similar to [FastMail][]'s [el][] function, or [crel][], which I only found by searching for names I might give this.

[FastMail]: https://blog.fastmail.com/2012/02/20/building-the-new-ajax-mail-ui-part-2-better-than-templates-building-highly-dynamic-web-pages/
[el]: https://gist.github.com/neilj/1532562
[crel]: https://github.com/KoryNunn/crel

## Usage

`cre` works best when you're passing it to `appendChild` or `insertBefore`. `cre` also works best when you use it to clone templatized nodes, rather than constructing new elements from scratch every time (because cloning DOM nodes is faster than creating elements from scratch).

## Examples

Here are just a few of the things you can do easily with `cre`, which would otherwise be [somewhat verbose and annoying](docs/counter-examples.md):

### Making template elements

(this example is taken [directly from the source code][dash7-12] for the [Tabalanche][] Chrome extension)

[dash7-12]: https://github.com/tabalanche/tabalanche-extension/blob/master/scripts/dashboard.js#L7-L12
[Tabalanche]: https://www.tabalanche.com/

```js
var templateTabIcon = cre('img.tabicon');
var templateTabLink = cre('a.tablink');
var templateTabListItem = cre('li.tablist-item');
var templateTabStash = cre('div.tabgroup.tabstash');
var templateFlap = cre('div.flap');
var templateTabList = cre('ul.tablist');
```

### Cloning and populating templates

(this example is also taken [directly from the source code][dash80] for the [Tabalanche][] Chrome extension)

[dash80]: https://github.com/tabalanche/tabalanche-extension/blob/master/scripts/dashboard.js#L80

```js
function createTabListItem(tab) {
  var tabIcon = cre(templateTabIcon,
    {src: tab.icon || platform.faviconPath(tab.url)});

  var tabLink = cre(templateTabLink, {href: tab.url},
    [tabIcon, tab.title]);

  var listItem = cre(templateTabListItem, [tabLink]);

  /* (event listener code omitted for brevity) */

  return listItem;
}
```

### Appending a text node to an element and manipulating it

```js
var statusMessage = cre([' This message will self-destruct in five seconds.'])
var paragraphs = document.getElementsByTagName('p');
var lastParagraph = paragraphs[paragraphs.length-1];
lastParagraph.appendChild(statusMessage);
setTimeout(function(){
  statusMessage.textContent = ' This message has self-destructed. Have a nice day.'
}, 5000);
```

### Creating a document fragment with spans of text and inserting it

```js
function payItForwardWarning(favorCount) {
  return cre(['You have ', cre('span.favor-count', favorCount*3), ' favors to pay forward'])
}

var alertTicker = document.getElementById('alerts');
var firstMiscThingInTicker = alertTicker.querySelector('.misc');
var freshWarning = payItForwardWarning(user.favorsReceived);
alertTicker.insertBefore(freshWarning, firstMiscThingInTicker);
```
