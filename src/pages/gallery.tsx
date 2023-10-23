import Image from 'next/image';
import React, { useId } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/api/firebase-config';
import { IProductImage } from '@/types/product';
import { GetServerSideProps } from 'next';
import style from '../styles/Gallery.module.scss';

export default function Gallery({ images }: { images: IProductImage[] }) {
  const id = useId();

  return (
    <div className={style.gallery}>
      {images.map((product: IProductImage) => (
        <div key={id} className={style.gallery_box_image}>
          <Image
            layout="fill"
            objectFit="contain"
            alt="honey"
            src={product.img}
          />
        </div>
      ))}
    </div>
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
