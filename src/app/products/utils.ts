interface Description {
  type: string;
  children: {
    text: string;
    type: string;
  }[];
}

export function getDescriptionText(desc: Description[]): string {
  if (!Array.isArray(desc)) return '';
  return desc
    .map((block) =>
      Array.isArray(block.children)
        ? block.children.map((child) => child.text).join(' ')
        : ''
    )
    .join(' ');
} 