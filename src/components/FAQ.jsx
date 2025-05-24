import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

const faqData = [
  {
    question: 'What is the cancellation policy?',
    answer:
      'You can cancel your booking up to 24 hours before the scheduled departure for a full refund. After that, a cancellation fee may apply.',
  },
  {
    question: 'How do I book a tour?',
    answer:
      'Booking a tour is simple! Just go to our "Tours" section, select the tour you’re interested in, and just click on the Book Tour.',
  },
  {
    question: 'Are meals included in the tours?',
    answer:
      'Yes, we include meals for all our tours unless stated otherwise in the itinerary. Meals typically include breakfast, lunch, and dinner.',
  },
  {
    question: 'Do I need travel insurance?',
    answer:
      'While it is not mandatory, we highly recommend travel insurance to protect you in case of unexpected events or emergencies.',
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-indigo-50 via-white to-teal-50">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <h2 className="pb-6 text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-sky-600 to-teal-500 text-center mb-12">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">
          {faqData.map((faq, index) => (
            <div key={index} className="shadow-md rounded-xl bg-white overflow-hidden p-2">
              <button
                onClick={() => toggleAnswer(index)}
                className="w-full text-left flex items-center justify-between py-4 px-6 bg-white hover:bg-gray-100 focus:outline-none rounded-xl transition duration-200"
              >
                <span className="text-lg font-semibold text-indigo-700">{faq.question}</span>
                <FaPlus
                  className={`transform transition-all duration-300 ${activeIndex === index ? 'rotate-45' : ''} text-teal-500`}
                />
              </button>
              {activeIndex === index && (
                <div className="py-4 px-6 text-gray-700 bg-gray-100 rounded-xl mt-2">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
