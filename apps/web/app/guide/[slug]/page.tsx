import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { JsonLd } from '@/components/launch-website';
import { EducationFaqBlock, EducationGuideBody, EducationMetaStrip, EducationRelatedGuides, EducationSidebarCta, GeoAnswerBox } from '@/components/customer-education';
import { absoluteUrl, breadcrumbJsonLd } from '@/lib/launch-website/launch-website-runtime';
import { educationArticleJsonLd, educationFaqJsonLd, getCustomerEducationPageBySlug } from '@/lib/seo-geo/customer-education-runtime';
import { buildGuideMetadata } from '@/lib/seo/metadata';

export function generateMetadata({ params }: { params: { slug: string } }) {
  const page = getCustomerEducationPageBySlug(params.slug);
  if (!page) return {};
  return buildGuideMetadata(page);
}

export default function PublicGuidePage({ params }: { params: { slug: string } }) {
  const page = getCustomerEducationPageBySlug(params.slug);
  if (!page) return notFound();
  const faqJson = educationFaqJsonLd(page);

  return (
    <>
      <JsonLd data={educationArticleJsonLd(page, absoluteUrl)} />
      {faqJson ? <JsonLd data={faqJson} /> : null}
      <JsonLd data={breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Guide', path: '/guide' }, { name: page.title, path: page.canonicalPath }])} />
      <Header />
      <main id="main-content" tabIndex={-1}>
        <section className="section">
          <div className="container ca-stack ca-stack--lg">
            <div className="ca-guide-hero">
              <span className="eyebrow">Guida ClientiAffidabili.it</span>
              <h1>{page.h1}</h1>
              <p>{page.excerpt}</p>
              <GeoAnswerBox answer={page.geoAnswerFocus} />
              <EducationMetaStrip page={page} />
            </div>
            <article className="ca-guide-layout">
              <div className="ca-guide-content">
                <EducationGuideBody page={page} />
                <EducationFaqBlock items={page.faq} />
                <EducationRelatedGuides page={page} />
              </div>
              <EducationSidebarCta page={page} />
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
