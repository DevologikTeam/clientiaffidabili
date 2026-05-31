import { Card } from '@/components/ds';
import { partnerPortalRuntime } from '@/lib/partner-portal/partner-portal-runtime';

export function DeveloperQuickstart() {
  return (
    <Card>
      <p className="ca-eyebrow">Developer docs</p>
      <h2>Quickstart sandbox</h2>
      <p>
        Base path: <code>{partnerPortalRuntime.docs.basePath}</code>
      </p>
      <h3>Header obbligatori</h3>
      <pre>{partnerPortalRuntime.docs.headers.join('\n')}</pre>
      <h3>Endpoint MVP</h3>
      <ul>
        {partnerPortalRuntime.docs.endpoints.map((endpoint) => (
          <li key={endpoint}>
            <code>{endpoint}</code>
          </li>
        ))}
      </ul>
      <h3>Esempio</h3>
      <pre>{`curl -X POST https://sandbox.clientiaffidabili.it/api/partner/v1/company-checks \
  -H "Authorization: Bearer ca_sbox_..." \
  -H "Idempotency-Key: 6f90b0b2-..." \
  -H "Content-Type: application/json" \
  -d '{"serviceCode":"company_reliability_pro","subject":{"vatNumber":"IT00000000000"}}'`}</pre>
    </Card>
  );
}
