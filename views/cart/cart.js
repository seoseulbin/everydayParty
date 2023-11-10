// import로 헤더 렌더링
import { Header } from '../public/header/header.js';

const headerRender = () => {
  return Header();
};

headerRender();



//---------------api test----------------------------------------

// fetch(`/api/products?products=${productId}`)
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data);

//     const product = data.products.find(
//       ({ _id }) => _id === '654a60f195cd6f5052eaad13'
//     );
//     console.log(product);
//   });

// fetch는 for문 안에서 해야함 그런데 느리니까 (3data x n개) -> 병렬로 나열 할 수 있는 Promise.all 사용해서 장바구니 상품에 표현될 데이터 콜 요청.
// api에서 products데이터(id,상품명, 수량, 옵션) 가져오기< 백단에서 아직 개별id가 작성이 안 됨. /api/products/?products=${productId} 변경예정.

// promise.all 사용 test
// 상품id 가져오기.
// const promiseId = fetch('/api/products')
//   .then((response) => response.json())
//   .then((data) => {
//     const productId = data.products[0]._id;
//     console.log(productId); // [0]의 _id
//   });
// // 상품명 가져오기
// const promiseName = fetch('/api/products')
//   .then((response) => response.json())
//   .then((data) => {
//     const productName = data.products[0].name;
//     console.log(productName); // [0]의 name
//   });
// // 상품단가 가져오기
// const promisePrice = fetch('/api/products')
//   .then((response) => response.json())
//   .then((data) => {
//     const productPrice = data.products[0].price;
//     console.log(productPrice); // [0]의 price
//   });
// //상품옵션 가져오기 < 컬러 사이즈 둘다..?
// const promiseOption = fetch('/api/products')
//   .then((response) => response.json())
//   .then((data) => {
//     const productOption = data.products[0].option;
//     console.log(productOption); // [0]의 option
//   });
// //상품수량 가져오기
// const promiseQuantity = fetch('/api/products')
//   .then((response) => response.json())
//   .then((data) => {
//     const productQuantity = data.products[0].quantity;
//     console.log(productQuantity); // [0]의 quantity
//   });

// Promise.all([promiseId, promiseName, promisePrice, promiseQuantity]).then(
//   console.log
// );


//----------------api test----------------------------------------

// 로컬스토리지에서 상품 데이터 받아오기
const cartData = localStorage.getItem('cart');
console.log(cartData);


// 1. 장바구니에 담겨온 상품이 표현되는 부분
// id값을 기준으로 상품이 담겨오는 함수
let cartItems = JSON.parse(localStorage.getItem("cart"));
const newCartItems = [];
if(cartItems !== null){
  for (let i = 0; i < cartItems.length; i++) {
    console.log(i, newCartItems, cartItems);
    const productInCartIndex = newCartItems.findIndex((item) => item.id === cartItems[i].id);
    if (productInCartIndex !== -1) {
        newCartItems[productInCartIndex].quantity = parseInt(newCartItems[productInCartIndex].quantity) + parseInt(cartItems[i].quantity); // 해당제품 수량만 증가
        console.log(newCartItems[productInCartIndex].quantity);
    } else {
        newCartItems.push({ id: cartItems[i].id, name: cartItems[i].name, price: cartItems[i].price, quantity: cartItems[i].quantity, option: cartItems[i].option,});
    }
}
}


localStorage.setItem("cart", JSON.stringify(newCartItems));

// JSON 문자열을 객체, 배열로 변환 (로컬스토리지)
cartItems = JSON.parse(localStorage.getItem("cart"));
updateCart();



