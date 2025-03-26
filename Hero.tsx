import { Button } from "antd";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

function Hero() {
  return (
    <section
      className="relative h-[380px] bg-cover mt-3"
      style={{
        backgroundImage: 'url("/djene.png")',
      }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            Rejoignez-nous pour préserver le riche héritage du Mali
          </h1>
          <p className="text-lg md:text-xl mb-4 md:mb-8">
            Contribuez au développement de modèles IA pour le Bambara et le
            N&apos;ko en fournissant des traductions de haute qualité
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Link href="/guide">
              <Button type="primary" size="large" icon={<BookOpen size={20} />}>
                Guide
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
