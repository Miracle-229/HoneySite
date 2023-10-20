import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import style from './Footer.module.scss';

function Footer() {
  return (
    <div className={style.footer}>
      <div className={style.logo}>
        <Image
          src="/honeylogo.png"
          alt="bee-man"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <h3>©Bee Man</h3>
      <Link href="https://www.kufar.by/l/r~grodno">
        <div className={style.kufar_logo}>
          <Image
            src="/kufar.png"
            alt="bee-man"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </Link>
    </div>
  );
}

export default Footer;
