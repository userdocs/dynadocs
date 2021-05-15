# Dynamic docs

This file is generated from this markdown file:

https://userdocs.github.io/dynadocs/readme.md

## Introduction

The ideas behind this concept are:

- All content is written in markdown.
- Content is loaded from a separate file and not coded into the index.html
- The page is rendered in markdown in real time in the browser.
- Special magic variables are interpreted into GitHub latest release URLs

## Self updating URLs

This will work with any GitHub repo that has releases with this API.

`https://api.github.com/repos/username/reponame/releases`

| Applications |                    Download                     |   Version   |
| :----------: | :---------------------------------------------: | :---------: |
|  Libtorrent  |      {{REPOID=arvidn/libtorrent}{ASSET=0}}      | Release URL |
|  Libtorrent  | {{REPOID=arvidn/libtorrent}{TAG=v1.2.[0-9]{2}}} |     Tag     |

## Addons and features

### Custom containers

::: note
Note: Important note goes here.

Multi line

is

Supported

:::

::: warning
Warning: Important warning goes here.
:::

::: caution
Caution: Important alert goes here.
:::
