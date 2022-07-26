export default class Pagination {

  constructor({activePageIndex = 0, totalPages = 0} = {}){
    this.totalPages = totalPages;
    this.activePageIndex = activePageIndex;
    this.render();
    this.addEventListener();
  }

  getTemplate(){
    const a = `
      <nav class="os-pagination">
        <a href="#" class="page-link previous" data-element="nav-prev"><i class="bi bi-arrow-left"></i></a>
        ${this.getPages()}
        <a href="#" class="page-link next" data-element="nav-next"><i class="bi bi-arrow-right"></i></a>
      </nav>
    `;

    return a;
  }

  getPages(){
    return `
      <ul class="page-list" data-element="pagination">
        ${new Array(this.totalPages).fill("1").map((item, index) => {
          return this.getPageTemplete(index);
        }).join('')}
      </ul>
    `;
  }

  getPageTemplete(pageIndex = 0){
    const isActive = pageIndex === this.activePageIndex ? 'active' : '';

    return `<li>
      <a href="#"
      data-element="page-link"
      class="page-link ${isActive}"
      data-page-index="${pageIndex}">
        ${pageIndex + 1}
      </a>
    </li>`;
  }


  setPage (pageIndex = 0){
    if (pageIndex === this.activePageIndex) return;
    if (pageIndex > this.totalPages - 1 || pageIndex < 0) return;

    this.dispatchEvent(pageIndex);

    const activePage = this.element.querySelector('.page-link.active');

    if (activePage){
      activePage.classList.remove('active')
    }

    const nextActivePage = this.element.querySelector(`[data-page-index="${pageIndex}"]`);

    if(nextActivePage){
      nextActivePage.classList.add('active');

      this.activePageIndex = pageIndex;


    }
  }

  prevPage(){
    const prevPageIndex = this.activePageIndex - 1;
    this.setPage(prevPageIndex);

  }

  nextPage(){
    const nextPageIndex = this.activePageIndex + 1;
    this.setPage(nextPageIndex);

  }

  render(){
    const wrapper = document.createElement('div');

    wrapper.innerHTML = this.getTemplate();

    this.element = wrapper;
  }

  addEventListener(){
    const prevPageBtn = this.element.querySelector('[data-element="nav-prev"]')
    const nextPageBtn = this.element.querySelector('[data-element="nav-next"]')
    const pagesList = this.element.querySelector('[data-element="pagination"]')


    prevPageBtn.addEventListener('click', () => {
      this.prevPage();
    })

    nextPageBtn.addEventListener('click', () => {
      this.nextPage();
    })

    pagesList.addEventListener('click', event => {
      const pageItem = event.target.closest('.page-link');

      if (!pageItem) return;

      const {pageIndex}  = pageItem.dataset;

      this.setPage(parseInt(pageIndex, 10));
    })
  };

  dispatchEvent(pageIndex){
    const customEvent = new CustomEvent('page-changed',{
      detail: pageIndex
    });

    this.element.dispatchEvent(customEvent);
  }
}


