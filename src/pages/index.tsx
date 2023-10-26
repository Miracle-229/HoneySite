import React, { useId, useState, useEffect } from 'react';
import Image from 'next/image';
import { collection, getDocs } from 'firebase/firestore';
import style from '@/styles/Home.module.scss';
import Layout from '@/layouts/Layout';
import { IProductHome } from '@/types/product';
import Link from 'next/link';
import { db } from '../api/firebase-config';
import { useCart } from '../context/useCart';

export default function Home({ products }: { products: IProductHome[] }) {
  const [cart, setCart] = useState<IProductHome[]>([]);
  const { cartCount, setCartCount } = useCart();

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const addToCart = (product: IProductHome) => {
    const updatedCart = [...cart];
    const existingProductIndex = updatedCart.findIndex(
      (p) => p.name === product.name
    );

    if (existingProductIndex !== -1) {
      if (updatedCart[existingProductIndex].count !== undefined) {
        updatedCart[existingProductIndex].count! += 1;
      }
    } else {
      updatedCart.push({ ...product, count: 1 });
    }
    setCartCount(cartCount + 1);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const id = useId();
  return (
    <Layout title="Bee Man">
      <main className={style.main}>
        <div className={style.home_text_major}>
          <h1>Натуральный мёд</h1>
          <pre>
            Натуральный мёд - это не только Вкусный продукт, но и настоящий
            подарок природы. Это настоящий дар, который приносит в нашу жизнь не
            только вкус и пользу, но и красоту и вдохновение.
          </pre>
        </div>
        <div className={style.home_box_major}>
          <div className={style.home_img_major}>
            <Image
              src="/honeyhome.jpg"
              layout="fill"
              objectFit="cover"
              alt="honey"
            />
          </div>
        </div>
      </main>
      <div className={style.products}>
        <h2>Популярные продукты</h2>
        <div className={style.home_row_products}>
          {products.map((product: IProductHome) => (
            <div className={style.home_box_product} key={id}>
              <div className={style.home_img_product}>
                <Image
                  alt="honey"
                  src={product.img}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <h3>{product.name}</h3>
              <h4>{product.price}</h4>
              {cart.some((p) => p.name === product.name) ? (
                <Link href="/cart" className={style.button_product_bought}>
                  В корзине
                </Link>
              ) : (
                <button
                  type="button"
                  className={style.button_product}
                  onClick={() => addToCart(product)}
                >
                  Купить
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const productsCollectionRef = collection(db, 'Products');
  const data = await getDocs(productsCollectionRef);
  const products = data.docs.map(
    (doc) => ({ ...doc.data(), id: doc.id }) as IProductHome
  );
  return {
    props: {
      products,
    },
  };
}
