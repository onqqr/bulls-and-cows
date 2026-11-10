type Child = Node | string | null | undefined | false;

export const el = <K extends keyof HTMLElementTagNameMap>(
  tag: K,
  props: Record<string, unknown> = {},
  ...children: Child[]
): HTMLElementTagNameMap[K] => {
  const node = document.createElement(tag);
  const deferredValue = props.value;

  Object.entries(props).forEach(([key, value]) => {
    if (value === undefined || value === null || key === 'value') {
      return;
    }

    if (key === 'className' && typeof value === 'string') {
      node.className = value;
      return;
    }

    if (key === 'text' && (typeof value === 'string' || typeof value === 'number')) {
      node.textContent = String(value);
      return;
    }

    if (key.startsWith('on') && typeof value === 'function') {
      const eventName = key.slice(2).toLowerCase();
      node.addEventListener(eventName, value as EventListener);
      return;
    }

    if (key === 'disabled' && typeof value === 'boolean') {
      if (
        node instanceof HTMLButtonElement ||
        node instanceof HTMLInputElement ||
        node instanceof HTMLSelectElement ||
        node instanceof HTMLTextAreaElement ||
        node instanceof HTMLOptionElement
      ) {
        node.disabled = value;
      }
      return;
    }

    if (key === 'checked' && typeof value === 'boolean' && node instanceof HTMLInputElement) {
      node.checked = value;
      return;
    }

    if (key === 'maxLength' && node instanceof HTMLInputElement && typeof value === 'number') {
      node.maxLength = value;
      return;
    }

    node.setAttribute(key, String(value));
  });

  children.flat().forEach((child) => {
    if (child === null || child === undefined || child === false) {
      return;
    }

    node.append(typeof child === 'string' ? document.createTextNode(child) : child);
  });

  if (deferredValue !== undefined && deferredValue !== null) {
    if (
      node instanceof HTMLInputElement ||
      node instanceof HTMLSelectElement ||
      node instanceof HTMLOptionElement
    ) {
      node.value = String(deferredValue);
    }
  }

  return node;
};

export const mount = (root: HTMLElement, ...nodes: Child[]): void => {
  root.replaceChildren(
    ...nodes.flat().flatMap((node) => {
      if (node === null || node === undefined || node === false) {
        return [];
      }

      return [typeof node === 'string' ? document.createTextNode(node) : node];
    }),
  );
};
