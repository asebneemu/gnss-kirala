export function publicAsset(path) {
    if (!path) return "";
    // zaten http ise dokunma
    if (/^https?:\/\//i.test(path)) return path;
  
    const base = import.meta.env.BASE_URL || "/"; // "/" ya da "/altklasor/"
    const cleanBase = base.endsWith("/") ? base.slice(0, -1) : base;
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
  
    return `${cleanBase}${cleanPath}`;
  }
  