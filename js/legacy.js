const loadedScripts = new Map();

function loadExternalScript(source) {
  if (loadedScripts.has(source)) {
    return loadedScripts.get(source);
  }

  const promise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = source;
    script.onload = resolve;
    script.onerror = () => reject(new Error(`Unable to load ${source}`));
    document.head.appendChild(script);
  });

  loadedScripts.set(source, promise);
  return promise;
}

function appendPageScript(page, onLoad) {
  const script = document.createElement("script");
  script.src = `/js/page-scripts/${encodeURIComponent(page)}.js`;
  script.async = false;
  script.dataset.pageScript = page;
  script.onload = onLoad;
  script.onerror = () => {
    console.error(`Unable to load page behavior for "${page}".`);
  };
  document.body.appendChild(script);
  return script;
}

export function runPageScripts(page, externalScripts = []) {
  let cancelled = false;
  let pageScript;

  const run = () => {
    if (!cancelled) {
      pageScript = appendPageScript(page, () => {
        if (document.readyState !== "loading") {
          document.dispatchEvent(new Event("DOMContentLoaded"));
        }
      });
    }
  };

  if (externalScripts.length) {
    Promise.all(externalScripts.map(loadExternalScript))
      .then(run)
      .catch((error) => console.error("Page script dependency failed:", error));
  } else {
    run();
  }

  return () => {
    cancelled = true;
    pageScript?.remove();
  };
}

function parseArguments(source, event) {
  if (!source.trim()) {
    return [];
  }

  const parts = source.match(/(?:[^,'"]|'[^']*'|"[^"]*")+/g) || [];
  return parts.map((part) => {
    const value = part.trim();

    if (value === "this") return event.currentTarget;
    if (value === "event") return event;
    if (value === "true") return true;
    if (value === "false") return false;
    if (value === "null") return null;
    if (/^-?\d+(?:\.\d+)?$/.test(value)) return Number(value);
    if (
      (value.startsWith("'") && value.endsWith("'")) ||
      (value.startsWith('"') && value.endsWith('"'))
    ) {
      return value.slice(1, -1);
    }

    return undefined;
  });
}

export function runLegacyAction(event, action) {
  const navigation = action.match(/^window\.location\.href\s*=\s*(['"])(.*?)\1$/);
  if (navigation) {
    window.location.href = navigation[2];
    return;
  }

  if (action === "window.history.back()") {
    window.history.back();
    return;
  }

  if (action === "window.print()") {
    window.print();
    return;
  }

  const call = action.match(/^([A-Za-z_$][\w$]*)\((.*)\)$/);
  if (!call) {
    console.error("Unsupported page action:", action);
    return;
  }

  const handler = window[call[1]];
  if (typeof handler !== "function") {
    console.error(`Page action "${call[1]}" is not available.`);
    return;
  }

  handler(...parseArguments(call[2], event));
}
