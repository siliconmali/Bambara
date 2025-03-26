"use client";

import {
  UserPlus,
  ShieldCheck,
  BookOpen,
  FileUp,
  Languages,
  Send,
  CheckCircle,
} from "lucide-react";
import { motion } from "framer-motion"; 

export default function HowItWorks() {
  return (
    <div className="min-h-screen py-12  flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-light-default rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-8 text-center">
            Bienvenue cher(e) contribuable !
          </h1>

          <div className="grid md:grid-cols-2 gap-x-20">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <UserPlus size={28} className="text-yellow-500" /> Pour les
                contributeurs
              </h2>
              <ol className="space-y-10">
                {[
                  {
                    icon: <UserPlus size={22} className="text-yellow-500" />,
                    title: "Créez un compte",
                    description:
                      "Inscrivez-vous gratuitement sur notre plateforme pour commencer à contribuer à la traduction.",
                  },
                  {
                    icon: <ShieldCheck size={22} className="text-yellow-500" />,
                    title: "Attendez l'approbation",
                    description:
                      "Après votre inscription, un administrateur examinera votre demande pour vous donner accès aux fonctionnalités.",
                  },
                  {
                    icon: <BookOpen size={22} className="text-yellow-500" />,
                    title: "Lisez le guide",
                    description:
                      "Familiarisez-vous avec nos consignes et outils pour garantir des travaux de qualité.",
                  },
                  {
                    icon: <FileUp size={22} className="text-yellow-500" />,
                    title: "Envoyez des audios (avec ou sans traduction)",
                    description:
                      "Téléversez des fichiers audio en Bambara ou des textes ecites en N'Ko, même si vous n’avez pas de traduction.",
                  },
                ].map((step, index) => (
                  <motion.li
                    key={index}
                    className="flex gap-4"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        {step.icon} {step.title}
                      </h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </motion.li>
                ))}
              </ol>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2 }}
            >
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <Languages size={28} className="text-yellow-500" /> Pour les
                traducteurs
              </h2>
              <ol className="space-y-10">
                {[
                  {
                    icon: <Languages size={22} className="text-yellow-500" />,
                    title: "Choisissez un audio à traduire",
                    description:
                      "Parcourez les fichiers audio disponibles et sélectionnez celui que vous souhaitez traduire.",
                  },
                  {
                    icon: <Send size={22} className="text-yellow-500" />,
                    title: "Traduisez et envoyez votre travail",
                    description:
                      "Utilisez notre éditeur de traduction pour saisir la traduction et soumettez-la pour validation.",
                  },
                  {
                    icon: <CheckCircle size={22} className="text-yellow-500" />,
                    title: "Remerciements",
                    description:
                      "Merci pour votre contribution ! Votre travail aide à enrichir et préserver la langue. Chaque traduction validée améliore notre base de connaissances.",
                  },
                ].map((step, index) => (
                  <motion.li
                    key={index + 4}
                    className="flex gap-4"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: (index + 4) * 0.2 }}
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold">
                      {index + 5}
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        {step.icon} {step.title}
                      </h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </motion.li>
                ))}
              </ol>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