// id값을 기준으로 상품을 제거하는 함수
function removeFromCart(id) {
  const productInCartIndex = cartItems.findIndex((item) => item.id === id);

  if (productInCartIndex !== -1) {
    if (cartItems[productInCartIndex].quantity > 1) {
      cartItems[productInCartIndex].quantity -= 1;
    } else {
    }
  }

  cartItems.splice(productInCartIndex, 1); // 추가된 상품 삭제
  updateCart();
}

   function updateCart() {
  const itemsList = document.getElementById('items_list');
  itemsList.innerHTML = ''; // 리스트 비우기

  // 담아온 상품정보 생성 함수
  cartItems.forEach((item) => {
    const itemDiv = document.createElement('div');
    itemDiv.setAttribute('class', 'itemDiv');
    itemsList.appendChild(itemDiv);
    
    const imageBox = document.createElement("img");
    imageBox.setAttribute("src","item.url")
    itemDiv.appendChild(imageBox)

    // 체크박스 생성
    const checkboxInput = document.createElement('input');
    checkboxInput.setAttribute('type', 'checkbox');
    checkboxInput.setAttribute('class', 'checkboxInput');
    checkboxInput.setAttribute('checked', true);
    itemDiv.appendChild(checkboxInput);

    // 상품명
    const itemName = document.createElement('p');
    itemName.setAttribute('class', 'itemName');
    itemName.textContent = item.name;
    itemDiv.appendChild(itemName);

    // 상품가격
    const itemPrice = document.createElement('p');
    itemPrice.setAttribute('class', 'itemPrice');
    itemPrice.textContent = item.price + '원';
    itemDiv.appendChild(itemPrice);

    //상품명+상품가격
    const itemNamePrice = document.createElement('div');
    itemNamePrice.setAttribute('id', 'itemNamePrice');
    itemNamePrice.append(itemName, itemPrice);
    itemDiv.appendChild(itemNamePrice);

    // 수량 감소 버튼
    const minusButton = document.createElement('button');
    minusButton.setAttribute('class', 'minusButton');
    minusButton.textContent = '-';
    minusButton.onclick = function () {
      if (item.quantity > 1) {
        item.quantity--;
        itemQuantity.textContent = item.quantity;
        //총 상품금액을 뿌려주는 함수 호출
        calculateTotalPrice();
        renderTotal();
        console.log(cartItems);
      }
    };
    itemDiv.appendChild(minusButton);

    //상품수량
    const itemQuantity = document.createElement('p');
    itemQuantity.setAttribute('class', 'itemQuantity');
    itemQuantity.textContent = item.quantity;
    itemDiv.appendChild(itemQuantity);

    // 수량 증가 버튼
    const plusButton = document.createElement('button');
    plusButton.setAttribute('class', 'plusButton');
    plusButton.textContent = '+';
    plusButton.onclick = function () {
      item.quantity++;
      itemQuantity.textContent = item.quantity;
      calculateTotalPrice();
      renderTotal();
    };
    itemDiv.appendChild(plusButton);

    //수량조절버튼
    const quantityButtons = document.createElement('div');
    quantityButtons.setAttribute('class', 'quantityButtons');
    quantityButtons.append(minusButton, itemQuantity, plusButton);
    itemDiv.appendChild(quantityButtons);

    // // 휴지통 생성 
    // const removeButton = document.createElement('button');
    // removeButton.setAttribute('class', 'removeButton');
    // removeButton.textContent = '';
    // removeButton.onclick = function () {
    //   removeFromCart(item.id);
    //   itemDiv.remove();
    // };
    // itemDiv.appendChild(removeButton);
  });

  // 2. 결제 정보를 나타내는 부분

  renderTotal();

  function renderTotal() {
    const totalPrice = document.querySelector('.total_price');
    totalPrice.textContent = `총 상품금액: ${calculateTotalPrice().toLocaleString()} 원`;
    // 총 상품금액
    const totalDiv = document.createElement('div');
    totalDiv.setAttribute('class', 'totalDiv');
    itemsList.appendChild(totalDiv);

   
    // 총 결제금액
    const sumPriceHelper = document.querySelector('.sum_price_helper');
    sumPriceHelper.textContent = `${sumPrice().toLocaleString()} 원`;
  }
  renderTotal();
}

//  총상품가격
const total = calculateTotalPrice();

// 총 상품금액 계산 함수
function calculateTotalPrice() {
  let price = 0;
  cartItems.forEach((item) => {
    price += item.price * item.quantity;
  });
  return Number(price) // 3자리 마다 , 삽입
 
}




 // 배송비 FIXME: 상품금액이 0원이어도 3000으로 표기됨
 function calculateShippingFee(){
  if(cartItems.length === 0 || total === 0){
    return 0
  }else{
    return 3000;
  }
}

 const shippingFee = calculateShippingFee();
 const shippingFeeNumber = document.querySelector('.shipping_fee_number');
 shippingFeeNumber.textContent = `: ${shippingFee.toLocaleString()} 원`;
 console.log(shippingFeeNumber.textContent)


