# cre

Micro-framework for constructing DOM nodes.

`cre` is, effectively, a better `document.createElement`, one that will also
work as `document.createDocumentFragment` when given an array of nodes to
insert into the fragment, or `document.createTextNode` when given an array
of only one string.

Its interface is similar to [FastMail][]'s [el][] function, or [crel][], which I only found by searching for names
I might give this.

[FastMail]: https://blog.fastmail.com/2012/02/20/building-the-new-ajax-mail-ui-part-2-better-than-templates-building-highly-dynamic-web-pages/
[el]: https://gist.github.com/neilj/1532562
[crel]: https://github.com/KoryNunn/crel

## Usage

`cre` works best when you're passing it to `appendChild` or `insertBefore`.
`cre` also works best when you use `cloneNode` with a templatized node, rather
than constructing a new node from scratch every time.
