export function withAlpha(rgb: string, alpha: number) {
  return rgb.replace("rgb", "rgba").replace(")", `, ${alpha})`);
}
