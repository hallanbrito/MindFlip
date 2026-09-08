import assert from 'node:assert/strict';
import test from 'node:test';

import { ILLUSIONS_DATA } from '../data/illusions.ts';
import {
  ILLUSION_REFERENCE_IDS,
  SCIENTIFIC_REFERENCES,
  getScientificReferences
} from '../data/scientificReferences.ts';

test('every catalog illusion has at least one resolvable scientific reference', () => {
  for (const illusion of ILLUSIONS_DATA) {
    assert.ok(ILLUSION_REFERENCE_IDS[illusion.id]?.length, `${illusion.id} has no reference ids`);
    assert.equal(
      getScientificReferences(illusion.id).length,
      ILLUSION_REFERENCE_IDS[illusion.id].length,
      `${illusion.id} contains an unknown reference id`
    );
  }
});

test('scientific references have unique ids and safe persistent metadata', () => {
  const ids = SCIENTIFIC_REFERENCES.map(reference => reference.id);
  assert.equal(new Set(ids).size, ids.length, 'reference ids must be unique');

  for (const reference of SCIENTIFIC_REFERENCES) {
    assert.match(reference.id, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.match(reference.url, /^https:\/\//);
    assert.ok(reference.title.trim().length > 0);
    assert.ok(reference.authors.trim().length > 0);
    assert.ok(reference.supports.trim().length > 0);
    assert.ok(reference.year >= 1800 && reference.year <= new Date().getFullYear());
  }
});

test('the traceability map has no unknown illusions or orphan references', () => {
  const illusionIds = new Set(ILLUSIONS_DATA.map(illusion => illusion.id));
  const usedReferenceIds = new Set(Object.values(ILLUSION_REFERENCE_IDS).flat());

  for (const illusionId of Object.keys(ILLUSION_REFERENCE_IDS)) {
    assert.ok(illusionIds.has(illusionId), `${illusionId} is not present in the catalog`);
  }

  for (const reference of SCIENTIFIC_REFERENCES) {
    assert.ok(usedReferenceIds.has(reference.id), `${reference.id} is orphaned`);
  }
});
