import { PROPERTY_REGISTRY } from '../registry.js';

const FN_MAP = Object.fromEntries(
  PROPERTY_REGISTRY.map(property => [
    property.key,
    property.predicate
  ])
);

function collectMembers(predicate, scanLimit) {
  const members = [];

  for (let n = 1; n <= scanLimit; n++) {
    if (predicate(n)) members.push(n);
  }

  return members;
}

self.addEventListener('message', ({ data }) => {
  const { key, scanLimit, requestId } = data;
  const predicate = FN_MAP[key];

  if (!predicate) {
    self.postMessage({
      requestId,
      key,
      members: [],
      error: `Unknown key: ${key}`
    });
    return;
  }

  const members = collectMembers(predicate, scanLimit);

  self.postMessage({
    requestId,
    key,
    members
  });
});