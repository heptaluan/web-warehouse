


## Webpack 和 Rollup 有什么不同

2017年4月初，Facebook 将一个巨大的 pull 请求合并到了 React 主分支(master)中，将其现有的构建流程替换为基于 Rollup，这一举动促使一些人产生很大的疑惑“React 为什么选择 Rollup 而抛弃 webpack”，难道webpack要跌下神坛了？

Webpack 是目前使用最为火热的打包工具，没有之一，每月有数百万的下载量，为成千上万的网站和应用提供支持。相比之下，Rollup 并不起眼。但 React 并不孤单 – Vue，Ember，Preact，D3，Three.js，Moment 以及其他许多知名的库也使用 Rollup 。世界到底怎么了？为什么我们不能只有一个大众认可的 JavaScript 模块化打包工具？

Webpack 始于2012年，由 Tobias Koppers 发起，用于解决当时现有工具未解决的的一个难题：构建复杂的单页应用程序(SPA)。特别是 webpack 的两个特性改变了一切：

第一个特性：代码拆分(Code Splitting)

代码拆分也就是说我们可以将应用程序分解成可管理的代码块，可以按需加载，这意味着用户可以快速获取网站内容，而不必等到整个应用程序下载和解析完成。

第二个特性：各式各样的加载器（loader）

不管是图像，css，还是 html ，在 Webpack 看来一切都可作为模块，然后通过不同的加载器 loader 来加载它们。

ES6 发布之后，其中引入的模块机制使得静态分析成为了可能，于是 Rollup 发布了：其中 Rollup 有两个特别重要的特性，第一个就是它利用 ES2015 巧妙的模块设计，尽可能高效的构建出能够直接被其他 Javascript 库的。另一个重要特性叫做 tree-shaking，这个特性可以帮助我们将无用代码（即没有使用的代码）从最终的目标文件中过滤掉。

紧接着 Webpack2 发布，仿照 Rollup 增加了 tree-shaking。 在之后， Webpack3 发布，仿照 Rollup 又增加了 Scope Hoisting。在在之后， Parcel 发布了一个快速、零配置的打包工具。于是，Webpack4 仿照 Parcel 发布了。

说了这么多，工作中我们到底该用哪个工具？

对于应用使用 webpack，对于类库使用 Rollup。如果我们需要代码拆分(Code Splitting)，或者我们有很多静态资源需要处理，再或者我们构建的项目需要引入很多 CommonJS 模块的依赖，那么 webpack 是个很不错的选择。如果您的代码库是基于 ES2015 模块的，而且希望我们写的代码能够被其他人直接使用，我们需要的打包工具可能是 Rollup。