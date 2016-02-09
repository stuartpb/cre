As a counter-example, Here's what the first two examples in README.md would look like without `cre`:

```js
var templateTabIcon = document.createElement('img');
templateTabIcon.className = 'tabicon';
var templateTabLink = document.createElement('a');
templateTabLink.className = 'tablink';
var templateTabListItem = document.createElement('li');
templateTabListItem.className = 'tablist-item';
var templateTabStash = document.createElement('div');
templateTabStash.className = 'tabgroup tabstash';
var templateFlap = document.createElement('div');
templateFlap.className = 'flap';
var templateTabList = document.createElement('ul');
templateTabList.className = 'tablist';
```

```js
function createTabListItem(tab) {
  var tabIcon = templateTabIcon.cloneNode();
  tabIcon.src = tab.icon || platform.faviconPath(tab.url);

  var tabLink = templateTabLink.cloneNode();
  tabLink.href = tab.url;
  tabLink.appendChild(tabIcon);
  tabLink.appendChild(document.createTextNode(tab.title));

  var listItem = templateTabListItem.cloneNode();
  listItem.appendChild(tabLink);

  /* (event listeners ommitted for brevity) */

  return listItem;
}
```

This is pretty much exactly what `cre` does under the hood. (The only real difference is that, instead of being appended individually, the two nodes appended to `tabLink` get appended to a single document fragment, which then gets appended to `tabLink`.)
