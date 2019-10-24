/**
 * @file @example http://localhost:8080/api/markdown?file=/guides/event-handling
 */
import CommonMark from 'commonmark';
import {version} from 'inferno';
import {createElement} from 'inferno-create-element';
import fs from 'fs';
import path from 'path';
import Prism from 'prismjs';
import router from 'koa-router';
import xssFilters from 'xss-filters';

/**
 * @todo this issue is just here because we don't know the exact path the output on the host 
 *       but we can fix this later, currently it lazily checks to find which path has the files
 * @todo we could also solve this with a build script........
 */
const publicDocsPath = `/public/docs`;
const upOne = '../';
const upTwo = '../../';
const upThree = '../../../';
const upFour = '../../../../';
const devDocsPath = '../../docs';
let foundPath;
const pathsToTry = [
  `${upOne}`,
  `${upTwo}`,
  `${upThree}`,
  `${upFour}`,
  process.cwd(),
]
.map(basePath => path.join(__dirname, basePath, publicDocsPath))
.concat(process.env.NODE_ENV === 'development' ? [path.resolve(__dirname, devDocsPath)] : []);

export default router()
  .get('/release', async(ctx, next) => {
    const { file } = ctx.query;

    if (file.includes('..')) {
      return ctx.body = <p>Cannot access this path</p>;
    }

    ctx.body = await parseMarkDown(file);
  })
  .get('/api/markdown', async(ctx, next) => {
    const { file } = ctx.query;

    if (file.includes('..')) {
      return ctx.body = <p>Cannot access this path</p>;
    }

    ctx.body = await parseMarkDown(file);
  });

function findPathForFile(file) {
  let absPathToFile;

  if (!foundPath) {
    for (let index = 0; index < pathsToTry.length; index++) {
      const absPath = pathsToTry[index];
      const absPathToFileAttempt = path.resolve(absPath, `./${file}.md`);

      try {
        console.debug(`[findPathForFile] checking ${absPathToFileAttempt}`);
        if (fs.existsSync(absPathToFileAttempt)) {
          foundPath = absPath;
          console.debug(`[findPathForFile] FOUND at ${index}`);
          break;
        }
      } catch (readExistsException) {
        console.error({readExistsException});
      }
    }
  }

  absPathToFile = path.resolve(foundPath, `./${file}.md`);

  return absPathToFile;
}

/**
 * @todo can use promisify...
 */
async function parseMarkDown(file) {
  return new Promise((resolve) => {
    const absPathToFile = findPathForFile(file);

    fs.readFile(absPathToFile, 'utf-8', async(err, data) => {
      if (err) {
        console.error(err);
        if (process.env.DEV) {
          console.warn(`No document found at: "/docs${file}.md"`);
          return resolve(<p>No document found at: <b>/docs{file}</b></p>);
        }
        return resolve(<p>Documentation is under development.</p>);
      }

      const parser = new CommonMark.Parser();
      const renderer = new InfernoRenderer();
      data = data.replace(/\[version\]/g, version);
      const ast = parser.parse(data);
      const MarkdownResult = renderer.render(ast);

      resolve(MarkdownResult);
    });
  });
}

