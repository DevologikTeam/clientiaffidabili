# FAQ, Schema e Internal Linking Implementation

## JSON-LD

La route guida emette:

- `Article`;
- `FAQPage` quando la guida contiene FAQ marcate `includeInSchema`;
- `BreadcrumbList`.

## Internal linking

Ogni guida include link correlati con motivo editoriale. I link devono aiutare il lettore, non creare una rete artificiale.

## Sitemap

La sitemap usa il runtime `publicPublishedGuides`, quindi eredita solo pagine con stato `published`.
