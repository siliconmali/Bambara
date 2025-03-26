/* eslint-disable @next/next/no-img-element */
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

export default function Culture() {
  const images = [
    {
      "id": "traditions",
      "src": "/dogon.jpg",
      "title": "Traditions",
      "alt": "Traditions maliennes",
      "description": "Coutumes ancestrales transmises à travers rites et cérémonies."
    },
    {
      "id": "musique",
      "src": "/malimusic.jpg",
      "title": "Musique",
      "alt": "Musique malienne",
      "description": "Rythmes uniques avec kora, balafon et chants traditionnels."
    },
    {
      "id": "art",
      "src": "/doll.jpg",
      "title": "Art",
      "alt": "Art malien",
      "description": "Sculptures, masques et textiles comme le bogolan."
    },
    {
      "id": "architecture",
      "src": "/tour.jpg",
      "title": "Architecture",
      "alt": "Architecture malienne",
      "description": "Mosquées en terre et villages troglodytes Dogon."
    }
  ]
  

  return (
    <section className="py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-center mb-7"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          L'Héritage Malien
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {images.map((item, index) => (
            <motion.div
              key={index}
              className="relative h-48 sm:h-48 rounded-lg overflow-hidden group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <Link href={`/culture/${item.id}`} passHref>
                <div className="cursor-pointer">
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="object-cover transition-transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/100 to-transparent flex items-end px-4">
                    <div className="text-white">
                      <h2 className="text-lg sm:text-xl font-semibold">
                        {item.title}
                      </h2>
                      <p className="text-sm">{item.description}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
