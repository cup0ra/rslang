/* eslint-disable no-shadow */
/* eslint-disable no-multi-assign */
export default class Statistics {
  constructor(arrayCategory) {
    this.arrayCategory = arrayCategory;
  }

  render(arrayWords, arrayRow) {
    this.statistics = document.createElement('div');
    this.statistics.classList.add('table_statistics');
    this.statistics.append(this.getTabsContainer(arrayWords, arrayRow));
    // this.statistics.append(this.getTable(arrayWords, arrayRow));

    this.statistics.addEventListener('click', (event) => Statistics.handlerClick(event));

    return this.statistics;
  }

  static handlerClick(event) {
    if (Statistics.isClickOnTheadTable(event)) {
      Statistics.getSortTable(event);
    }

    if (Statistics.isClickOnTabs(event)) {
      Statistics.clickOnTabs(event);
    }
  }

  static isClickOnTabs(event) {
    return event.target.parentNode.classList.contains('tabs') || event.target.parentNode.parentNode.classList.contains('tabs');
  }

  static clickOnTabs(event) {
    const tabPanels = document.querySelectorAll('.tabs-panel');
    document.querySelector('.tabs li.active').classList.remove('active');
    document.querySelector('.tabs-panel.active').classList.remove('active');
    const parentListItem = event.target.parentElement;
    event.target.parentElement.classList.add('active');
    const index = [...parentListItem.parentElement.children].indexOf(parentListItem);
    const panel = [...tabPanels].filter((el) => el.getAttribute('data-index') === index);
    panel[0].classList.add('active');
  }

  static isClickOnTheadTable(event) {
    return event.target.tagName === 'TH';
  }

  static getSortTable(event) {
    console.log('sort', event);
    // eslint-disable-next-line no-param-reassign
    const order = (event.target.dataset.order = -(event.target.dataset.order || -1));
    const index = [...event.target.parentNode.cells].indexOf(event.target);
    const collator = new Intl.Collator(['en', 'ru'], {
      numeric: true,
    });
    const comparator = (index, order) => (a, b) => order * collator.compare(
      b.children[index].innerHTML,
      a.children[index].innerHTML,
    );

    // eslint-disable-next-line no-restricted-syntax
    for (const tBody of event.target.closest('table').tBodies) {
      tBody.append(...[...tBody.rows].sort(comparator(index, order)));
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const cell of event.target.parentNode.cells) {
      cell.classList.toggle('sorted', cell === event.target);
    }
  }

  getTabsContainer(arrayWords, arrayRow) {
    const tabsContainer = document.createElement('div');
    tabsContainer.classList.add('tabs-container');

    this.tabs = document.createElement('ul');
    this.tabs.classList.add('tabs');
    tabsContainer.append(this.tabs);
    this.arrayCategory.forEach((element, index) => {
      const item = document.createElement('li');
      if (index === 0) {
        item.classList.add('active');
      }
      const page = document.createElement('span');
      page.innerHTML = element;
      item.append(page);
      this.tabs.append(item);
    });
    tabsContainer.append(this.getTabsContent(arrayWords, arrayRow));
    return tabsContainer;
  }

  getTabsContent(arrayWords, arrayRow) {
    const tabsContent = document.createElement('div');
    tabsContent.classList.add('tabs-content');
    this.arrayCategory.forEach((element, index) => {
      const tabsPanel = document.createElement('div');
      tabsPanel.classList.add('tabs-panel');
      if (index === 0) {
        tabsPanel.classList.add('active');
        tabsPanel.append(this.getTable(arrayWords, arrayRow));
      }
      tabsPanel.dataset.index = index;
      tabsContent.append(tabsPanel);
    });
    this.getTable(arrayWords, arrayRow);
    return tabsContent;
  }

  static getCategory(nameCategory, checkedCategory) {
    const category = document.createElement('span');
    category.classList.add('fieldset__filter-wrapper');
    const inputCategory = document.createElement('input');
    inputCategory.type = 'radio';
    inputCategory.value = nameCategory;
    inputCategory.name = 'category';
    inputCategory.id = nameCategory;
    inputCategory.checked = checkedCategory;
    inputCategory.innerHTML = nameCategory;
    category.append(inputCategory);

    const labelCategory = document.createElement('label');
    labelCategory.classList.add('fieldset__text');
    labelCategory.for = nameCategory;
    labelCategory.innerHTML = nameCategory;
    category.append(labelCategory);
    return category;
  }

  getTable(arrayWords, arrayRow) {
    this.table = document.createElement('table');
    this.table.classList.add('table_sort');
    this.table.append(Statistics.getTHead(arrayRow));
    this.table.append(Statistics.getTbody(arrayWords, arrayRow));

    return this.table;
  }

  static getTHead(arrayRow) {
    const head = document.createElement('thead');
    const row = document.createElement('tr');
    arrayRow.forEach((element) => {
      const headCell = document.createElement('th');
      headCell.innerHTML = element;
      row.append(headCell);
    });
    head.append(row);

    return head;
  }

  static getTbody(arrayWords, arrayRow) {
    const tBody = document.createElement('tbody');
    arrayWords.forEach((word) => {
      tBody.append(Statistics.getRowWord(word, arrayRow));
    });
    return tBody;
  }

  static getRowWord(word, arrayRow) {
    const row = document.createElement('tr');
    arrayRow.forEach((element) => {
      const headCell = document.createElement('td');
      headCell.innerHTML = word[element];
      row.append(headCell);
    });
    return row;
  }
}