import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BsFillCartFill } from 'react-icons/bs';
import style from './Header.module.scss';
import { useCart } from '@/context/useCart';

function Header() {
  const { cartCount } = useCart();


  return (
    <div className={style.header}>
      <Link href="/">
        <Image
          className={style.logo}
          src="/honeylogo.png"
          width={60}
          height={65}
          alt="bee-man"
        />
      </Link>
      <div className={style.list}>
        <ul>
          <Link href="/products">
            <li>Продукты</li>
          </Link>
          <Link href="/about">
            <li>О нас</li>
          </Link>
          <Link href="/gallery">
            <li>Галерея</li>
          </Link>
        </ul>
      </div>
      <div>
        <Link className={style.cart} href="/cart">
          <div>
            <BsFillCartFill />
            {cartCount > 0 && (
              <span className={style.cart_items}>{cartCount}</span>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
