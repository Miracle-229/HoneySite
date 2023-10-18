import React from 'react';
import style from './Header.module.scss';
import Image from 'next/image';
import Link from 'next/link';

type Props = {};

const Header = (props: Props) => {
  return (
    <div className={style.header}>
      <Image
        className={style.logo}
        src="/honeylogo.png"
        width={60}
        height={65}
        alt="bee-man"
      />
      <div className={style.list}>
        <ul>
          <Link href="#">
            <li>Продукты</li>
          </Link>
          <Link href="#">
            <li>О нас</li>
          </Link>
          <Link href="#">
            <li>Галерея</li>
          </Link>
        </ul>
      </div>
      <div>
        <Link className={style.login} href="#">
          Вход
        </Link>
      </div>
    </div>
  );
};

export default Header;
