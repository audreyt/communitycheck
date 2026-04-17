(function() {
  var params = new URLSearchParams(window.location.search);
  if (!params.has('edit')) return;

  // -- Config --
  var TEXT_SELECTORS = 'h1, h2, h3, h4, h5, h6, p, li, blockquote, figcaption, td, th, dt, dd, .card-desc, .card-name';
  var changeCount = 0;
  var originals = new Map();

  // -- Make text elements editable --
  document.querySelectorAll(TEXT_SELECTORS).forEach(function(el) {
    if (el.closest('#cc-edit-bar')) return;
    if (el.closest('#cc-fmt-toolbar')) return;
    if (el.tagName === 'SCRIPT' || el.tagName === 'STYLE') return;
    if (el.closest('button') || el.closest('input') || el.closest('select')) return;
    if (el.textContent.trim().length === 0) return;

    el.setAttribute('contenteditable', 'true');
    el.setAttribute('spellcheck', 'true');
    originals.set(el, el.innerHTML);
  });

  // -- Track changes --
  document.addEventListener('input', function(e) {
    if (e.target.getAttribute('contenteditable') !== 'true') return;
    changeCount = 0;
    originals.forEach(function(val, el) {
      if (el.innerHTML !== val) changeCount++;
    });
    updateBadge();
  });

  // -- Floating format toolbar --
  var toolbar = document.createElement('div');
  toolbar.id = 'cc-fmt-toolbar';
  toolbar.innerHTML =
    '<button data-cmd="bold" title="Bold"><b>B</b></button>' +
    '<button data-cmd="italic" title="Italic"><i>I</i></button>' +
    '<button data-cmd="strikeThrough" title="Strikethrough"><s>S</s></button>' +
    '<span class="cc-fmt-sep"></span>' +
    '<button data-cmd="fontSize" data-val="1" title="Smaller text" class="cc-fmt-size">A&#x2212;</button>' +
    '<button data-cmd="fontSize" data-val="5" title="Larger text" class="cc-fmt-size cc-fmt-size-up">A+</button>' +
    '<span class="cc-fmt-sep"></span>' +
    '<button data-cmd="hiliteColor" data-val="#fef08a" title="Highlight yellow" class="cc-fmt-color" style="background:#fef08a"></button>' +
    '<button data-cmd="hiliteColor" data-val="#bbf7d0" title="Highlight green" class="cc-fmt-color" style="background:#bbf7d0"></button>' +
    '<button data-cmd="hiliteColor" data-val="#fecaca" title="Highlight red" class="cc-fmt-color" style="background:#fecaca"></button>' +
    '<span class="cc-fmt-sep"></span>' +
    '<button data-cmd="blockClass" data-val="lead" title="Lead paragraph (larger)" class="cc-fmt-block">Lead</button>' +
    '<button data-cmd="blockClass" data-val="pull" title="Pull quote (italic + border)" class="cc-fmt-block">Pull</button>' +
    '<button data-cmd="blockClass" data-val="" title="Normal paragraph" class="cc-fmt-block cc-fmt-block-normal">P</button>' +
    '<span class="cc-fmt-sep"></span>' +
    '<button data-cmd="removeFormat" title="Clear formatting" class="cc-fmt-clear">&#x2715;</button>';
  document.body.appendChild(toolbar);

  // Toolbar button handlers
  toolbar.addEventListener('mousedown', function(e) {
    e.preventDefault(); // keep selection alive
    var btn = e.target.closest('button');
    if (!btn) return;
    var cmd = btn.dataset.cmd;
    var val = btn.dataset.val || null;

    if (cmd === 'fontSize') {
      handleFontSize(parseInt(val));
    } else if (cmd === 'blockClass') {
      handleBlockClass(val);
    } else {
      document.execCommand(cmd, false, val);
    }
    countChanges();
    positionToolbar();
  });

  function handleFontSize(direction) {
    var sel = window.getSelection();
    if (!sel.rangeCount) return;
    var range = sel.getRangeAt(0);
    if (range.collapsed) return;

    // Get the common ancestor to find current font size
    var container = range.commonAncestorContainer;
    if (container.nodeType === 3) container = container.parentElement;
    var computed = window.getComputedStyle(container);
    var current = parseFloat(computed.fontSize);

    // Step: 1px for small text, 2px for larger
    var step = current < 20 ? 1 : 2;
    var newSize = direction === 1 ? Math.max(8, current - step) : current + step;

    // Wrap selection in a span with the new size
    var span = document.createElement('span');
    span.style.fontSize = newSize + 'px';
    try {
      var fragment = range.extractContents();
      span.appendChild(fragment);
      range.insertNode(span);
      // Re-select the content
      sel.removeAllRanges();
      var newRange = document.createRange();
      newRange.selectNodeContents(span);
      sel.addRange(newRange);
    } catch(e) {}
  }

  function handleBlockClass(cls) {
    var sel = window.getSelection();
    if (!sel.rangeCount) return;
    var node = sel.anchorNode;
    if (node.nodeType === 3) node = node.parentElement;
    // Walk up to the nearest contenteditable block
    var block = node.closest('[contenteditable="true"]');
    if (!block) return;
    // Remove lead/pull classes
    block.classList.remove('lead', 'pull');
    if (cls) block.classList.add(cls);
    // Update active states on toolbar buttons
    toolbar.querySelectorAll('.cc-fmt-block').forEach(function(btn) {
      var isActive = btn.dataset.val === cls || (btn.dataset.val === '' && !cls);
      btn.classList.toggle('cc-fmt-block-active', isActive);
    });
  }

  function countChanges() {
    changeCount = 0;
    originals.forEach(function(val, el) {
      if (el.innerHTML !== val) changeCount++;
    });
    updateBadge();
  }

  // Show/hide toolbar on selection
  var toolbarVisible = false;

  document.addEventListener('selectionchange', function() {
    requestAnimationFrame(positionToolbar);
  });

  document.addEventListener('mouseup', function() {
    setTimeout(positionToolbar, 10);
  });

  document.addEventListener('keyup', function(e) {
    if (e.shiftKey || e.key === 'Shift') {
      setTimeout(positionToolbar, 10);
    }
  });

  function positionToolbar() {
    var sel = window.getSelection();
    if (!sel.rangeCount || sel.isCollapsed) {
      if (toolbarVisible) {
        toolbar.classList.remove('cc-fmt-visible');
        toolbarVisible = false;
      }
      return;
    }

    // Only show if selection is inside an editable element
    var anchor = sel.anchorNode;
    if (anchor.nodeType === 3) anchor = anchor.parentElement;
    if (!anchor.closest('[contenteditable="true"]')) {
      if (toolbarVisible) {
        toolbar.classList.remove('cc-fmt-visible');
        toolbarVisible = false;
      }
      return;
    }

    var rect = sel.getRangeAt(0).getBoundingClientRect();
    if (rect.width === 0) return;

    var tbWidth = 420;
    var left = rect.left + rect.width / 2 - tbWidth / 2;
    left = Math.max(8, Math.min(left, window.innerWidth - tbWidth - 8));
    var top = rect.top - 48 + window.scrollY;
    if (rect.top < 56) {
      top = rect.bottom + 8 + window.scrollY;
    }

    toolbar.style.left = left + 'px';
    toolbar.style.top = top + 'px';
    if (!toolbarVisible) {
      toolbar.classList.add('cc-fmt-visible');
      toolbarVisible = true;
    }
  }

  // -- Edit bar --
  var bar = document.createElement('div');
  bar.id = 'cc-edit-bar';
  bar.innerHTML =
    '<div style="position:fixed;bottom:0;left:0;right:0;z-index:999999;font-family:Inter,system-ui,sans-serif;pointer-events:none">' +
      '<div style="pointer-events:none;height:32px;background:linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0.6))"></div>' +
      '<div style="background:#111;border-top:1px solid #2a2a3a;pointer-events:auto">' +
        '<div style="max-width:900px;margin:0 auto;padding:12px 24px;display:flex;align-items:center;justify-content:space-between">' +
          '<div style="display:flex;align-items:center;gap:12px">' +
            '<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#4ade80;animation:cc-pulse 2s infinite"></span>' +
            '<span style="color:#e4e4e7;font-size:13px;font-weight:600;letter-spacing:0.3px">EDIT MODE</span>' +
            '<span style="color:#555;font-size:12px">Select text for formatting toolbar</span>' +
            '<span id="cc-badge" style="display:none;background:rgba(74,222,128,0.15);color:#4ade80;font-size:11px;font-weight:600;padding:2px 8px;border-radius:99px"></span>' +
          '</div>' +
          '<div style="display:flex;gap:8px">' +
            '<button id="cc-save" style="background:#4ade80;color:#000;border:none;padding:8px 20px;border-radius:8px;font-weight:600;cursor:pointer;font-size:13px;font-family:inherit;transition:opacity 0.15s">Save</button>' +
            '<button id="cc-exit" style="background:transparent;color:#888;border:1px solid #333;padding:8px 16px;border-radius:8px;font-weight:500;cursor:pointer;font-size:13px;font-family:inherit;transition:all 0.15s">Exit</button>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';
  document.body.appendChild(bar);

  // -- Styles --
  var styles = document.createElement('style');
  styles.id = 'cc-edit-styles';
  styles.textContent =
    '@keyframes cc-pulse { 0%,100% { opacity:1 } 50% { opacity:0.4 } }' +
    '[contenteditable="true"] { cursor:text; transition:outline 0.15s,background 0.15s; border-radius:3px; }' +
    '[contenteditable="true"]:hover { outline:1px dashed rgba(74,222,128,0.25); outline-offset:4px; }' +
    '[contenteditable="true"]:focus { outline:2px solid rgba(74,222,128,0.4); outline-offset:4px; background:rgba(74,222,128,0.025); }' +
    'body { padding-bottom:72px !important; }' +
    '#cc-save:hover { opacity:0.85; }' +
    '#cc-exit:hover { border-color:#555; color:#aaa; }' +

    // Floating toolbar
    '#cc-fmt-toolbar { position:absolute; top:0; left:0; z-index:1000000; display:flex; align-items:center; gap:2px;' +
    '  background:#1a1a2e; border:1px solid #2a2a4e; border-radius:10px; padding:4px 6px;' +
    '  box-shadow:0 4px 20px rgba(0,0,0,0.5); opacity:0; pointer-events:none; transform:translateY(4px);' +
    '  transition:opacity 0.15s,transform 0.15s; }' +
    '#cc-fmt-toolbar.cc-fmt-visible { opacity:1; pointer-events:auto; transform:translateY(0); }' +

    '#cc-fmt-toolbar button { background:transparent; border:none; color:#ccc; width:30px; height:30px;' +
    '  display:flex; align-items:center; justify-content:center; border-radius:6px; cursor:pointer;' +
    '  font-family:Inter,system-ui,sans-serif; font-size:14px; transition:all 0.1s; }' +
    '#cc-fmt-toolbar button:hover { background:rgba(255,255,255,0.1); color:#fff; }' +

    '.cc-fmt-sep { width:1px; height:20px; background:#333; margin:0 4px; flex-shrink:0; }' +

    '.cc-fmt-size { font-size:12px !important; font-weight:600 !important; letter-spacing:-0.5px; }' +
    '.cc-fmt-size-up { font-size:15px !important; }' +

    '.cc-fmt-color { width:22px !important; height:22px !important; border-radius:50% !important;' +
    '  border:2px solid transparent !important; margin:0 1px; min-width:22px; flex-shrink:0; }' +
    '.cc-fmt-color:hover { border-color:#fff !important; transform:scale(1.15); }' +

    '.cc-fmt-block { font-size:10px !important; font-weight:600 !important; letter-spacing:0.3px; color:#888 !important; padding:0 6px !important; width:auto !important; }' +
    '.cc-fmt-block:hover { color:#4ade80 !important; }' +
    '.cc-fmt-block-active, .cc-fmt-block-active:hover { color:#4ade80 !important; background:rgba(74,222,128,0.15) !important; }' +

    '.cc-fmt-clear { font-size:11px !important; color:#888 !important; }' +
    '.cc-fmt-clear:hover { color:#f87171 !important; }';
  document.head.appendChild(styles);

  function updateBadge() {
    var badge = document.getElementById('cc-badge');
    if (changeCount > 0) {
      badge.style.display = 'inline-block';
      badge.textContent = changeCount + ' change' + (changeCount === 1 ? '' : 's');
    } else {
      badge.style.display = 'none';
    }
  }

  // -- Save: download clean HTML --
  document.getElementById('cc-save').addEventListener('click', function() {
    if (changeCount === 0) {
      alert('No changes to save.');
      return;
    }

    // Remove all edit-mode artifacts from the DOM
    bar.remove();
    toolbar.remove();
    styles.remove();
    document.querySelectorAll('[contenteditable]').forEach(function(el) {
      el.removeAttribute('contenteditable');
      el.removeAttribute('spellcheck');
    });
    var editScript = document.querySelector('script[src$="edit.js"]');
    if (editScript) editScript.remove();

    // Serialize clean HTML
    var html = '<!DOCTYPE html>\n' + document.documentElement.outerHTML;

    // Determine filename
    var path = location.pathname;
    var filename = path.split('/').pop() || 'index.html';
    if (filename === '' || filename === '/') filename = 'index.html';

    // Download
    var blob = new Blob([html], { type: 'text/html' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(a.href);

    // Reload back into edit mode so they can keep working
    setTimeout(function() { location.reload(); }, 400);
  });

  // -- Exit --
  document.getElementById('cc-exit').addEventListener('click', function() {
    if (changeCount > 0 && !confirm('You have ' + changeCount + ' unsaved change(s). Exit anyway?')) return;
    window.location.href = window.location.pathname;
  });

  // Prevent accidental navigation when clicking editable links
  document.addEventListener('click', function(e) {
    var link = e.target.closest('a');
    if (link && link.closest('[contenteditable="true"]')) {
      e.preventDefault();
    }
  });
})();
