import { PROPERTY_REGISTRY } from '../registry.js';

const FN_MAP = new Map(
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
  const predicate = FN_MAP.get(key);

  if (!predicate) {
    self.postMessage({
      requestId,
      key,
      members: [],
      error: `Unknown key: ${key}`
    });
    return;
  }

  try {
    const members = collectMembers(predicate, scanLimit);

    self.postMessage({
      requestId,
      key,
      members
    });
  } catch (error) {
    self.postMessage({
      requestId,
      key,
      members: [],
      error: error.message
    });
  }
});