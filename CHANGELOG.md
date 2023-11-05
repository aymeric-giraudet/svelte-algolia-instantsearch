# [0.11.0](https://github.com/aymeric-giraudet/svelte-algolia-instantsearch/compare/v0.10.2...v0.11.0) (2023-11-05)


### Features

* **InstantSearch:** add remaining props ([87caa6b](https://github.com/aymeric-giraudet/svelte-algolia-instantsearch/commit/87caa6bc6207de87a51f8a12c6a75cfe190642e8))



## [0.10.2](https://github.com/aymeric-giraudet/svelte-algolia-instantsearch/compare/v0.10.1...v0.10.2) (2023-09-27)



## [0.10.1](https://github.com/aymeric-giraudet/svelte-algolia-instantsearch/compare/v0.10.0...v0.10.1) (2023-09-15)


### Bug Fixes

* component would fail to load when using an instantsearch adapter ([#16](https://github.com/aymeric-giraudet/svelte-algolia-instantsearch/issues/16)) ([8926e29](https://github.com/aymeric-giraudet/svelte-algolia-instantsearch/commit/8926e29fcc5c75f33e14a6b18e65bf632d61cbd6))



# [0.10.0](https://github.com/aymeric-giraudet/svelte-algolia-instantsearch/compare/v0.9.2...v0.10.0) (2023-09-10)


### Features

* introduce routing ([2713ff6](https://github.com/aymeric-giraudet/svelte-algolia-instantsearch/commit/2713ff6d49650bf80d52df6c6c9779c83e99fa68))



## [0.9.2](https://github.com/aymeric-giraudet/svelte-algolia-instantsearch/compare/v0.9.1...v0.9.2) (2023-09-10)


### Bug Fixes

* types in package.json ([661e4d5](https://github.com/aymeric-giraudet/svelte-algolia-instantsearch/commit/661e4d5a2022d8f840c96b7c55c73265bf8378a8))



## [0.9.1](https://github.com/aymeric-giraudet/svelte-algolia-instantsearch/compare/v0.9.0...v0.9.1) (2023-09-10)


### Bug Fixes

* dist was not included in package ([491a675](https://github.com/aymeric-giraudet/svelte-algolia-instantsearch/commit/491a67532fc18859e086f25b6ca914e4a93fc636))



# [0.9.0](https://github.com/aymeric-giraudet/svelte-algolia-instantsearch/compare/v0.8.0...v0.9.0) (2023-08-31)


### Bug Fixes

* added svelte-kit as peerDep ([cadafe3](https://github.com/aymeric-giraudet/svelte-algolia-instantsearch/commit/cadafe329f97ea58fe4ec38538cb6ab91c1f90c5))


### Features

* **InfiniteHits:** added widget ([7a93538](https://github.com/aymeric-giraudet/svelte-algolia-instantsearch/commit/7a935383a5b1af1200deba01c9eedafcc88c153d))



# [0.8.0](https://github.com/aymeric-giraudet/svelte-algolia-instantsearch/compare/v0.7.0...v0.8.0) (2023-08-20)


### Features

* add additionalWidgetProps and default widget types ([58a4494](https://github.com/aymeric-giraudet/svelte-algolia-instantsearch/commit/58a44948c780f8f955f47f17bb1ec862f0bb6529))
* add Breadcrumb and HierarchicalMenu ([0cc9a0d](https://github.com/aymeric-giraudet/svelte-algolia-instantsearch/commit/0cc9a0da489ec0f68010ba92296c591ce51fe624))
* add CurrentRefinements, Menu and RangeInput ([5f20539](https://github.com/aymeric-giraudet/svelte-algolia-instantsearch/commit/5f2053918d8c3b8c5ab778ab9466f01dfd4b95d3))
* add Index component ([716ef3b](https://github.com/aymeric-giraudet/svelte-algolia-instantsearch/commit/716ef3ba8aa8a2764631481e8a1562948b81d3f7))
* added Highlight and Snippet components ([a5e5ff5](https://github.com/aymeric-giraudet/svelte-algolia-instantsearch/commit/a5e5ff5519840e599a90f7dcfb91f0d7d2490471))
* **ToggleRefinement:** now able to specify display label ([47d1102](https://github.com/aymeric-giraudet/svelte-algolia-instantsearch/commit/47d1102831deac50be6aa81d42198de53e1ffd07))



# [0.7.0](https://github.com/aymeric-giraudet/svelte-algolia-instantsearch/compare/v0.6.1...v0.7.0) (2023-02-04)


### Features

* **components:** bridge the API gap with RISH ([99a50a3](https://github.com/aymeric-giraudet/svelte-algolia-instantsearch/commit/99a50a3b569181a35407e2eb6838ba82133d5944))
* **Configure:** add widget ([f139846](https://github.com/aymeric-giraudet/svelte-algolia-instantsearch/commit/f13984682ceb6bc60ec812d18ff69c820b664553))
* **Pagination:** API fully implemented ([149d237](https://github.com/aymeric-giraudet/svelte-algolia-instantsearch/commit/149d2376e787e11e4196b466fee06549fb8b5047))
* **SortBy:** add widget ([5a89ac1](https://github.com/aymeric-giraudet/svelte-algolia-instantsearch/commit/5a89ac1185b92c6dcccba1262e15ca73a57639f6))



## [0.6.1](https://github.com/aymeric-giraudet/svelte-algolia-instantsearch/compare/v0.6.0...v0.6.1) (2023-01-17)


### Bug Fixes

* instantsearch.js in noExternal ([2ad74a5](https://github.com/aymeric-giraudet/svelte-algolia-instantsearch/commit/2ad74a583bdc95cbb5c51ef8704192e8ebb028ee))
* **ssr:** only set initialResults if data includes index as key ([d638e7b](https://github.com/aymeric-giraudet/svelte-algolia-instantsearch/commit/d638e7bfa54a4abb58dde758f55fab47ba8ca469))



# [0.6.0](https://github.com/aymeric-giraudet/svelte-algolia-instantsearch/compare/v0.5.0...v0.6.0) (2023-01-17)


### Features

* **ClearRefinements:** translations and classes ([739649a](https://github.com/aymeric-giraudet/svelte-algolia-instantsearch/commit/739649ad522ac1ad810ebd9ccfa3b07f20de1275))
* expose instant search instance via `getInstantSearchContext` ([2b4b0de](https://github.com/aymeric-giraudet/svelte-algolia-instantsearch/commit/2b4b0de28b9f1c39d1f064219494e0eb9258035e))
* support SSR ([63bd503](https://github.com/aymeric-giraudet/svelte-algolia-instantsearch/commit/63bd5036f76b1f57a5d5beb69ce931446cda895d))
* **ToggleRefinement:** directly expose types from instantsearch ([b31407c](https://github.com/aymeric-giraudet/svelte-algolia-instantsearch/commit/b31407c62c36c449e425c42930c56c7f38e810d9))



# 0.5.0 (2023-01-14)


### Features

* **InstantSearch:** add `stalledSearchDelay` ([2504079](https://github.com/aymeric-giraudet/svelte-algolia-instantsearch/commit/2504079c1b8dd08802517e3a5b9ec65ed568ec1f))



# 0.4.0 (2023-01-14)


### Features

* **ToggleRefinement:** add component ([df05fff](https://github.com/aymeric-giraudet/svelte-algolia-instantsearch/commit/df05fffe2e0a1b3c7d411f9bbfb9b9268579b78c))



# 0.3.0 (2023-01-14)


### Features

* **ClearRefinements:** added component ([d05c586](https://github.com/aymeric-giraudet/svelte-algolia-instantsearch/commit/d05c586a0e68112a976ab046b05731a2b232b558))



# 0.2.0 (2023-01-14)


### Features

* **Pagination:** added rest of navigation links ([c29f15e](https://github.com/aymeric-giraudet/svelte-algolia-instantsearch/commit/c29f15ea54ca4880feb2b78ab8fd1d9d89eea914))



