"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useWeddingPackages } from "@/src/apis/wedding";

export default function WeddingPackages() {
    const { data: packagesData } = useWeddingPackages();

    // 1️⃣ State: store packages for rotation
    const [packages, setPackages] = useState<any[]>([]);

    // Update state whenever packagesData changes
    useEffect(() => {
        if (packagesData) {
            setPackages(packagesData);
        }
    }, [packagesData]);

    // 2️⃣ Rotation Logic: Moves clicked package to center (index 1)
    const rotateToCenter = (clickedIndex: number) => {
        const newOrder = [...packages];
        if (clickedIndex === 0) {
            // Move first to middle: [1, 2, 3] -> [3, 1, 2]
            const poppedElement = newOrder.pop();
            if (poppedElement) newOrder.unshift(poppedElement);
        } else if (clickedIndex === 2) {
            // Move last to middle: [1, 2, 3] -> [2, 3, 1]
            const shiftedElement = newOrder.shift();
            if (shiftedElement) newOrder.push(shiftedElement);
        }
        setPackages(newOrder);
    };

    return (
        <section className='relative h-[600px] flex items-center justify-center overflow-hidden'>
            <div className='relative flex items-end justify-center w-full max-w-5xl px-4 gap-2 md:gap-8'>
                {packages?.map((pkg: any, index: number) => {
                    const isMiddle = index === 1;

                    return (
                        <motion.div
                            key={pkg.id}
                            layout
                            onClick={() => rotateToCenter(index)}
                            initial={false}
                            animate={{
                                scale: isMiddle ? 1.1 : 0.9,
                                zIndex: isMiddle ? 20 : 10,
                                opacity: isMiddle ? 1 : 0.8,
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 30,
                            }}
                            className={`
                                cursor-pointer transition-colors duration-500
                                ${isMiddle ? "bg-[#D9B9A8] shadow-2xl" : "bg-[#D9B9A8]/80 shadow-lg"}
                                p-8 w-64 md:w-72 rounded-sm text-center
                            `}
                        >
                            <h3
                                className={`uppercase tracking-widest mb-4 ${isMiddle ? "font-bold" : ""}`}
                            >
                                {pkg.name}
                            </h3>

                            <ul
                                className={`space-y-3 mb-8 transition-all ${isMiddle ? "text-sm" : "text-xs opacity-50"}`}
                            >
                                {pkg.items.map((item: any) => (
                                    <li key={item.id}>{item.name}</li>
                                ))}
                            </ul>

                            {pkg.price && (
                                <div className='border-t border-black/10 pt-4 font-bold'>
                                    {pkg.price}
                                </div>
                            )}
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