// JSX support
(function addJSXSupport() {
  let javascript = Prism.util.clone(Prism.languages.javascript);
  Prism.languages.jsx = Prism.languages.extend('markup', javascript);
  Prism.languages.jsx.tag.pattern = /<\/?[\w.:-]+\s*(?:\s+[\w.:-]+(?:=(?:("|')(\\?[\w\W])*?\1|[^\s'">=]+|(\{[\w\W]*?})))?\s*)*\/?>/i;
  Prism.languages.jsx.tag.inside['attr-value'].pattern = /=[^{](?:('|")[\w\W]*?(\1)|[^\s>]+)/i;
  let jsxExpression = Prism.util.clone(Prism.languages.jsx);
  delete jsxExpression.punctuation;

  jsxExpression = Prism.languages.insertBefore('jsx', 'operator', {
    'punctuation': /=(?={)|[{}[\];(),.:]/
  }, { jsx: jsxExpression });

  Prism.languages.insertBefore('inside', 'attr-value', {
    'script': {
      // Allow for one level of nesting
      pattern: /=(\{(?:\{[^}]*}|[^}])+})/i,
      inside: jsxExpression,
      'alias': 'language-javascript'
    }
  }, Prism.languages.jsx.tag);
})();

/**
 * Everything below is a port of react markdown renderer to inferno
 */
let typeAliases = {
  blockquote: 'block_quote',
  thematicbreak: 'thematic_break',
  htmlblock: 'html_block',
  htmlinline: 'html_inline',
  codeblock: 'code_block',
  hardbreak: 'linebreak'
};

let defaultRenderers = {
  block_quote: 'blockquote', // eslint-disable-line camelcase
  emph: 'em',
  linebreak: 'br',
  image: 'img',
  item: 'li', //link: 'a',
  paragraph: 'p',
  strong: 'strong',
  thematic_break: 'hr', // eslint-disable-line camelcase

  html_block: HtmlRenderer, // eslint-disable-line camelcase
  html_inline: HtmlRenderer, // eslint-disable-line camelcase

  list(props) {
    let tag = props.type.toLowerCase() === 'bullet' ? 'ul' : 'ol';
    let attrs = getCoreProps(props);

    if (props.start !== null && props.start !== 1) {
      attrs.start = props.start.toString();
    }

    return createElement(tag, attrs, props.children);
  },
  code_block(props) { // eslint-disable-line camelcase
    let html = Prism.highlight(props.literal, Prism.languages.jsx);
    let className = props.language && 'language-' + props.language;
    let code = createElement('code', {
      className: className,
      dangerouslySetInnerHTML: {
        __html: html
      }
    });

    return createElement('pre', getCoreProps(props), code);
  },
  code(props) {
    return createElement('code', getCoreProps(props), props.children);
  },
  heading(props) {
    return createElement('h' + props.level, getCoreProps(props), props.children);
  },
  link(props) {
    return createElement('a', {
      href: props.href,
      title: props.title,
      target: (props.href.startsWith('//') || props.href.startsWith('http') ? '_blank' : undefined),
      rel: 'noopener',
      literal: props.literal
    }, props.children);
  },
  text: null,
  softbreak: null
};

let coreTypes = Object.keys(defaultRenderers);

function getCoreProps(props) {
  return {
    'data-sourcepos': props['data-sourcepos']
  };
}

function normalizeTypeName(typeName) {
  let norm = typeName.toLowerCase();
  let type = typeAliases[norm] || norm;
  return typeof defaultRenderers[type] !== 'undefined' ? type : typeName;
}

function normalizeRenderers(renderers) {
  return Object.keys(renderers || {}).reduce(function(normalized, type) {
    let norm = normalizeTypeName(type);
    normalized[norm] = renderers[type];
    return normalized;
  }, {});
}

function HtmlRenderer(props) {
  let nodeProps = props.escapeHtml ? {} : { dangerouslySetInnerHTML: { __html: props.literal } };
  let children = props.escapeHtml ? [props.literal] : null;

  if (props.escapeHtml || !props.skipHtml) {
    return createElement(props.isBlock ? 'div' : 'span', nodeProps, children);
  }
}

function isGrandChildOfList(node) {
  let grandparent = node.parent.parent;
  return (
    grandparent && grandparent.type.toLowerCase() === 'list' && grandparent.listTight
  );
}

function addChild(node, child) {
  let parent = node;

  do {
    parent = parent.parent;
  } while (!parent.react);

  if (typeof child.type === 'function') {
    //child.type = child.type(child.props)
    parent.react.children.push(child.type(child.props));
  } else {
    parent.react.children.push(child);
  }
}

function reduceChildren(children, child) {
  let lastIndex = children.length - 1;
  if (typeof child === 'string' && typeof children[lastIndex] === 'string') {
    children[lastIndex] += child;
  } else {
    children.push(child);
  }

  return children;
}

function flattenPosition(pos) {
  return [
    pos[0][0],
    ':',
    pos[0][1],
    '-',
    pos[1][0],
    ':',
    pos[1][1]
  ].map(String).join('');
}

// For some nodes, we want to include more props than for others
function getNodeProps(node, key, opts, renderer) {
  let props = {}, undef;

  // `sourcePos` is true if the user wants source information (line/column info from markdown source)
  if (opts.sourcePos && node.sourcepos) {
    props['data-sourcepos'] = flattenPosition(node.sourcepos);
  }

  let type = normalizeTypeName(node.type);
  props._type = type;

  switch(type) {
    case 'html_inline':
    case 'html_block':
      props.isBlock = type === 'html_block';
      props.escapeHtml = opts.escapeHtml;
      props.skipHtml = opts.skipHtml;
      break;
    case 'code_block':
      let codeInfo = node.info ? node.info.split(/ +/) : [];
      if (codeInfo.length > 0 && codeInfo[0].length > 0) {
        props.language = codeInfo[0];
      }
      break;
    case 'code':
      props.children = node.literal;
      props.inline = true;
      break;
    case 'heading':
      props.level = node.level;
      break;
    case 'softbreak':
      props.softBreak = opts.softBreak;
      break;
    case 'link':
      props.href = opts.transformLinkUri ? opts.transformLinkUri(node.destination) : node.destination;
      props.title = node.title || undef;
      if (opts.linkTarget) {
        props.target = opts.linkTarget;
      }
      break;
    case 'image':
      props.src = opts.transformImageUri ? opts.transformImageUri(node.destination) : node.destination;
      props.title = node.title || undef;

      // Commonmark treats image description as children. We just want the text
      props.alt = node.react.children.join('');
      node.react.children = undef;
      break;
    case 'list':
      props.start = node.listStart;
      props.type = node.listType;
      props.tight = node.listTight;
      break;
    default:
  }

  if (typeof renderer !== 'string') {
    props.literal = node.literal;
    //props.children = Inferno.createVNode(1, 'span', null, node.literal)
  }

  let children = props.children || (node.react && node.react.children);
  if (Array.isArray(children)) {
    props.children = children.reduce(reduceChildren, []) || null;
  }

  return props;
}

function getPosition(node) {
  if (!node) {
    return null;
  }

  if (node.sourcepos) {
    return flattenPosition(node.sourcepos);
  }

  return getPosition(node.parent);
}

function renderNodes(block) {
  let walker = block.walker();

  // Softbreaks are usually treated as newlines, but in HTML we might want explicit linebreaks
  let softBreak = (this.softBreak === 'br' ? createElement('br') : this.softBreak);

  let propOptions = {
    sourcePos: this.sourcePos,
    escapeHtml: this.escapeHtml,
    skipHtml: this.skipHtml,
    transformLinkUri: this.transformLinkUri,
    transformImageUri: this.transformImageUri,
    softBreak: softBreak,
    linkTarget: this.linkTarget
  };

  let e, node, entering, leaving, type, doc, key, nodeProps, prevPos, prevIndex = 0;
  while ((e = walker.next())) {
    let pos = getPosition(e.node.sourcepos ? e.node : e.node.parent);
    if (prevPos === pos) {
      key = pos + prevIndex;
      prevIndex++;
    } else {
      key = pos;
      prevIndex = 0;
    }

    prevPos = pos;
    entering = e.entering;
    leaving = !entering;
    node = e.node;
    type = normalizeTypeName(node.type);
    nodeProps = null;

    // If we have not assigned a document yet, assume the current node is just that
    if (!doc) {
      doc = node;
      node.react = { children: [] };
      continue;
    } else if (node === doc) {
      // When we're leaving...
      continue;
    }

    // In HTML, we don't want paragraphs inside of list items
    if (type === 'paragraph' && isGrandChildOfList(node)) {
      continue;
    }

    // If we're skipping HTML nodes, don't keep processing
    if (this.skipHtml && (type === 'html_block' || type === 'html_inline')) {
      continue;
    }

    let isDocument = node === doc;
    let disallowedByConfig = this.allowedTypes.indexOf(type) === -1;
    let disallowedByUser = false;

    // Do we have a user-defined function?
    let isCompleteParent = node.isContainer && leaving;
    let renderer = this.renderers[type];
    if (this.allowNode && (isCompleteParent || !node.isContainer)) {
      let nodeChildren = isCompleteParent ? node.react.children : [];

      nodeProps = getNodeProps(node, key, propOptions, renderer);
      disallowedByUser = !this.allowNode({
        type: pascalCase(type),
        renderer: this.renderers[type],
        props: nodeProps,
        children: nodeChildren
      });
    }

    if (!isDocument && (disallowedByUser || disallowedByConfig)) {
      if (!this.unwrapDisallowed && entering && node.isContainer) {
        walker.resumeAt(node, false);
      }

      continue;
    }

    let isSimpleNode = type === 'text' || type === 'softbreak';
    if (typeof renderer !== 'function' && !isSimpleNode && typeof renderer !== 'string') {
      throw new Error('Renderer for type `' + pascalCase(node.type) + '` not defined or is not renderable');
    }

    if (node.isContainer && entering) {
      node.react = {
        component: renderer,
        props: {},
        children: []
      };
    } else {
      let childProps = nodeProps || getNodeProps(node, key, propOptions, renderer);
      if (renderer) {
        childProps = typeof renderer === 'string' ? childProps : Object.assign(childProps, { nodeKey: childProps.key });
        addChild(node, createElement(renderer, childProps));
      } else if (type === 'text') {
        addChild(node, node.literal);
      } else if (type === 'softbreak') {
        addChild(node, softBreak);
      }
    }
  }
  return doc.react.children;
}

function defaultLinkUriFilter(uri) {
  let url = uri.replace(/file:\/\//g, 'x-file://');

  // To prevent double-escaping of attributes, we need to decode
  return decodeURI(xssFilters.uriInDoubleQuotedAttr(url));
}

function InfernoRenderer(options) {
  let opts = options || {};

  if (opts.allowedTypes && opts.disallowedTypes) {
    throw new Error('Only one of `allowedTypes` and `disallowedTypes` should be defined');
  }

  if (opts.allowedTypes && !Array.isArray(opts.allowedTypes)) {
    throw new Error('`allowedTypes` must be an array');
  }

  if (opts.disallowedTypes && !Array.isArray(opts.disallowedTypes)) {
    throw new Error('`disallowedTypes` must be an array');
  }

  if (opts.allowNode && typeof opts.allowNode !== 'function') {
    throw new Error('`allowNode` must be a function');
  }

  let linkFilter = opts.transformLinkUri;
  if (typeof linkFilter === 'undefined') {
    linkFilter = defaultLinkUriFilter;
  } else if (linkFilter && typeof linkFilter !== 'function') {
    throw new Error('`transformLinkUri` must either be a function, or `null` to disable');
  }

  let imageFilter = opts.transformImageUri;
  if (typeof imageFilter !== 'undefined' && typeof imageFilter !== 'function') {
    throw new Error('`transformImageUri` must be a function');
  }

  if (opts.renderers && !isPlainObject(opts.renderers)) {
    throw new Error('`renderers` must be a plain object of `Type`: `Renderer` pairs');
  }

  let allowedTypes = (opts.allowedTypes && opts.allowedTypes.map(normalizeTypeName)) || coreTypes;
  if (opts.disallowedTypes) {
    let disallowed = opts.disallowedTypes.map(normalizeTypeName);
    allowedTypes = allowedTypes.filter(function filterDisallowed(type) {
      return disallowed.indexOf(type) === -1;
    });
  }

  return {
    sourcePos: Boolean(opts.sourcePos),
    softBreak: opts.softBreak || '\n',
    renderers: Object.assign({}, defaultRenderers, normalizeRenderers(opts.renderers)),
    escapeHtml: Boolean(opts.escapeHtml),
    skipHtml: Boolean(opts.skipHtml),
    transformLinkUri: linkFilter,
    transformImageUri: imageFilter,
    allowNode: opts.allowNode,
    allowedTypes: allowedTypes,
    unwrapDisallowed: Boolean(opts.unwrapDisallowed),
    render: renderNodes,
    linkTarget: opts.linkTarget || false
  };
}

InfernoRenderer.uriTransformer = defaultLinkUriFilter;
InfernoRenderer.types = coreTypes.map(pascalCase);
InfernoRenderer.renderers = coreTypes.reduce(function(renderers, type) {
  renderers[pascalCase(type)] = defaultRenderers[type];
  return renderers;
}, {});

function isObject(val) {
  return val != null && typeof val === 'object' && Array.isArray(val) === false;
}

function isObjectObject(o) {
  return isObject(o) === true && Object.prototype.toString.call(o) === '[object Object]';
}

function isPlainObject(o) {
  let ctor, prot;

  if (isObjectObject(o) === false) return false;

  // If has modified constructor
  ctor = o.constructor;
  if (typeof ctor !== 'function') return false;

  // If has modified prototype
  prot = ctor.prototype;
  if (isObjectObject(prot) === false) return false;

  // If constructor does not have an Object-specific method
  if (Object.prototype.hasOwnProperty.call(prot, 'isPrototypeOf') === false) {
    return false;
  }

  // Most likely a plain Object
  return true;
}

function pascalCase(str) {
  if (typeof str !== 'string') {
    throw new TypeError('expected a string.');
  }
  str = str.replace(/([A-Z])/g, ' $1');
  if (str.length === 1) {
    return str.toUpperCase();
  }
  str = str.replace(/^[\W_]+|[\W_]+$/g, '').toLowerCase();
  str = str.charAt(0).toUpperCase() + str.slice(1);
  return str.replace(/[\W_]+(\w|$)/g, function(_, ch) {
    return ch.toUpperCase();
  });
}
