import { motion } from 'framer-motion';
import rest1 from "../assets/img/rest1.jpg";
import rest2 from "../assets/img/rest2.jpg";
import pr1 from "../assets/img/pr1.jpg";
import pr2 from "../assets/img/pr2.jpg";

const partners = [
  {
    name: "Gourmet Bites",
    type: "Restaurant",
    logo: rest1,
    description: "A fusion restaurant offering premium dishes for our travelers.",
  },
  {
    name: "Sip & Savor",
    type: "Restaurant",
    logo: rest2,
    description: "Fine wine and local cuisine with exclusive discounts for our clients.",
  },
  {
    name: "WanderGear",
    type: "Product",
    logo: pr1,
    description: "Adventure gear and travel essentials for explorers.",
  },
  {
    name: "PackLite",
    type: "Product",
    logo: pr2,
    description: "Lightweight travel products and backpacks made for comfort.",
  },
];

export default function Partners() {
  return (
    <section className="py-16 px-6 bg-gradient-to-br from-indigo-700 via-sky-600 to-teal-500 text-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Our Trusted Partners</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white text-gray-900 p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300"
            >
              <div className="flex items-center space-x-4 mb-4">
                <img src={partner.logo} alt={partner.name} className="w-16 h-16 object-cover rounded-full" />
                <div>
                  <h3 className="text-xl font-semibold">{partner.name}</h3>
                  <p className="text-sm text-indigo-600 font-medium">{partner.type}</p>
                </div>
              </div>
              <p className="text-sm">{partner.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
