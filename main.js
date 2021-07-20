const url_metro = "https://stores-api.zakaz.ua/stores/48215611/products/search/";
const url_novus = "https://stores-api.zakaz.ua/stores/48201070/products/search/";
const url_auchan = "https://stores-api.zakaz.ua/stores/48246401/products/search/";
const url_varus = "https://stores-api.zakaz.ua/stores/48241001/products/search/";
const url_megamarket = "https://stores-api.zakaz.ua/stores/48267601/products/search/";
const url_ultramarket = "https://stores-api.zakaz.ua/stores/48277601/products/search/";
const url_citymarket = "https://stores-api.zakaz.ua/stores/48250029/products/search/";
const url_eco = "https://stores-api.zakaz.ua/stores/48280214/products/search/";
const url_okwine = "https://okwine.ua/ru/search/search=";
const url_goodwine = "https://goodwine.com.ua/catalogsearch/result/?q=";
const url_rozetka = "https://rozetka.com.ua/search/?text=";

function all_fetch() {
    removeElement();
    let search = document.querySelector('.i-1').value;

    let metro = zakaz_fetch(url_metro, search);
    let novus = zakaz_fetch(url_novus, search);
    let auchan = zakaz_fetch(url_auchan, search);
    let varus = zakaz_fetch(url_varus, search);
    let megamarket = zakaz_fetch(url_megamarket, search);
    let ultramarket = zakaz_fetch(url_ultramarket, search);
    let citymarket = zakaz_fetch(url_citymarket, search);
    let eco = zakaz_fetch(url_eco, search);

    metro.then(value => {
        value.results.forEach(obj => {
            createElement(obj, '.metro');
        })
    })

    novus.then(value => {
        value.results.forEach(obj => {
            createElement(obj, '.novus');
        })
    })

    auchan.then(value => {
        value.results.forEach(obj => {
            createElement(obj, '.auchan');
        })
    })

    varus.then(value => {
        value.results.forEach(obj => {
            createElement(obj, '.varus');
        })
    })

    megamarket.then(value => {
        value.results.forEach(obj => {
            createElement(obj, '.megamarket');
        })
    })

    ultramarket.then(value => {
        value.results.forEach(obj => {
            createElement(obj, '.ultramarket');
        })
    })

    citymarket.then(value => {
        value.results.forEach(obj => {
            createElement(obj, '.citymarket');
        })
    })

    eco.then(value => {
        value.results.forEach(obj => {
            createElement(obj, '.eco');
        })
    })

    addSearch('okwine', url_okwine, search);
    addSearch('goodwine', url_goodwine, search);
    addSearch('rozetka', url_rozetka, search);
}

function zakaz_fetch(url, search) {
    return new Promise(resolve => {
        fetch(`${url}?q=${search}`)
            .then(response => resolve(response.json()));
    })
}

function createElement(data, market) {
    let productsBox__listItem = document.createElement('div');
    productsBox__listItem.classList.add('ProductsBox__listItem');

    if (data.discount.value == 0) {
        productsBox__listItem.innerHTML = `<a title="${data.title}" data-status="invisible" data-marker="Product Tile" class="ProductTile" href="${data.web_url}">
        <div data-testid="product-tile__image" class="ProductTile__imageContainer">
            <img src="${data.img.s150x150}" class="ProductTile__image">
        </div>
        <div class="ProductTile__details">
            <div data-marker="Price" class="ProductTile__prices">
                <div data-marker="Discounted Price" class="jsx">
                    <span class="Price__value_caption">${data.price / 100}</span>
                    &nbsp;
                    <span class="Price__currency_caption">грн</span>
                </div>
            </div>
            <div class="ProductTile__titleWrapper">
                <span data-testid="product_tile_title" class="ProductTile__title">${data.title}</span>
                <div data-testid="productTileWeight" data-marker="Weight"
                    class="ProductTile__weight">${data.volume} мл
                </div>
            </div>
        </div>
    </a>`
    }
    else {
        let dueDate = new Date(data.discount.due_date);
        let date = dueDate.getDate() + '.' + (dueDate.getMonth() + 1);
        productsBox__listItem.innerHTML = `<a title="${data.title}" data-status="invisible" data-marker="Product Tile" class="ProductTile" href="${data.web_url}">
        <div data-testid="product-tile__image" class="ProductTile__imageContainer">
            <img src="${data.img.s150x150}" class="ProductTile__image">
        </div>
        <div class="ProductTile__badges">
            <div class="Badges">
                <div data-testid="productBadge" data-marker="Discount" class="Badge Badge_isDiscount Badge_straightLeft">
                    <span class="Badge__text">-${data.discount.value} %</span>
                </div>
            </div>
        </div>
        <div class="ProductTile__details">
            <div data-marker="Price" class="ProductTile__prices">
                <div data-marker="Old Price" class="ProductTile__oldPrice">
                    <span class="Price__value_body Price__value_minor">${data.discount.old_price / 100}</span>
                    <span class="Price__currency_body Price__currency_minor"> грн</span>
                </div>
                <div data-marker="Discounted Price" class="jsx">
                    <span class="Price__value_caption Price__value_discount">${data.price / 100}</span>
                    <span class="Price__currency_caption Price__currency_discount"> грн</span>
                    <span class="jsx-431947304 DiscountDisclaimer DiscountDisclaimer_productTile"> до ${date}</span>
                </div>
            </div>
            <div class="ProductTile__titleWrapper">
                <span data-testid="product_tile_title" class="ProductTile__title">${data.title}</span>
                <div data-testid="productTileWeight" data-marker="Weight"
                    class="ProductTile__weight">${data.volume} мл
                </div>
            </div>
        </div>
    </a>`
    }
    document.querySelector(`${market}>.ProductsBox__list`).append(productsBox__listItem);
}

function removeElement(elem = '.ProductsBox__listItem') {
    document.querySelectorAll(elem).forEach(elem => elem.remove());
}

function addSearch(id, url, query) {
    let elem = document.getElementById(id);
    elem.setAttribute('href', url + encodeURI(query));
}

document.querySelector('.b-1').onclick = all_fetch;

document.querySelector('.i-1').addEventListener('keyup', event => {
    if (event.keyCode === 13) {
        all_fetch();
    }
})