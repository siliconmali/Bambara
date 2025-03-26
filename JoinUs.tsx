"use client";

import { Button } from "antd";
import { SendIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

function JoinUs() {
  const { data: session } = useSession();
  const user = session?.user;
  return (
    <section className="py-3 sm:py-3 bg-primary-secondary">
      {!user ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8">
            Rejoignez notre communauté
          </h2>
          <p className="text-lg sm:text-lg mb-3 sm:mb-5 max-w-2xl mx-auto">
            Participez à la préservation de notre patrimoine culturel en
            contribuant à la traduction et à la documentation des langues
            Bambara et N'ko.
          </p>
          <Link href={"/register"}>
            <Button type="primary" size="large" className="mb-5 sm:mb-5">
              S'inscrire gratuitement
            </Button>
          </Link>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8">
            Merci pour votre engagement
          </h2>
          <p className="text-lg sm:text-xl mb-3 sm:mb-3 max-w-2xl mx-auto">
            Grâce à votre précieuse contribution, la préservation et la
            transmission des langues Bambara et N'ko continuent de progresser.
            Votre aide est inestimable !
          </p>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Link href={"/upload"}>
              <Button
                type="primary"
                // style={{ backgroundColor: "#CE1126" }}
                size="large"
                className="mb-5 sm:mb-5"
                icon={<SendIcon />}
              >
                Continuer à contribuer
              </Button>
            </Link>
          </motion.div>
        </div>
      )}
    </section>
  );
}

export default JoinUs;