//총 결제금액 계산 함수
function sumPrice() {
  return calculateTotalPrice()===0?0:calculateTotalPrice()+3000;
}





//3. 상품 구매를 나타내는 부분
//전체상품 구매 함수

function allOrder() {
  if (cartItems.length >= 1) {
    alert('주문완료!');
  } else if (cartItems.length < 1) {
    alert('상품을 담아주세요!');
  }
}

// 전체상품 구매 이벤트리스너
const allOrderButton = document.querySelector('.all_order_button');
allOrderButton.addEventListener('click', allOrder);


//itemDiv를 배열로 받아와서, check가 된 상품id를 찾고? 삭제하면 다시 해당 상품들을 localStorage.setItem("cart", JSON.stringify(newCartItems)); 에 담아준다.(남은 상품만 담기겠지) 다시 localStorage.getItem("cart", JSON.stringify(newCartItems)) 받아와서 뿌려주면. 
//  // 배송비 FIXME: 상품금액이 0원이어도 3000으로 표기됨
//  function calculateShippingFee(){
//   if(cartItems.length === 0 || total === 0){
//     return 0
//   }else{
//     return 3000;
//   }
// }

//  const shippingFee = calculateShippingFee();
//  const shippingFeeNumber = document.querySelector('.shipping_fee_number');
//  shippingFeeNumber.textContent = `: ${shippingFee.toLocaleString()} 원`;
//  console.log(shippingFeeNumber.textContent)




//전체상품 삭제 함수
function removeAllItems() {
  cartItems.length = 0; //장바구니비우기
  updateCart();
  window.localStorage.removeItem('cart'); // 로컬스토리지에서도 삭제될 수 있도록

  calculateTotalPrice();
  console.log(calculateTotalPrice())
  calculateShippingFee();
  console.log(calculateShippingFee())
  updateCart();
  location.reload();
}

// renderTotal();

//전체상품 삭제 이벤트리스너
const deleteAllButton = document.querySelector('.delete_all_button');
deleteAllButton.addEventListener('click', removeAllItems);

//선택상품 삭제 함수
function removeCheckedItems() {
  const checkboxes = document.querySelectorAll('.checkboxInput');
  const itemsToRemove = [];

  let items = JSON.parse(localStorage.getItem("cart"));
  console.log(items)
  checkboxes.forEach((checkbox, index) => {
    if (checkbox.checked) {
      itemsToRemove.push(cartItems[index].id);
    }
  });

  itemsToRemove.forEach((id) => {
    removeFromCart(id);
    items = items.filter((data)=>data.id!==id)
    console.log(items)
  });
  localStorage.setItem("cart",JSON.stringify(items));
  location.reload();
};



// 선택상품 삭제 이벤트리스너
const deleteCheckedButton = document.querySelector('.delete_checked_button');
deleteCheckedButton.addEventListener('click', removeCheckedItems);

//선택상품 구매 함수
function selectedOrder() {
  const checkboxes = document.querySelectorAll('.checkboxInput');
  const selectedItems = [];

  let isChecked = false; //플래그 변수
  checkboxes.forEach((checkbox, index) => {
    if (checkbox.checked) {
      isChecked = true;
    }
  });

  if (isChecked) {
    alert('주문 완료!');
  } else {
    alert('선택된 상품이 없습니다!');
  }
}




// 선택상품 구매 이벤트리스너
const selectedOrderButton = document.querySelector('.selected_order_button');
selectedOrderButton.addEventListener('click', selectedOrder);



// 계속 쇼핑하기 이벤트 리스너

function mainpage(){
  window.location.href = 'http://localhost:5000/main/main.html'
}
const keepShoppingButton = document.querySelector('.keep_shopping_button')
keepShoppingButton.addEventListener('click', mainpage)







updateCart(); // 상품을 담을 때 외부에 전달해주는 함수. export.

// addToCart(1, '파티풍선', 5000, 2); //test
// addToCart(2, '코스튬', 7000, 1); //test

/**
 *  이후에 orderpage로 주문id 넘겨주는 작업 해야함. 지은님 채팅 참고
 *
 *구매- -> 주문완료 페이지 넘길 때 localStorage 에 담으면 안 되는 이유는
 ex) 관리자페이지에서 해당 상품에 대한 정보를 조작하면, local로는 따라갈 수가 없음.
 그래서 api로 해야함. 
 * */


