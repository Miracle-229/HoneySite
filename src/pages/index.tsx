import React, { useId } from 'react';
import Image from 'next/image';
import { collection, getDocs } from 'firebase/firestore';
import style from '@/styles/Home.module.scss';
import Layout from '@/layouts/Layout';
import { IProductHome } from '@/types/product';
import { db } from '../api/firebase-config';

export default function Home({ products }: { products: IProductHome[] }) {
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
              <button type="submit" className={style.button_product}>
                Купить
              </button>
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
