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
    _record(enable: boolean) {
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
