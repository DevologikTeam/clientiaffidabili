# Report Entities Implementation

`Report` conserva:

- `orderId`, `checkId`;
- `templateCode`, `templateVersion`, `composerVersion`, `scoreModelVersion`;
- `attentionLevel`, `score`;
- `subjectSnapshot`, `dataSnapshot`, `htmlSnapshot`;
- `snapshotHash`;
- `generatedAt`, `publishedAt`;
- `reviewReason`, `reviewedByUserId`, `reviewedAt`.

La tabella non conserva payload provider grezzi. I riferimenti sensibili restano nel provider vault interno.
