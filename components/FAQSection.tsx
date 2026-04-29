"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(1); // Question 2 open by default like screenshot

  const faqs = [
    {
      question: "1. What sets a stay at TripleOne Palaces, Hotels & Resorts apart from other luxury hotels?",
      answer: "TripleOne offers a perfect blend of modern Indian luxury, timeless design, and warm hospitality. Every space reflects elegance, comfort, and the philosophy of Atithi Devo Bhava — where every guest is truly valued and welcomed.",
    },
    {
      question: "2. Are TripleOne hotels a good option for families travelling together?",
      answer: "TripleOne hotels warmly welcome families with tailored amenities, interconnecting rooms, kids menus, supervised activities, and thoughtful services for parents. Spacious accommodation and flexible dining make family stays comfortable. Staff anticipate needs such as high chairs and babysitting options, allowing families to relax, explore, and create lasting memories together in comfort.",
    },
    {
      question: "3. What makes TripleOne a special choice for a romantic getaway or honeymoon?",
      answer: "TripleOne creates unforgettable romantic experiences with private villas, candlelit dinners, couples spa treatments, and breathtaking views. Our dedicated romance concierge ensures every moment is magical — from rose petal turndowns to personalized honeymoon surprises.",
    },
    {
      question: "4. Does TripleOne provide butler service for guests?",
      answer: "Yes. TripleOne offers personalised butler service across all our properties. Your dedicated butler takes care of unpacking, reservations, special requests, and ensures a seamless and luxurious stay from arrival to departure.",
    },
    {
      question: "5. What special experiences does TripleOne create for couples and honeymooners seeking a romantic getaway?",
      answer: "From private poolside dinners under the stars to curated couple’s spa journeys and romantic excursions, TripleOne designs unique experiences that celebrate love and create cherished memories.",
    },
    {
      question: "6. Are vegetarian, vegan, and Jain dining preferences catered to at TripleOne?",
      answer: "Absolutely. Our chefs are trained to prepare authentic vegetarian, vegan, and Jain meals with complete respect for dietary requirements. Special menus and customised dishes are available across all restaurants and in-room dining.",
    },
    {
      question: "7. Does TripleOne arrange airport transfers for guest convenience?",
      answer: "Yes. We offer seamless airport transfers in luxury vehicles with professional chauffeurs. Complimentary meet-and-greet service is provided at the airport for all guests.",
    },
    {
      question: "8. What kinds of wellness and spa experiences can guests enjoy?",
      answer: "Guests can enjoy signature spa treatments, yoga and meditation sessions, Ayurvedic therapies, fitness centres, and rejuvenating wellness programs designed to restore balance of mind, body, and soul.",
    },
    {
      question: "9. Do any properties offer dedicated Ayurvedic wellness retreats or programs?",
      answer: "Yes. Several TripleOne properties offer dedicated Ayurvedic wellness retreats with qualified doctors, personalised treatment plans, yoga, meditation, and detox programs for deep rejuvenation.",
    },
    {
      question: "10. Can TripleOne host weddings and large corporate events? What support is provided?",
      answer: "Absolutely. TripleOne specialises in hosting grand weddings and high-profile corporate events. We provide full event planning support, dedicated wedding planners, customised menus, décor, entertainment, and seamless logistics.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-16 bg-[#f8f5f0]">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-serif text-[#2c2c2c]">FAQs</h2>
        <p className="text-gray-600 mt-2 text-lg">
          Find answers to your frequently asked questions
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm"
          >
            {/* Question */}
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-[#2c2c2c] leading-relaxed">
                {faq.question}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Answer - only one can be open */}
            {openIndex === index && (
              <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}