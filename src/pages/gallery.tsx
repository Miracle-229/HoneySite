import Image from 'next/image';
import React, { useEffect, useId, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/api/firebase-config';
import { IProductImage } from '@/types/product';
import { GetServerSideProps } from 'next';
import Layout from '@/layouts/Layout';
import { GrFormNextLink, GrFormPreviousLink } from 'react-icons/gr';
import style from '../styles/Gallery.module.scss';

export default function Gallery({ images }: { images: IProductImage[] }) {
  const [data, setData] = useState<{ img: string; i: number }>({
    img: '',
    i: 0,
  });
  const id = useId();
  const viewImage = (img: string, i: number) => {
    setData({ img, i });
  };

  const imgAction = (action: string) => {
    if (action === 'next') {
      const nextIndex = data.i + 1;
      viewImage(images[nextIndex].img, nextIndex);
    }
    if (action === 'prev') {
      const prevIndex = data.i - 1;
      viewImage(images[prevIndex].img, prevIndex);
    }
  };

  const handleCloseClick = () => {
    setData({ img: '', i: 0 });
  };

  const isPrevButtonVisible = data.i > 0;
  const isNextButtonVisible = data.i < images.length - 1;

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleCloseClick();
      }
    };
    window.addEventListener('keydown', handleEscKey);
    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, []);

  return (
    <>
      {data.img && (
        <div className={style.gallery_full_img}>
          <button
            onClick={handleCloseClick}
            type="button"
            className={style.gallery_full_img_button_close}
          >
            X
          </button>
          {isPrevButtonVisible && (
            <button
              className={style.gallery_full_img_button}
              type="button"
              onClick={() => imgAction('prev')}
            >
              <GrFormPreviousLink />
            </button>
          )}
          <div className={style.gallery_full_img_box}>
            <Image
              layout="fill"
              objectFit="contain"
              src={data.img}
              alt="Image"
            />
          </div>
          {isNextButtonVisible && (
            <button
              onClick={() => imgAction('next')}
              className={style.gallery_full_img_button}
              type="button"
            >
              <GrFormNextLink />
            </button>
          )}
        </div>
      )}
      <Layout title="Галерея">
        <div className={style.gallery}>
          {images.map((product: IProductImage, index: number) => (
            <div key={id} className={style.gallery_box_image}>
              <Image
                layout="fill"
                objectFit="cover"
                alt="honey"
                src={product.img}
                className={style.gallery_image}
                onClick={() => viewImage(product.img, index)}
              />
            </div>
          ))}
        </div>
      </Layout>
    </>
  );
}
export const getServerSideProps: GetServerSideProps = async () => {
  const productDocRef = doc(db, 'Gallery', 'Gallery');
  const docSnap = await getDoc(productDocRef);
  if (docSnap.exists()) {
    const docData = docSnap.data();
    if (docData.images) {
      const images = docData.images.map((image: IProductImage) => ({
        ...image,
        id: image.id || null,
      }));
      return {
        props: {
          images,
        },
      };
    }
  }
  return {
    props: {
      images: [],
    },
  };
};
