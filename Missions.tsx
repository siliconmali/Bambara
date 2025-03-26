import { FolderOpen, LanguagesIcon, UsersRound } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";

export default function Missions() {
  return (
    <section className="py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-center  mb-7"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Notre Mission
        </motion.h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <LanguagesIcon size={30} />,
              title: "Préservation Linguistique",
              description:
                "Protection et documentation des langues Bambara et N'ko pour les générations futures.",
              bgColor: "bg-light-default",
            },
            {
              icon: <UsersRound size={30} />,
              title: "Collaboration Communautaire",
              description:
                "Création d'une communauté active de traducteurs et de contributeurs.",
              bgColor: "bg-light-secondary",
            },
            {
              icon: <FolderOpen size={40} />,
              title: "Accessibilité Numérique",
              description:
                "Développement d'outils modernes pour faciliter l'accès aux ressources linguistiques.",
              bgColor: "bg-light-tertiary",
            },
          ].map((mission, index) => (
            <motion.div
              key={index}
              className={`text-center p-4 sm:p-6 ${mission.bgColor} rounded-lg shadow-lg`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{
                  backgroundColor:
                    index === 0
                      ? "#FDE68A"
                      : index === 1
                      ? "#A7F3D0"
                      : "#BFDBFE",
                }}
              >
                {mission.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                {mission.title}
              </h3>
              <p className="text-gray-600">{mission.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
