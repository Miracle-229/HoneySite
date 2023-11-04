import Layout from '@/layouts/Layout';
import React from 'react';
import Image from 'next/image';
import style from '../styles/About.module.scss';

function About() {
  return (
    <Layout title="О нас">
      <div className={style.major_div}>
        <h3 className={style.h3}>О нас</h3>
        <div className={style.main}>
          <div className={style.main_text}>
            <pre>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Neque
              viverra justo nec ultrices dui sapien eget mi proin. Vitae congue
              eu consequat ac felis donec et odio. Ornare arcu dui vivamus arcu
              felis bibendum ut tristique et. Sed libero enim sed faucibus.
              Libero volutpat sed cras ornare arcu dui vivamus arcu. Nec nam
              aliquam sem et. Praesent elementum facilisis leo vel fringilla.
              Tempor nec feugiat nisl pretium fusce id velit ut. Interdum varius
              sit amet mattis vulputate enim nulla. Lorem ipsum dolor sit amet
              consectetur adipiscing elit pellentesque habitant.
            </pre>
          </div>
          <div className={style.main_box}>
            <div className={style.main_img}>
              <Image
                src="/paseka.jpg"
                layout="fill"
                objectFit="cover"
                alt="honey"
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default About;
