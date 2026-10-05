import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateDistanceMeters, isWithinCheckInRadius } from '../dist/geo/index.js';
import { canTransition } from '../dist/state-machine/index.js';
import { getTranslation } from '../dist/i18n/index.js';

test('Geolocation distance calculation works accurately', () => {
  // Istanbul Taksim to Kadikoy ~5km
  const dist = calculateDistanceMeters(41.0370, 28.9850, 40.9904, 29.0254);
  assert.ok(dist > 4500 && dist < 6500, `Distance was ${dist}`);

  // Exact close proximity check (10 meters)
  const nearby = isWithinCheckInRadius(41.037000, 28.985000, 41.037050, 28.985050, 150);
  assert.equal(nearby, true);
});

test('State machine enforces valid transition rules', () => {
  assert.equal(canTransition('draft', 'pending_invite'), true);
  assert.equal(canTransition('pending_invite', 'confirmed'), true);
  assert.equal(canTransition('confirmed', 'in_progress'), true);
  assert.equal(canTransition('in_progress', 'completed'), true);
  // Invalid jump
  assert.equal(canTransition('draft', 'completed'), false);
  assert.equal(canTransition('completed', 'draft'), false);
});

test('Translations load for multiple languages', () => {
  const tr = getTranslation('tr');
  assert.equal(tr.common.appName, 'Beer Together');
  const en = getTranslation('en');
  assert.equal(en.common.appName, 'Beer Together');
  const ar = getTranslation('ar');
  assert.ok(ar.events.whatsappShare.length > 0);
});
