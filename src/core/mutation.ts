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
    if (m.type === "characterData") {
      (m.target as CharacterData).nodeValue = m.oldValue!;
    } else if (m.type === "childList") {
      const { target, removedNodes, addedNodes, nextSibling } = m;
      for (let i = removedNodes.length - 1; i >= 0; i--) {
        target.insertBefore(removedNodes[i]!, nextSibling);
      }
      for (let i = addedNodes.length - 1; i >= 0; i--) {
        if (addedNodes[i]!.parentNode) {
          target.removeChild(addedNodes[i]!);
        }
      }
    }
  }
};
