# cre

Micro-framework for constructing DOM nodes.

`cre` is, effectively, a better `document.createElement`, one that will also
work as `document.createDocumentFragment` when given an array of nodes to
insert into the fragment, or `document.createTextNode` when given an array
of only one string.

Its interface is similar to [crel][], which I only found by searching for names
I might give this.

[crel]: https://github.com/KoryNunn/crel

## Usage

`cre` works best when you're passing it to `appendChild` or `insertBefore`.
`cre` also works best when you use `cloneNode` with a templatized node, rather
than constructing a new node from scratch every time.
