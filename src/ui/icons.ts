const svgEl = <K extends keyof SVGElementTagNameMap>(
  tag: K,
  attrs: Record<string, string | number> = {},
  ...children: SVGElement[]
): SVGElementTagNameMap[K] => {
  const node = document.createElementNS('http://www.w3.org/2000/svg', tag);

  Object.entries(attrs).forEach(([key, value]) => {
    node.setAttribute(key, String(value));
  });

  children.forEach((child) => node.append(child));

  return node;
};

export const createSunIcon = (): SVGSVGElement =>
  svgEl(
    'svg',
    {
      class: 'theme-icon',
      viewBox: '0 0 24 24',
      width: 18,
      height: 18,
      fill: 'none',
      'aria-hidden': 'true',
    },
    svgEl('circle', { cx: 12, cy: 12, r: 4, fill: 'currentColor' }),
    svgEl('path', {
      d: 'M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41',
      stroke: 'currentColor',
      'stroke-width': 2,
      'stroke-linecap': 'square',
    }),
  );

export const createMoonIcon = (): SVGSVGElement =>
  svgEl(
    'svg',
    {
      class: 'theme-icon',
      viewBox: '0 0 24 24',
      width: 18,
      height: 18,
      fill: 'none',
      'aria-hidden': 'true',
    },
    svgEl('path', {
      d: 'M20 14.5A8.5 8.5 0 0 1 9.5 4 7 7 0 1 0 20 14.5Z',
      fill: 'currentColor',
    }),
  );
