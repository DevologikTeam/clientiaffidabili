export function educationPageToBodyHtml(page: { sections: Array<{ title: string; body: string }>; checklist: string[]; limits: string[] }) {
  const sections = page.sections.map((section) => `<h2>${section.title}</h2><p>${section.body}</p>`).join('');
  const checklist = `<h2>Checklist operativa</h2><ul>${page.checklist.map((item) => `<li>${item}</li>`).join('')}</ul>`;
  const limits = `<h2>Garanzia operativa e limiti</h2><ul>${page.limits.map((item) => `<li>${item}</li>`).join('')}</ul>`;
  return `${sections}${checklist}${limits}`;
}
