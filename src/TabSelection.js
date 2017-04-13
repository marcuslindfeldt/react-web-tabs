class TabSelection {
  constructor({ defaultTab, vertical = false, onChange } = {}) {
    this.selected = defaultTab;
    this.tabs = [];
    this.subscribtions = [];
    this.onChange = onChange;
    this.vertical = vertical;
  }

  select(tabId, { focus = false } = {}) {
    if (!this.tabs.includes(tabId) || this.isSelected(tabId)) {
      return;
    }

    this.selected = tabId;
    this.subscribtions.forEach(callback => callback({ focus }));

    if (this.onChange) {
      this.onChange(tabId);
    }
  }

  selectPrevious(options) {
    const prevIndex = this.tabs.indexOf(this.selected) - 1;

    this.select(this.tabs[prevIndex >= 0 ? prevIndex : this.tabs.length - 1], options);
  }

  selectNext(options) {
    const nextIndex = (this.tabs.indexOf(this.selected) + 1) % this.tabs.length;

    this.select(this.tabs[nextIndex], options);
  }

  selectFirst(options) {
    this.select(this.tabs[0], options);
  }

  selectLast(options) {
    this.select(this.tabs[this.tabs.length - 1], options);
  }

  isSelected(tabId) {
    return tabId === this.selected;
  }

  isVertical() {
    return this.vertical;
  }

  register(tabId) {
    if (this.tabs.includes(tabId)) {
      return;
    }

    this.tabs.push(tabId);

    // set the first registered tab as select if no tab was assigned as default
    if (!this.selected) {
      this.select(tabId);
    }
  }

  unregister(tabId) {
    this.tabs = this.tabs.filter(id => id !== tabId);
  }

  subscribe(callback) {
    this.subscribtions.push(callback);
  }

  unsubscribe(callback) {
    this.subscribtions = this.subscribtions.filter(cb => cb !== callback);
  }
}

export default TabSelection;
