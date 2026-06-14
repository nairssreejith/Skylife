import { motion } from 'framer-motion';
import Button from '@/components/Button';

export default function Home() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="font-display text-5xl md:text-7xl leading-tight max-w-3xl"
      >
        Elevated living, designed for the few.
      </motion.h1>
      <p className="mt-6 max-w-xl text-bone/70">
        Skylife crafts bespoke experiences for those who value timeless detail
        and quiet luxury.
      </p>
      <div className="mt-10 flex gap-4">
        <Button>Discover</Button>
        <Button variant="ghost">Learn more</Button>
      </div>
    </section>
  );
}
