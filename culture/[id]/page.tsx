"use client";

import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import React from "react";

const cultureDetails = {
  traditions: {
    title: "Traditions Maliennes",
    description:
      "Les traditions maliennes sont riches et variées, transmises de génération en génération à travers les cérémonies, les danses et les contes des griots.",
    images: [
      "/dogon.jpg",
      "/mosquewalk.jpg",
      "/dogono.jpg",
      "/djennneee.jpg",
    ],
  },
  musique: {
    title: "Musique Malienne",
    description:
      "Berceau du blues africain, la musique malienne fait vibrer le monde avec la kora, le balafon et les voix emblématiques de ses artistes.",
    images: [
      "/flutte.jpg",
      "/oumousang.jpg",
      "/malimusic.jpg",
      "/toumani.jpg",
      "/salif.jpg",
    ],
  },
  art: {
    title: "Art Malien",
    description:
      "L'art malien reflète l'âme du pays, entre sculptures en bois, bogolans colorés et masques rituels d’une grande richesse esthétique.",
    images: ["/dogonart.jpg", "/doll.jpg", "/doll2.jpg", "/multiworkers.jpg"],
  },
  architecture: {
    title: "Architecture Malienne",
    description:
      "L'architecture en terre crue du Mali, dont la célèbre mosquée de Djenné, est un trésor patrimonial inscrit à l'UNESCO.",
    images: [
      "/tour.jpg",
      "/hyppo.jpg",
      "/konoba.jpg",
      "/arch.jpg",
      "/water.jpg",
    ],
  },
};

export default function CultureDetail() {
  const params = useParams<{ id: keyof typeof cultureDetails }>();

  if (!params || !params.id || !cultureDetails[params.id]) {
    return (
      <div className="text-center text-xl mt-10 text-gray-600">
        Contenu introuvable.
      </div>
    );
  }

  const culture = cultureDetails[params.id];

  return (
    <section className="py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          className="text-4xl font-bold text-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {culture.title}
        </motion.h1>

        <p className="text-lg text-primary-default text-center mb-6 max-w-3xl mx-auto">
          {culture.description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {culture.images.map((image, index) => (
            <motion.div
              key={index}
              className="rounded-lg overflow-hidden shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={image}
                alt={culture.title}
                className="object-cover w-full h-64"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
