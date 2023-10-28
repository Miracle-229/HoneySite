import Layout from '@/layouts/Layout';
import React, { useEffect, useState, useId } from 'react';
import style from '../styles/Cart.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { IProductHome } from '@/types/product';
import { useCart } from '@/context/useCart';

function Cart() {
  const [cart, setCart] = useState<IProductHome[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [city, setCity] = useState('');
  const [totalFinalPrice, setTotalFinalPrice] = useState(0);
  const { cartCount, setCartCount } = useCart();
  const id = useId();

  const handleBuyClick = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handlePurchase = () => {
    const data = {
      name,
      phoneNumber,
      city,
      totalFinalPrice,
      products: cart
    };

    fetch('http://localhost:8000/submitOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          setModalOpen(false);
          localStorage.removeItem('cart');
          localStorage.removeItem('totalFinalPrice');
          localStorage.removeItem('cartCount');
          setTimeout(() => {
            window.location.reload();
          }, 500);
        } else {
          
          console.error('Ошибка при отправке заказа на сервер');
        }
      })
      .catch((error) => {
        console.error('Ошибка при отправке заказа:', error);
      });
  };

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const countItems = (item: IProductHome, num: number) => {
    const updatedCart = cart.map((cartItem) =>
      cartItem.name === item.name
        ? { ...cartItem, count: (cartItem.count || 0) + num }
        : cartItem
    );
    const updatedCartWithFinalPrice = updatedCart.map((item) => ({
      ...item,
      finalPrice: item.price * (item.count || 1),
    }));
    localStorage.setItem('cart', JSON.stringify(updatedCartWithFinalPrice));
    setCart(updatedCartWithFinalPrice);
  };

  const removeFromCart = (item: IProductHome) => {
    const updatedCart = cart.filter((cartItem) => cartItem.name !== item.name);

    setCart(updatedCart);
    const updateCartInLocalStorage = (cart: IProductHome[]) => {
      localStorage.setItem('cart', JSON.stringify(cart));
    };
    setCartCount(cartCount - 1);
    updateCartInLocalStorage(updatedCart);
  };

  useEffect(() => {
    const updatedTotalFinalPrice = cart.reduce((total, item) => {
      const finalPrice = item.price * (item.count || 1);
      return total + finalPrice;
    }, 0);

    setTotalFinalPrice(updatedTotalFinalPrice);

    localStorage.setItem('totalfinalPrice', updatedTotalFinalPrice.toString());
  }, [cart]);

  return (
    <div className={style.wrapper}>
      <Layout title="Корзина">
        <div className={style.main}>
          <h3 className={style.h3}>Корзина</h3>
          {cart.length > 0 ? (
            <div className={style.cart_items}>
              {cart.map((item: IProductHome) => (
                <div key={id} className={style.cart_item}>
                  <div className={style.cart_item_img_box}>
                    <button
                      onClick={() => removeFromCart(item)}
                      type="button"
                      className={style.cart_item_delete}
                    >
                      X
                    </button>
                    <div className={style.cart_item_img}>
                      <Image
                        layout="fill"
                        objectFit="contain"
                        src={item.img}
                        alt={item.name}
                      />
                    </div>
                    <h4>{item.name}</h4>
                  </div>
                  <div className={style.cart_item_count_box}>
                    <div className={style.cart_item_count_title}>
                      <p>Кол-во</p>
                    </div>
                    <div className={style.cart_item_count}>
                      <button
                        type="button"
                        onClick={() => countItems(item, -1)}
                        disabled={!item.count || item.count <= 1}
                      >
                        -
                      </button>
                      <p>{item.count || 0}</p>
                      <button type="button" onClick={() => countItems(item, 1)}>
                        +
                      </button>
                    </div>
                  </div>
                  <div className={style.cart_item_price}>
                    <p className={style.cart_item_price_title}>Сумма:</p>
                    <p className={style.cart_item_price_text}>
                      {item.price * (item.count || 1)}р.
                    </p>
                  </div>
                </div>
              ))}
              <div className={style.cart_items_full_price}>
                <p>Итого: {totalFinalPrice}р.</p>
                <button type="button" onClick={handleBuyClick}>
                  Купить
                </button>
              </div>
              {isModalOpen && (
                <div className={style.modal_background}>
                  <div className={style.modal_content}>
                    <span onClick={handleModalClose} className={style.close}>
                      X
                    </span>
                    <h2>Оформление заказа</h2>
                    <input
                      type="text"
                      placeholder="Имя"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Номер телефона"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Город"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                    <p>Сумма заказа: {totalFinalPrice}р.</p>
                    <button onClick={handlePurchase}>Купить</button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className={style.cart_empty}>
              <div className={style.cart_empty_img_box}>
                <Image
                  src="/emptyjar.png"
                  layout="fill"
                  objectFit="contain"
                  alt="honey"
                />
              </div>
              <div className={style.cart_empty_text}>
                <h3 className={style.cart_empty_text_h3}>Ваша корзина пуста</h3>
                <h5 className={style.cart_empty_text_h5}>
                  Перейдите в <Link href="/products">продукты</Link> и добавьте
                  товары
                </h5>
              </div>
            </div>
          )}
        </div>
      </Layout>
    </div>
  );
}

export default Cart;
