import React, { useState, useEffect, useRef } from "react";
import styles from "./Clients.module.scss";

const statsData = [
  { icon: "🌱", target: 5020, label: "Nursery" },
  { icon: "🛠️", target: 2025, label: "Seedlings" },
  { icon: "🤝", target: 1500, label: "Happy Clients" },
  { icon: "📚", target: 15, label: "Trainings" },
];

const Clients = () => {
  const [counts, setCounts] = useState(statsData.map(() => 0)); // Initialize counts with 0
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef(null);

  const startCount = (index, target) => {
    let current = 0;
    const increment = Math.ceil(target / 100); // Adjust speed of counting

    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      setCounts((prevCounts) => {
        const newCounts = [...prevCounts];
        newCounts[index] = current;
        return newCounts;
      });
    }, 20); // Adjust timing for smooth animation
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          statsData.forEach((stat, index) => startCount(index, stat.target));
          setHasAnimated(true);
        }
      },
      { threshold: 0.5 } // Start animation when 50% of the section is visible
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <div className={styles.clientsSection} ref={containerRef}>
      <div className={styles.container}>
        {statsData.map((stat, index) => (
          <div key={index} className={styles.statCard}>
            <div className={styles.icon}>{stat.icon}</div>
            <div className={styles.count}>{counts[index]}</div>
            <div className={styles.label}>{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Clients;
