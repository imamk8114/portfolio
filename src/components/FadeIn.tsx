import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

const tags = { div: motion.div, p: motion.p, h1: motion.h1, h2: motion.h2, nav: motion.nav, li: motion.li, span: motion.span } as const;

type Props = {
  children: ReactNode; as?: keyof typeof tags; delay?: number; duration?: number; x?: number; y?: number; className?: string;
};

export default function FadeIn({ children, as = 'div', delay = 0, duration = 0.7, x = 0, y = 30, className }: Props) {
  const Tag = tags[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </Tag>
  );
}
