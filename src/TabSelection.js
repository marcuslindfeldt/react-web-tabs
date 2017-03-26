class TabSelection {
  constructor(defaultTab, onChange) {
    this.selected = defaultTab;
    this.subscribtions = [];
    this.onChange = onChange;
  }

  select(tabId) {
    this.selected = tabId;
    this.subscribtions.forEach(f => f());

    if (this.onChange) {
      this.onChange(tabId);
    }
  }

  isSelected(tabId) {
    return tabId === this.selected;
  }

  subscribe(callback) {
    this.subscribtions.push(callback);
  }

  unsubscribe(callback) {
    this.subscribtions = this.subscribtions.filter(cb => cb !== callback);
  }
}

export default TabSelection;
