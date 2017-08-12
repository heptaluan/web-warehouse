var id = 0;

function nextId () {
    id++;
    return "p" + id;
}

// 模拟数据
function Product (name, manufacturer, price) {
    this.id = nextId();
    this.name = name;
    this.manufacturer = manufacturer;
    this.price = price;
}

var products = [
    new Product("mp3", "Apple", 333),
    new Product("mp4", "Apple", 444),
    new Product("mp5", "Apple", 555),
    new Product("mp6", "Apple", 666)
]

module.exports = {

    // 返回所有 products
    getProducts: () => {
        return products
    },

    // 返回对应 id 的 product
    getProduct: (id) => {
        for (var i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                return products[i]
            } 
        }
        return null;
    },

    // 新建 product
    createProduct: (name, manufacturer, price) => {
        var p = new Product(name, manufacturer, price);
        products.push(p);
        return p;
    },

    // 删除 product
    deleteProduct: (id) => {
        var index = -1;
        for (var i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                index = i;
                break;
            }
        }
        if (index >= 0) {
            return products.splice(index, 1)[0];
        }
        return null;
    }
}