import React, { useId } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { IProductHome, IProductSell } from '@/types/product';
import Image from 'next/image';
import Layout from '../layouts/Layout';
import style from '../styles/Products.module.scss';
import { db } from '../api/firebase-config';

export default function Products({ products }: { products: IProductSell[] }) {
  const id = useId();
  return (
    <Layout title="Продукты">
      <h3 className={style.h3}>Продукты</h3>
      {products.map((productDoc) => (
        <div key={id} className={style.product}>
          <h3 className={style.product_h3}>{productDoc.rawname}</h3>
          <div className={style.product_raw}>
            {productDoc.products.map((product: IProductHome) => (
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
      ))}
    </Layout>
  );
}

export async function getServerSideProps() {
  const productsCollectionRef = collection(db, 'SellProducts');
  const data = await getDocs(productsCollectionRef);
  const products = data.docs.map(
    (doc) => ({ ...doc.data(), id: doc.id }) as IProductSell
  );
  return {
    props: {
      products,
    },
  };
}
