const cartButton = document.querySelector("#cart-button");
const enterButton = document.querySelector("#enter");
const modal = document.querySelector(".modal");
const login = document.querySelector(".login");
const close = document.querySelector(".close");
const log_close = document.querySelector(".log-close");
const modal_cancel = document.querySelector(".cancel-button");
const modal_order = document.querySelector(".order-button");
const click_num = document.querySelector("#click-num");
const food_price = document.querySelector(".food-price");
const total_price = document.querySelector(".modal-pricetag");
const reg_close = document.querySelector("#reg-close");
const reg_button = document.querySelector("#reg-button");
const plus = document.getElementById("plus")

cartButton.addEventListener('click', toggleModal);

/*
enterButton.addEventListener('click', function(event){
    login.classList.add("log-active");
});*/

document.getElementById("enscart_my_wrapper").addEventListener('click', function (event){
	modal.classList.toggle("active");
});

document.querySelector(".log-button").addEventListener('click', function(event){
	login.classList.add("active");
});

document.querySelector(".log-close").addEventListener('click', function(event){
	login.classList.remove("active");
});

modal_cancel.addEventListener('click', toggleModal);	

function regButton(){
    login.classList.remove("active");
};

close.addEventListener('click', function (event) {
   modal.classList.remove("active");
});

log_close.addEventListener('click', function(event){
    login.classList.remove("log-active");
});

function toggleModal(){
    modal.classList.toggle("active");
}

///////////////////////////////////////////////////////

var d = document,
    itemBox = d.querySelectorAll('.item_box'), // блок каждого товара
		cartCont = d.getElementById('cart_content'); // блок вывода данных корзины
// Функция кроссбраузерная установка обработчика событий
function addEvent(elem, type, handler){
  if(elem.addEventListener){
    elem.addEventListener(type, handler, false);
  } else {
    elem.attachEvent('on'+type, function(){ handler.call( elem ); });
  }
  return false;
}
// Получаем данные из LocalStorage
function getCartData(){
	return JSON.parse(localStorage.getItem('cart'));
}
// Записываем данные в LocalStorage
function setCartData(o){
	localStorage.setItem('cart', JSON.stringify(o));
	return false;
}
var num = 0; 
var counter = 0;
// Добавляем товар в корзину
function addToCart(e){
	this.disabled = true; // блокируем кнопку на время операции с корзиной
	var cartData = getCartData() || {}, // получаем данные корзины или создаём новый объект, если данных еще нет
			parentBox = this.parentNode, // родительский элемент кнопки &quot;Добавить в корзину&quot;
			itemId = this.getAttribute('data-id'), // ID товара
			itemTitle = parentBox.querySelector('.item_title').innerHTML, // название товара
			itemPrice = parentBox.querySelector('.item_price').innerHTML; // стоимость товара
            //itemCounter = parentBox.querySelector('.counter').innerHTML;
	if(cartData.hasOwnProperty(itemId)){ // если такой товар уже в корзине, то добавляем +1 к его количеству
		cartData[itemId][2] += 1;
	} else { // если товара в корзине еще нет, то добавляем в объект
		cartData[itemId] = [itemTitle, itemPrice, 1];
	}
    
    num += 1 * cartData[itemId][1];
    document.querySelector(".modal-pricetag").innerHTML = num + " $";
    
	// Обновляем данные в LocalStorage
	if(!setCartData(cartData)){ 
		this.disabled = false; // разблокируем кнопку после обновления LS
	}

	counter += 1;

	document.getElementById("enscart_my_counter_wrapper").innerHTML = counter;

	return false;

}

// Устанавливаем обработчик события на каждую кнопку &quot;Добавить в корзину&quot;
for(var i = 0; i < itemBox.length; i++){
	addEvent(itemBox[i].querySelector('.add_item'), 'click', addToCart);
}

// Открываем корзину со списком добавленных товаров
function openCart(e){

	var cartData = getCartData(), // вытаскиваем все данные корзины
			totalItems = '';
	console.log(JSON.stringify(cartData));

	// если что-то в корзине уже есть, начинаем формировать данные для вывода
	if(cartData !== null){
		totalItems = '<table class="shopping_list"><tr><th>Наименование</th><th>Цена</th><th>Кол-во</th></tr>';
		for(var items in cartData){
			totalItems += '<tr>';
			for(var i = 0; i < cartData[items].length; i++){
				totalItems += '<td>' + cartData[items][i] + '</td>';
			}
			totalItems += '</tr>';
		}
		totalItems += '<table>';
        totalItems += confirmm = '<div class="confirm"><button onClick="closee()" class = "button confirm-button" >confirm</button><div>'
		cartCont.innerHTML = totalItems;
	} else {
		// если в корзине пусто, то сигнализируем об этом
		cartCont.innerHTML = 'В корзине пусто!';
	}
    document.getElementById("cart_content").style.display = 'block';
	return false;
}
/* Открыть корзину */
addEvent(d.getElementById('checkout'), 'click', openCart);
/* Очистить корзину */
addEvent(d.getElementById('clear_cart'), 'click', function(e){
	localStorage.removeItem('cart');
	cartCont.innerHTML = 'Корзина очишена.';
    num = 0;	
	counter = 0;
    document.querySelector(".modal-pricetag").innerHTML = num;  
    document.getElementById("cart_content").style.display = 'flex';
	document.getElementById("enscart_my_counter_wrapper").innerHTML = counter;
});

function closee() {
    localStorage.removeItem('cart');
	cartCont.innerHTML = 'Thank you for your purchase!';
    num = 0;	
    document.querySelector(".modal-pricetag").innerHTML = num;  
    document.getElementById("cart_content").style.display = 'flex';
}