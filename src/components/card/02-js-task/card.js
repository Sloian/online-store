export default class Card {
  constructor(someProduct){
    this.componentProduct = someProduct;
    this.myRender();
  }



  getTemplate () {
    const result =  `
    <div class = "os-product-card">
      <!-- Card component -->
      <div class="product-image" style="background-image: url(${this.componentProduct.images[0]});"></div>
      <div class="product-content">
        <div class="product-rating-price">
          <div class="product-rating">
            <span>2.89</span>
            <i class="bi bi-star">
            </i>
          </div>
        <div class="product-price">${this.componentProduct.price}</div>
        </div>
        <h5 class="product-title">
          ${this.componentProduct.title}
        </h5>
        <p class="product-description">${this.componentProduct.category}</p>
      </div>
      <footer class="product-footer">
        <button class="wrapper-btn-primary" data-element="addToCartBtn">
          <i class="bi bi-box-seam os-product-shopping-bag"></i>
          Add To Cart
        </button>
      </footer>
      </div>
    </div>
    `;


    return result;
  }


  update(data = {}){
    this.componentProduct = data;
    this.componentElement.innerHTML = this.getTemplate();

  }

  myRender () {
    const wrapper = document.createElement('div');

    wrapper.innerHTML = this.getTemplate();

    this.element = wrapper.firstElementChild;
  }
}
