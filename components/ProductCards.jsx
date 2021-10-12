/** @format */

import React from "react";
import { useState } from "react";
import { AnimateSharedLayout, AnimatePresence, motion } from "framer-motion";
let items = [
  { id: 123, subtitle: "12312askd", title: "!@3123213" },
  { id: 123, subtitle: "12312askd", title: "!@3123213" },
  { id: 123, subtitle: "12312askd", title: "!@3123213" },
  { id: 123, subtitle: "12312askd", title: "!@3123213" },
];
let item = { id: 123, subtitle: "12312askd", title: "!@3123213" };

export const ProductCards = () => {
  const [selectedId, setSelectedId] = useState(null);
  return (
    <AnimateSharedLayout type="crossfade">
      {items.map((item) => (
        <motion.div layoutId={item.id} onClick={() => setSelectedId(item.id)}>
          <motion.h5>{item.subtitle}</motion.h5>
          <motion.h2>{item.title}</motion.h2>
        </motion.div>
      ))}

      <AnimatePresence>
        {selectedId && (
          <motion.div layoutId={selectedId}>
            <motion.h5>{item.subtitle}</motion.h5>
            <motion.h2>{item.title}</motion.h2>
            <motion.button onClick={() => setSelectedId(null)} />
          </motion.div>
        )}
      </AnimatePresence>
    </AnimateSharedLayout>
  );
};
