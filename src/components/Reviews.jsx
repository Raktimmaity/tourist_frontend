import avatar from '../assets/img/avator.jpg';
import { FaStar } from 'react-icons/fa';
import Slider from 'react-slick';
import { motion } from 'framer-motion';

const reviews = [
  {
    image: avatar,
    name: 'Emily Rose',
    location: 'New York, USA',
    rating: 5,
    review:
      'Absolutely loved the experience! Everything was perfectly organized, and the views were breathtaking. Highly recommend!',
  },
  {
    image: avatar,
    name: 'Liam Chan',
    location: 'Singapore',
    rating: 4,
    review:
      'A memorable trip with great company and wonderful service. Just wish the itinerary included more local food spots.',
  },
  {
    image: avatar,
    name: 'Sophia Garcia',
    location: 'Barcelona, Spain',
    rating: 5,
    review:
      'From start to finish, it was smooth and exciting. The guides were super friendly and knowledgeable!',
  },
];

const settings = {
  dots: true,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 4000,
  speed: 700,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  pauseOnHover: true,
};

export default function Reviews() {
  return (
    <section className="py-20 bg-gradient-to-br from-sky-100 via-white to-emerald-100">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-center text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-sky-600 to-teal-500 mb-12">
          What Our Travelers Say
        </h2>

        <Slider {...settings}>
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="px-2"
            >
              <div className="backdrop-blur-lg bg-white/30 border border-white/50 shadow-xl rounded-2xl p-8 text-center max-w-3xl mx-auto">
                <div className="flex flex-col items-center gap-4 mb-6">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-24 h-24 rounded-full border-4 border-white/60 shadow-md object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-indigo-800">{review.name}</h3>
                    <p className="text-sm text-gray-600">{review.location}</p>
                  </div>
                </div>

                <div className="flex justify-center text-yellow-400 mb-4">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>

                <p className="text-gray-800 text-lg italic leading-relaxed">
                  "{review.review}"
                </p>
              </div>
            </motion.div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
