"use client";

import Missions from "@/components/Missions";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutPage() {
  return (
    <section className="min-h-screen bg-slate-50">
      <div className="relative h-[30vh] flex items-center justify-center bg-[url('/djene.png')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/30"></div>
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white text-4xl md:text-6xl font-bold text-center z-10"
        >
          Préserver l'héritage du Mali
        </motion.h1>
      </div>
      <motion.div
        className="max-w-5xl mx-auto px-6 py-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-3xl text-content-default mb-4">
          Bienvenue sur <b>N'KO DON</b>, une plateforme dédiée à la
          préservation, la collecte et la traduction des langues{" "}
          <b>Bambara et N'Ko</b>.
        </h2>
        <p className="text-lg text-content-secondary">
          Nous croyons que chaque langue est une richesse, un patrimoine qui
          relie les générations et forge l'identité d'un peuple. Notre mission
          est de numériser, traduire et partager les connaissances en Bambara et
          N'Ko, afin de rendre ces langues accessibles à tous.
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto px-3 grid md:grid-cols-2 gap-12 justify-center items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Image
            src="/mali.jpg"
            alt="Carte du Mali"
            width={600}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </motion.div>
        <motion.div
        >
          <h3 className="text-2xl font-bold text-content-default mb-4">
            Pourquoi N'KO DON ?
          </h3>
          <p className="text-lg text-content-secondary">
            Le <b>Mali</b>, notre pays d'origine, est un berceau de
            civilisations et d'héritages culturels. Il a vu naître de{" "}
            <b>grands empires</b>, des <b>savants</b>, et des{" "}
            <b>traditions orales riches</b> qui méritent d'être sauvegardés.
          </p>
          <p className="text-lg text-content-secondary mt-4">
            Cependant, à l'ère du numérique, les langues africaines sont en
            danger. Elles sont souvent peu représentées sur Internet et risquent
            d'être oubliées. <b>N'KO DON </b> est né de cette volonté de
            préserver et promouvoir notre héritage linguistique et culturel.
          </p>
        </motion.div>
      </div>
      <Missions />
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-12 justify-center items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="text-2xl font-bold text-content-default mb-4">
            👥 Une communauté engagée
          </h3>
          <p className="text-lg text-content-secondary">
            Nous croyons en la force du travail collaboratif. Sur{" "}
            <b>N'KO DON</b>, chaque contribution compte ! Que vous soyez
            locuteur natif, linguiste, chercheur ou passionné de culture
            africaine, vous pouvez jouer un rôle essentiel dans cette mission.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Image
            src="/djene.png"
            alt="Communauté N'KO DON"
            width={600}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </motion.div>
      </div>

      <motion.div
        className="text-center py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <h1>
          N'KO DON est plus qu'une simple plateforme, c'est un mouvement pour la
          préservation du savoir africain.
        </h1>
        <h2 className="text-3xl font-bold text-content-default">
          🌟 Rejoignez-nous dès aujourd'hui !
        </h2>
        <i>
          “Une langue qui meurt, c'est une bibliothèque qui brûle.” - Proverbe
          africain
        </i>
        <p className="text-lg text-content-secondary mt-4">
          Notre langue et Notre culture sont précieuses.{" "}
          <b>Aidez-nous à les préserver !</b>
        </p>
      </motion.div>
    </section>
  );
}
