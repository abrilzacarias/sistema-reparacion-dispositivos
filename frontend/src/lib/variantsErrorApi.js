export const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.3, ease: "easeIn" },
  },
}

export const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
}

// Variantes para el icono de alerta
export const alertIconVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 10,
      delay: 0.1,
    },
  },
  pulse: {
    scale: [1, 1.1, 1],
    borderColor: [
      "rgba(239, 68, 68, 0.7)",
      "rgba(239, 68, 68, 1)",
      "rgba(239, 68, 68, 0.7)",
    ],
    boxShadow: [
      "0 0 0 0 rgba(239, 68, 68, 0)",
      "0 0 0 10px rgba(239, 68, 68, 0.2)",
      "0 0 0 0 rgba(239, 68, 68, 0)",
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "loop",
    },
  },
}

// Variantes para el boton
export const buttonVariants = {
  hover: {
    scale: 1.05,
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
  },
  tap: {
    scale: 0.95,
  },
}

export const spinnerVariants = {
  hidden: { opacity: 0, rotate: 0 },
  visible: {
    opacity: 1,
    rotate: 360,
    transition: {
      duration: 1,
      ease: "linear",
      repeat: Infinity,
    },
  },
}
