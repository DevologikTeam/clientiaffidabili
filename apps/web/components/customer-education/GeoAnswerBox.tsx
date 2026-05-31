import { Alert } from '@/components/ds';

export function GeoAnswerBox({ answer }: { answer: string }) {
  return (
    <Alert tone="info" title="Risposta breve">
      {answer}
    </Alert>
  );
}
