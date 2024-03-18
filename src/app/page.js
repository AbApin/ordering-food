import Hero from '@/components/layout/Hero';
import HomeMenu from '@/components/layout/HomeMenu';
import SectionHeaders from '@/components/layout/SectionHeaders';

export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="text-center my-16" id="about">
        <SectionHeaders subHeader={'Our story'} mainHeader={'About us'} />
        <div className="flex flex-col gap-4 max-w-2xl mx-auto mt-4 text-gray-500">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde magni amet eveniet
            repudiandae harum ipsum quae est perspiciatis dolorum! Hic, quae velit. Fugit dolorum
            harum dicta quibusdam excepturi facere corrupti!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde magni amet eveniet
            repudiandae harum ipsum quae est perspiciatis dolorum! Hic, quae velit. Fugit dolorum
            harum dicta quibusdam excepturi facere corrupti!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde magni amet eveniet
            repudiandae harum ipsum quae est perspiciatis dolorum! Hic, quae velit. Fugit dolorum
            harum dicta quibusdam excepturi facere corrupti!
          </p>
        </div>
      </section>
      <section className="text-center my-8" id="contact">
        <SectionHeaders subHeader={"Don't hesitate"} mainHeader={'Contact us'} />
        <a className="block text-4xl underline text-gray-500  mt-8" href="tel:+46738123123">
          +46 738 123 123
        </a>
      </section>
    </>
  );
}
