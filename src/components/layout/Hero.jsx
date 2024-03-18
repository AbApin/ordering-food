import Image from 'next/image';
import Right from '../icons/Right';

export default function Hero() {
  return (
    <section className="flex items-center justify-between flex-wrap gap-y-8">
      <div className="py-12">
        <h1 className="text-4xl font-semibold">
          Everything <br /> is better
          <br /> with a&nbsp; <span className="text-primary">Pizza</span>
        </h1>
        <p className="my-6 text-gray-500 text-sm">
          Pizza is the missing piece that makes every day complete, <br /> a simple yet delicious
          joy in life
        </p>
        <div className="flex gap-4">
          <button className="flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-full text-sm">
            Order Now
            <Right />
          </button>
          <button className="flex items-center gap-2 font-semibold text-gray-600">
            Learn More
            <Right />
          </button>
        </div>
      </div>
      <div className="relative hidden lg:block">
        <Image
          src={'/pizza.png'}
          width={500}
          height={500}
          sizes="(max-width: 768px) 100vw, 33vw"
          alt="pizza"
          priority={true}
        />
      </div>
    </section>
  );
}
