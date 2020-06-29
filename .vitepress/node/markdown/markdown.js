"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMarkdownRenderer = void 0;
const markdown_it_1 = __importDefault(require("markdown-it"));
const parseHeader_1 = require("../utils/parseHeader");
const highlight_1 = require("./plugins/highlight");
const slugify_1 = require("./plugins/slugify");
const highlightLines_1 = require("./plugins/highlightLines");
const lineNumbers_1 = require("./plugins/lineNumbers");
const component_1 = require("./plugins/component");
const containers_1 = require("./plugins/containers");
const snippet_1 = require("./plugins/snippet");
const hoist_1 = require("./plugins/hoist");
const preWrapper_1 = require("./plugins/preWrapper");
const link_1 = require("./plugins/link");
const header_1 = require("./plugins/header");
const emoji = require('markdown-it-emoji');
const anchor = require('markdown-it-anchor');
const toc = require('markdown-it-table-of-contents');
exports.createMarkdownRenderer = (options = {}) => {
    const md = markdown_it_1.default({
        html: true,
        linkify: true,
        highlight: highlight_1.highlight,
        ...options
    });
    // custom plugins
    md.use(component_1.componentPlugin)
        .use(highlightLines_1.highlightLinePlugin)
        .use(preWrapper_1.preWrapperPlugin)
        .use(snippet_1.snippetPlugin)
        .use(hoist_1.hoistPlugin)
        .use(containers_1.containerPlugin)
        .use(header_1.extractHeaderPlugin)
        .use(link_1.linkPlugin, {
        target: '_blank',
        rel: 'noopener noreferrer',
        ...options.externalLinks
    })
        // 3rd party plugins
        .use(require('vpress-mdi-details').details)
        .use(require('vpress-mdi-details').mermaid)
        .use(emoji)
        .use(anchor, {
        slugify: slugify_1.slugify,
        permalink: true,
        permalinkBefore: true,
        permalinkSymbol: '#',
        permalinkAttrs: () => ({ 'aria-hidden': true }),
        ...options.anchor
    })
        .use(toc, {
        slugify: slugify_1.slugify,
        includeLevel: [2, 3],
        format: parseHeader_1.parseHeader,
        ...options.toc
    });
    // apply user config
    if (options.config) {
        options.config(md);
    }
    if (options.lineNumbers) {
        md.use(lineNumbers_1.lineNumberPlugin);
    }
    // wrap render so that we can return both the html and extracted data.
    const render = md.render;
    const wrappedRender = (src) => {
        ;
        md.__data = {};
        const html = render.call(md, src);
        return {
            html,
            data: md.__data
        };
    };
    md.render = wrappedRender;
    return md;
};
//# sourceMappingURL=markdown.js.map
