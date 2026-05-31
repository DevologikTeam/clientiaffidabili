import { DataTable } from '../ds/DataTable';
import { seoGeoRows } from '../../lib/analytics/analytics-growth-runtime';

export function SeoGeoPerformanceTable() {
  return (
    <DataTable
      caption="Performance SEO/GEO"
      rows={seoGeoRows}
      columns={[
        { key: 'cluster', label: 'Cluster', render: (row: any) => row.cluster },
        { key: 'pages', label: 'Pagine', render: (row: any) => row.pages },
        { key: 'visits', label: 'Visite', render: (row: any) => row.visits },
        { key: 'ctaRate', label: 'CTA rate', render: (row: any) => row.ctaRate },
        { key: 'assistedRevenue', label: 'Ricavi assistiti', render: (row: any) => row.assistedRevenue },
        { key: 'nextAction', label: 'Prossima azione', render: (row: any) => row.nextAction },
      ]}
    />
  );
}
