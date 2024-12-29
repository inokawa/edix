/**
 * @internal
 */
export const createMutationObserver = (
  element: Element,
  onMutationIgnored: () => void
) => {
  let isInputing = false;

  const queue: MutationRecord[] = [];
  const process = (records: MutationRecord[]) => {
    if (isInputing) {
      queue.push(...records);
    }
  };
  // https://dom.spec.whatwg.org/#interface-mutationobserver
  const mo = new MutationObserver((records) => {
    process(records);
    if (!isInputing) {
      onMutationIgnored();
    }
  });

  const sync = () => {
    process(mo.takeRecords());
  };

  mo.observe(element, {
    characterData: true,
    characterDataOldValue: true,
    childList: true,
    subtree: true,
  });

  return {
    _accept(enable: boolean) {
      if (!isInputing && enable) {
        sync();
      }
      isInputing = enable;
    },
    _flush: (): MutationRecord[] => {
      sync();
      return queue.splice(0);
    },
    _dispose() {
      queue.splice(0);
      mo.disconnect();
    },
  };
};

/**
 * @internal
 */
export const revertMutations = (queue: MutationRecord[]) => {
  let m: MutationRecord | undefined;
  while ((m = queue.pop())) {
    if (m.oldValue !== null) {
      m.target.textContent = m.oldValue;
    }
    for (let i = m.removedNodes.length - 1; i >= 0; i--) {
      m.target.insertBefore(m.removedNodes[i]!, m.nextSibling);
    }
    for (let i = m.addedNodes.length - 1; i >= 0; i--) {
      if (m.addedNodes[i]!.parentNode) {
        m.target.removeChild(m.addedNodes[i]!);
      }
    }
  }
};
