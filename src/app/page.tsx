"use client";

import React, { useState, useEffect, useRef } from "react";

import {
  ShoppingBag,
  Wind,
  Zap,
  Battery,
  Flame,
  Globe,
  Instagram,
  Twitter,
  ChevronRight,
  TrendingUp,
  Cpu,
  Menu,
  X,
  ChevronDown,
  Star,
  Sparkles,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Clock,
  MessageCircle,
} from "lucide-react";
import dynamic from "next/dynamic";
import { ProductCard, Product } from "../components/ProductCard";
import { AgeVerification } from "../components/AgeVerification";
import { ProductDetailsView } from "../components/ProductDetailsView";
import { ShopView } from "../components/ShopView";
import { AboutView } from "../components/AboutView";
import { FAQsView } from "../components/FAQsView";
import { ContactView } from "../components/ContactView";
import { CheckoutModal } from "../components/CheckoutModal";
import { CartDrawer } from "../components/CartDrawer";
import { useCart } from "../context/CartContext";

const DEMO_PRODUCTS: Product[] = [
  // --- DEVICES ---
  {
    id: "device-carbon-black",
    name: "Carbon Black Premium Device",
    flavor: "Black Carbon Finish",
    price: 7500,
    color: "#2b2b2b",
    puffs: "Adjustable Power",
    battery: "900mAh Battery",
    capacity: "Type-C Charging",
    image: "/images/blackcarbanpod.png",
  },
  {
    id: "device-satin-blue",
    name: "Satin Blue Premium Device",
    flavor: "Metallic Satin Blue",
    price: 7800,
    color: "#0070f3",
    puffs: "Dual Airflow Control",
    battery: "900mAh Battery",
    capacity: "Type-C Charging",
    image: "/images/satinbluepod.png",
  },
  {
    id: "device-golden-brown",
    name: "Golden Brown Classic Device",
    flavor: "Luxury Golden Matte",
    price: 8200,
    color: "#d4af37",
    puffs: "Premium Handfeel",
    battery: "950mAh Battery",
    capacity: "LED Glow Indicator",
    image: "/images/golden brown pod.png",
  },
  {
    id: "device-stone-black",
    name: "Stone Black Tactical Device",
    flavor: "Tactical Charcoal Finish",
    price: 7500,
    color: "#1a1a1a",
    puffs: "High Durability",
    battery: "900mAh Battery",
    capacity: "Type-C Charging",
    image: "/images/stone black pod.png",
  },
  {
    id: "device-pink-velvet",
    name: "Velvet Pink Pastel Device",
    flavor: "Velvet Soft Pastel Pink",
    price: 7000,
    color: "#ec4899",
    puffs: "Sleek & Light",
    battery: "850mAh Battery",
    capacity: "LED Flow Indicator",
    image: "/images/pink pod.png",
  },
  {
    id: "device-cloud-white",
    name: "Cloud White Slim Device",
    flavor: "Chic Glossy White",
    price: 6800,
    color: "#e2e8f0",
    puffs: "Ultra-Lightweight",
    battery: "800mAh Battery",
    capacity: "Type-C Charging",
    image: "/images/cloudwhitepod.png",
  },
  {
    id: "device-beige-brown",
    name: "Beige Brown Elite Device",
    flavor: "Luxury Matte Beige Finish",
    price: 7500,
    color: "#c2b280",
    puffs: "Ergonomic Grip",
    battery: "900mAh Battery",
    capacity: "Type-C Charging",
    image: "/images/brownbaigepod.png",
  },

  // --- PODS ---
  {
    id: "pod-xlim",
    name: "Xlim Replacement Pods",
    flavor: "Top-Fill V3 Cartridge",
    price: 800,
    color: "#00f0ff",
    puffs: "Pack of 3 Pods",
    battery: "0.6Ω / 0.8Ω Resistance",
    capacity: "2.0ml Leakproof",
    image: "/images/xlimpod.png",
  },
  {
    id: "pod-ayan-universe",
    name: "Ayan Universe Premium Cartridge",
    flavor: "Dual Mesh Coil V2",
    price: 900,
    color: "#00f0ff",
    puffs: "Pack of 3 Pods",
    battery: "0.8Ω Resistance",
    capacity: "2.5ml High Density",
    image: "/images/pod.png",
  },

  // --- E-JUICES ---
  {
    id: "juice-honey-melon",
    name: "Tokyo Honey Melon Saltnic",
    flavor: "Sweet Honey Melon",
    price: 3200,
    color: "#eab308",
    puffs: "Premium Salt Nic",
    battery: "30mg / 50mg Nicotine",
    capacity: "30ml Bottle",
    image: "/images/Tokyo-Crazy-Fruits-Honey-Melon-Saltnic_720x.png",
  },
  {
    id: "juice-super-cool-passion",
    name: "Tokyo Super Cool Passion Fruit",
    flavor: "Super Cool Passion Fruit",
    price: 3200,
    color: "#ef4444",
    puffs: "Premium Salt Nic",
    battery: "50mg Nicotine",
    capacity: "30ml Bottle",
    image: "/images/Tokyo-Saltnic-Super-Cool-Passion-Fruit-30ml-50mg_720x.png",
  },
  {
    id: "juice-breezy-pineapple",
    name: "Tokyo Breezy Pineapple Fruit Ice",
    flavor: "Pineapple & Fruit Ice Blend",
    price: 3200,
    color: "#eab308",
    puffs: "Premium Salt Nic",
    battery: "35mg Nicotine",
    capacity: "30ml Bottle",
    image: "/images/TOKYO-SUPER-COOL-BREEZY-PINEAPPLE-FRUIT-ICE---SALTNIC-30ML-35MG-1PC_720x.png",
  },
  {
    id: "juice-energy-drink",
    name: "Tokyo Energy Drink Ice",
    flavor: "Sparkling Energy Drink Mint",
    price: 3200,
    color: "#ef4444",
    puffs: "Premium Salt Nic",
    battery: "35mg Nicotine",
    capacity: "30ml Bottle",
    image: "/images/TOKYOSUPERCOOLENERGYDRINKICESALTNIC30ML35MG_720x.png",
  },
  {
    id: "juice-guava-ice",
    name: "Tokyo Guava Ice Saltnic",
    flavor: "Exotic Guava Ice",
    price: 3200,
    color: "#10b981",
    puffs: "Premium Salt Nic",
    battery: "35mg Nicotine",
    capacity: "30ml Bottle",
    image: "/images/TOKYOSUPERCOOLGUAVAICESALTNIC30ML_720x.png",
  },
  {
    id: "juice-mango-lassi",
    name: "Tokyo Mango Lassi Ice",
    flavor: "Creamy Mango Lassi Mint",
    price: 3200,
    color: "#f59e0b",
    puffs: "Premium Salt Nic",
    battery: "35mg Nicotine",
    capacity: "30ml Bottle",
    image: "/images/TOKYOSUPERCOOLMANGOLASSIICESALTNIC30ML_720x.png",
  },
  {
    id: "juice-passion-fruit-ice",
    name: "Tokyo Passion Fruit Ice",
    flavor: "Chilled Passion Fruit",
    price: 3200,
    color: "#8b5cf6",
    puffs: "Premium Salt Nic",
    battery: "35mg Nicotine",
    capacity: "30ml Bottle",
    image: "/images/TOKYOSUPERCOOLPASSIONFRUIT_720x.png",
  },
  {
    id: "juice-pineapple-ice",
    name: "Tokyo Pineapple Ice Saltnic",
    flavor: "Sweet Golden Pineapple Ice",
    price: 3200,
    color: "#eab308",
    puffs: "Premium Salt Nic",
    battery: "35mg Nicotine",
    capacity: "30ml Bottle",
    image: "/images/TOKYOSUPERCOOLPINEAPPLEICESALTNIC30ML_720x.png",
  },
  {
    id: "juice-pineapple-lychee",
    name: "Tokyo Pineapple Lychee Ice",
    flavor: "Sweet Pineapple & Lychee",
    price: 3200,
    color: "#f43f5e",
    puffs: "Premium Salt Nic",
    battery: "35mg Nicotine",
    capacity: "30ml Bottle",
    image: "/images/TOKYOSUPERCOOLPINEAPPLELYCHEEICESALTNIC30ML_f19ae72b-dabb-453b-9d63-a139adda3616_720x.png",
  },
  {
    id: "juice-pineapple-passion",
    name: "Tokyo Pineapple Passion Fruit Ice",
    flavor: "Pineapple & Passion Fruit",
    price: 3200,
    color: "#d946ef",
    puffs: "Premium Salt Nic",
    battery: "35mg Nicotine",
    capacity: "30ml Bottle",
    image: "/images/TOKYOSUPERCOOLPINEAPPLEPASSIONFRIUTICESALTNIC30ML_720x.png",
  },
  {
    id: "juice-pink-pineapple",
    name: "Tokyo Pink Pineapple Ice",
    flavor: "Sweet Pink Pineapple Blend",
    price: 3200,
    color: "#ec4899",
    puffs: "Premium Salt Nic",
    battery: "35mg Nicotine",
    capacity: "30ml Bottle",
    image: "/images/TOKYOSUPERCOOLPINKPINEAPPLEICESALTNIC30ML_720x.png",
  },
  {
    id: "juice-pomegranate-ice",
    name: "Tokyo Pomegranate Ice",
    flavor: "Chilled Sweet Pomegranate",
    price: 3500,
    color: "#e11d48",
    puffs: "Premium Salt Nic",
    battery: "50mg Nicotine",
    capacity: "30ml Bottle",
    image: "/images/TOKYOSUPERCOOLPOMEGRANATEICESALTNIC30ML50MG_720x.png",
  },
  {
    id: "juice-watermelon-bubblegum-ice",
    name: "Tokyo Watermelon Bubblegum Ice",
    flavor: "Watermelon Bubblegum Mint",
    price: 3200,
    color: "#ff2a5f",
    puffs: "Premium Salt Nic",
    battery: "35mg Nicotine",
    capacity: "30ml Bottle",
    image: "/images/TOKYOSUPERCOOLWATERMELONBUBBLEGUMICESALTNIC30ML_5f387712-908c-484b-a906-0ce6a00b7001_720x.png",
  },
  // --- COILS ---
  {
    id: "coil-xlim",
    name: "OXVA Xlim Mesh Coils",
    flavor: "0.6Ω / 0.8Ω Resistance",
    price: 1800,
    color: "#fbbf24",
    puffs: "Pack of 3 Coils",
    battery: "Integrated Pods",
    capacity: "Compatible with Xlim Series",
    image: "/images/OXVA-XLIM-Coil.webp",
  },
  {
    id: "coil-oneo",
    name: "OXVA ONEO Mesh Pods",
    flavor: "0.4Ω / 0.6Ω / 0.8Ω Cartridges",
    price: 2100,
    color: "#ec4899",
    puffs: "Pack of 3 Pods",
    battery: "ONEO Refillable Pods",
    capacity: "Compatible with ONEO Pod",
    image: "/images/OXVA-ONEO-Coil.webp",
  },
  {
    id: "coil-nexlim",
    name: "OXVA NeXLIM Pod Coils",
    flavor: "0.8Ω Integrated Core",
    price: 1950,
    color: "#10b981",
    puffs: "Pack of 3 Coils",
    battery: "NeXLIM Replacement Pods",
    capacity: "Compatible with NeXLIM Series",
    image: "/images/OXVA-NeXLIM-Pod-Coil.webp",
  },
  {
    id: "coil-luxe-xr",
    name: "Vaporesso Luxe XR Mesh Coils",
    flavor: "0.4Ω / 0.6Ω / 0.8Ω GTX Coils",
    price: 2400,
    color: "#3b82f6",
    puffs: "Pack of 5 Coils",
    battery: "GTX Platform Heating Core",
    capacity: "Luxe XR Series Compatible",
    image: "/images/Vaporesso-Luxe-XR-coil.webp",
  },
];

const HeroImage: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((centerY - y) / centerY) * 15;
    const rotateY = ((x - centerX) / centerX) * -15;

    el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04, 1.04, 1.04)`;
    el.style.transition = "transform 0.1s ease-out";
  };

  const handleMouseLeave = () => {
    const el = containerRef.current;
    if (!el) return;
    el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    el.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="hero-twin-pods-container"
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        cursor: "pointer",
        transformStyle: "preserve-3d",
        transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)"
      }}
    >
      <div className="hero-twin-pods-card">
        <img
          src="/images/hero-twin-pods.png"
          alt="Ayan Universe Twin Cyber Vape Devices"
          className="hero-twin-pods-img"
        />
      </div>
    </div>
  );
};

const CosmicGalaxyBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // 1. Multi-Layered Cosmic Space Starfield & Milky Way Galaxy Band (380+ particles)
    interface StarParticle {
      x: number;
      y: number;
      size: number;
      baseSize: number;
      speedX: number;
      speedY: number;
      opacity: number;
      twinkleSpeed: number;
      twinkleOffset: number;
      color: string;
      glowColor: string;
      layer: "distant" | "milky_way" | "cosmic_dust";
    }

    const milkyWayColors = [
      "#ffffff", "#fdf4ff", "#fae8ff", "#f5d0fe",
      "#f472b6", "#ec4899", "#d946ef", "#c084fc",
      "#a855f7", "#818cf8", "#60a5fa", "#38bdf8"
    ];

    const dustColors = [
      "rgba(244, 114, 182, 0.7)",
      "rgba(217, 70, 239, 0.75)",
      "rgba(168, 85, 247, 0.8)",
      "rgba(96, 165, 250, 0.65)",
      "rgba(255, 255, 255, 0.9)"
    ];

    const particles: StarParticle[] = [];

    // Distant background twinkling stars (140 stars)
    for (let i = 0; i < 140; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.6 + 0.4,
        baseSize: Math.random() * 1.6 + 0.4,
        speedX: (Math.random() - 0.5) * 0.12,
        speedY: (Math.random() - 0.5) * 0.12,
        opacity: Math.random() * 0.75 + 0.25,
        twinkleSpeed: Math.random() * 0.035 + 0.01,
        twinkleOffset: Math.random() * Math.PI * 2,
        color: "#ffffff",
        glowColor: "#c084fc",
        layer: "distant"
      });
    }

    // Dense Horizontal Milky Way Galaxy Swirl (210 particles)
    for (let i = 0; i < 210; i++) {
      const spreadY = (Math.random() - 0.5) * (Math.random() - 0.5) * height * 0.65;
      const centerY = height * 0.48 + spreadY;
      const color = milkyWayColors[Math.floor(Math.random() * milkyWayColors.length)];

      particles.push({
        x: Math.random() * width,
        y: centerY,
        size: Math.random() * 2.8 + 0.7,
        baseSize: Math.random() * 2.8 + 0.7,
        speedX: (Math.random() * 0.35 + 0.08) * (Math.random() > 0.5 ? 1 : -1),
        speedY: (Math.random() - 0.5) * 0.1,
        opacity: Math.random() * 0.9 + 0.2,
        twinkleSpeed: Math.random() * 0.045 + 0.015,
        twinkleOffset: Math.random() * Math.PI * 2,
        color: color,
        glowColor: color,
        layer: "milky_way"
      });
    }

    // Floating glowing cosmic dust motes & light orbs (30 particles)
    for (let i = 0; i < 30; i++) {
      const color = dustColors[Math.floor(Math.random() * dustColors.length)];
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 7 + 3.5,
        baseSize: Math.random() * 7 + 3.5,
        speedX: (Math.random() - 0.5) * 0.22,
        speedY: (Math.random() - 0.5) * 0.18,
        opacity: Math.random() * 0.55 + 0.25,
        twinkleSpeed: Math.random() * 0.02 + 0.008,
        twinkleOffset: Math.random() * Math.PI * 2,
        color: color,
        glowColor: color,
        layer: "cosmic_dust"
      });
    }

    // Shooting Stars system (Comets)
    interface ShootingStar {
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      opacity: number;
      active: boolean;
    }

    const shootingStars: ShootingStar[] = [
      { x: 0, y: 0, length: 0, speed: 0, angle: 0, opacity: 0, active: false }
    ];

    const launchShootingStar = () => {
      shootingStars[0] = {
        x: Math.random() * width * 0.8,
        y: Math.random() * height * 0.45,
        length: Math.random() * 90 + 50,
        speed: Math.random() * 14 + 10,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2,
        opacity: 1,
        active: true
      };
    };

    const shootingStarTimer = setInterval(() => {
      if (Math.random() > 0.35) {
        launchShootingStar();
      }
    }, 3800);

    let time = 0;
    const render = () => {
      time += 0.02;
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const flarePulse = Math.sin(time * 1.5) * 0.15 + 0.85;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw Supernova Horizontal Light Flare in the Center
      const centerX = width * 0.5 + (mouseX - width / 2) * 0.03;
      const centerY = height * 0.48 + (mouseY - height / 2) * 0.03;

      // Outer wide horizontal disk light
      const rayGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, width * 0.48);
      rayGradient.addColorStop(0, "rgba(255, 255, 255, 0.45)");
      rayGradient.addColorStop(0.12, "rgba(244, 114, 182, 0.35)");
      rayGradient.addColorStop(0.35, "rgba(168, 85, 247, 0.22)");
      rayGradient.addColorStop(0.65, "rgba(59, 130, 246, 0.08)");
      rayGradient.addColorStop(1, "transparent");

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.scale(2.6, 0.42);
      ctx.beginPath();
      ctx.arc(0, 0, width * 0.22 * flarePulse, 0, Math.PI * 2);
      ctx.fillStyle = rayGradient;
      ctx.fill();
      ctx.restore();

      // Soft Glowing Center Starburst Core
      const coreGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 60 * flarePulse);
      coreGradient.addColorStop(0, "rgba(255, 255, 255, 0.45)");
      coreGradient.addColorStop(0.3, "rgba(244, 114, 182, 0.28)");
      coreGradient.addColorStop(0.6, "rgba(168, 85, 247, 0.15)");
      coreGradient.addColorStop(1, "transparent");

      ctx.beginPath();
      ctx.arc(centerX, centerY, 60 * flarePulse, 0, Math.PI * 2);
      ctx.fillStyle = coreGradient;
      ctx.shadowBlur = 25;
      ctx.shadowColor = "#d946ef";
      ctx.fill();

      // Horizontal Lens Flare Beam
      const beamGradient = ctx.createLinearGradient(centerX - 240 * flarePulse, centerY, centerX + 240 * flarePulse, centerY);
      beamGradient.addColorStop(0, "transparent");
      beamGradient.addColorStop(0.5, "rgba(255, 255, 255, 0.45)");
      beamGradient.addColorStop(1, "transparent");

      ctx.beginPath();
      ctx.ellipse(centerX, centerY, 240 * flarePulse, 2, 0, 0, Math.PI * 2);
      ctx.fillStyle = beamGradient;
      ctx.shadowBlur = 15;
      ctx.shadowColor = "#c084fc";
      ctx.fill();

      // 2. Draw Stars & Galaxy Particles with Subtle Mouse Gravity
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        // Subtle interactive mouse reaction
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180 && dist > 0) {
          const force = (180 - dist) / 180;
          p.x -= (dx / dist) * force * 0.6;
          p.y -= (dy / dist) * force * 0.6;
        }

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const currentOpacity = (Math.sin(time * 2 + p.twinkleOffset) * 0.35 + 0.65) * p.opacity;

        ctx.save();
        ctx.beginPath();

        if (p.layer === "cosmic_dust") {
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = currentOpacity * 0.65;
          ctx.shadowBlur = p.size * 3.5;
          ctx.shadowColor = p.glowColor;
        } else if (p.layer === "milky_way") {
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = currentOpacity;
          ctx.shadowBlur = p.size * 4;
          ctx.shadowColor = p.glowColor;
        } else {
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = currentOpacity * 0.85;
          ctx.shadowBlur = p.size * 2;
          ctx.shadowColor = p.glowColor;
        }

        ctx.fill();
        ctx.restore();
      });

      // 3. Draw Shooting Stars
      shootingStars.forEach((star) => {
        if (!star.active) return;

        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;
        star.opacity -= 0.015;

        if (star.opacity <= 0 || star.x > width || star.y > height) {
          star.active = false;
          return;
        }

        const tailX = star.x - Math.cos(star.angle) * star.length;
        const tailY = star.y - Math.sin(star.angle) * star.length;

        const grad = ctx.createLinearGradient(tailX, tailY, star.x, star.y);
        grad.addColorStop(0, "transparent");
        grad.addColorStop(1, `rgba(255, 255, 255, ${star.opacity})`);

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(star.x, star.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2.2;
        ctx.shadowBlur = 14;
        ctx.shadowColor = "#e879f9";
        ctx.stroke();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(shootingStarTimer);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="parallax-bg-wrapper">
      {/* Fullscreen High-Definition Cosmic Space Background Image */}
      <div className="cosmic-galaxy-layer" />
      {/* Real-time Dynamic Glowing Space Canvas */}
      <canvas ref={canvasRef} className="cosmic-stars-canvas" />
      {/* Subtle Grid Overlay */}
      <div className="grid-bg-overlay" />
    </div>
  );
};

function AyanUniverseStore() {
  const { setIsCartOpen, cartCount } = useCart();
  const [activeColor, setActiveColor] = useState<string>("#a855f7"); // Default Luxury Purple
  const [selectedCategory, setSelectedCategory] = useState<"all" | "juice" | "pod" | "device" | "coil" | "accessory">("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [checkoutProduct, setCheckoutProduct] = useState<Product | null>(null);
  const [currentView, setCurrentView] = useState<"home" | "shop" | "about" | "faqs" | "contact">("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [globalSearchQuery, setGlobalSearchQuery] = useState("");
  const [searchDropdownOpen, setSearchDropdownOpen] = useState(false);
  // Live countdown timer for Top Luxury Flash Sale Banner
  const [timeLeft, setTimeLeft] = useState("04:28:15");
  useEffect(() => {
    let seconds = 4 * 3600 + 28 * 60 + 15;
    const timer = setInterval(() => {
      seconds = seconds > 0 ? seconds - 1 : 4 * 3600;
      const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
      const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
      const s = String(seconds % 60).padStart(2, "0");
      setTimeLeft(`${h}:${m}:${s}`);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const categoryLabels: Record<"all" | "juice" | "pod" | "device" | "coil" | "accessory", string> = {
    all: "All",
    juice: "E-Juices",
    pod: "Pods",
    device: "Devices",
    coil: "Coils",
    accessory: "Accessories"
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.05 }
    );

    const elements = document.querySelectorAll(".reveal-on-scroll, .reveal-left, .reveal-right, .reveal-zoom");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [currentView]);

  // Scroll Parallax Tracking
  useEffect(() => {
    const handleScroll = () => {
      document.documentElement.style.setProperty("--scroll-y", `${window.scrollY}`);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Global Click Particles System
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const burst = document.createElement("div");
      burst.className = "click-burst";
      burst.style.left = `${e.clientX}px`;
      burst.style.top = `${e.clientY}px`;
      burst.style.setProperty("--burst-color", activeColor);
      document.body.appendChild(burst);

      for (let i = 0; i < 12; i++) {
        const p = document.createElement("div");
        p.className = "click-particle";
        const angle = (i / 12) * Math.PI * 2;
        const distance = 35 + Math.random() * 55;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        const size = 5 + Math.random() * 7;

        p.style.width = `${size}px`;
        p.style.height = `${size}px`;
        p.style.setProperty("--tx", `${tx}px`);
        p.style.setProperty("--ty", `${ty}px`);

        const rot = Math.random() * 360;
        p.style.setProperty("--rot", `${rot}deg`);

        burst.appendChild(p);
      }

      setTimeout(() => {
        burst.remove();
      }, 900);
    };

    window.addEventListener("click", handleGlobalClick, { passive: true });
    return () => window.removeEventListener("click", handleGlobalClick);
  }, [activeColor]);

  const scrollToShop = () => {
    const shopSection = document.getElementById("shop-section");
    if (shopSection) {
      shopSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="app-container">
      {/* Dynamic Animated Cosmic Universe Galaxy Background */}
      <CosmicGalaxyBackground />

      {/* Top Luxury Announcement Bar */}
      <div className="top-announcement-bar">
        <div className="announcement-badge">
          <Sparkles size={12} />
          <span>Special Offer</span>
        </div>
        <div className="announcement-text hide-for-medium">
          <span>🔥 FREE Express Delivery Across Karachi on Orders Above <strong>Rs. 3,500</strong> | 100% Genuine Sealed Products</span>
          <span className="countdown-pill" style={{ background: "rgba(0,0,0,0.25)", padding: "2px 8px", borderRadius: "12px", fontSize: "11px", display: "inline-flex", alignItems: "center", gap: "4px" }}>
            <Clock size={11} />
            <span>Ends in {timeLeft}</span>
          </span>
          <span 
            className="announcement-link" 
            onClick={() => {
              setCurrentView("shop");
              setSelectedCategory("all");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Shop Deals &rarr;
          </span>
        </div>
        <div className="announcement-text show-for-medium-flex" style={{ fontSize: "11px" }}>
          <span>🔥 FREE Express Delivery in Karachi (Rs. 3,500+) • {timeLeft}</span>
        </div>
      </div>

      {/* Navigation Header */}
      <header className="navbar" style={{ padding: "0", display: "flex", flexDirection: "column" }}>
        {/* Row 1: Logo, Search Bar, Cart/Actions */}
        <div className="max-width-container navbar-top-row" style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "80px",
          width: "100%",
          gap: "24px"
        }}>
          {/* Logo */}
          <div className="logo" style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0, cursor: "pointer" }} onClick={() => { setCurrentView("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
            <img
              src="/images/logo.jpeg"
              alt="Ayan Universe Logo"
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid #a855f7",
                boxShadow: "0 0 16px rgba(168, 85, 247, 0.5)",
                display: "block"
              }}
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span className="logo-text-gradient" style={{ fontSize: "16px", fontWeight: "900", letterSpacing: "1px", lineHeight: "1.1" }}>
                AYAN UNIVERSE
              </span>
              <span style={{ fontSize: "9px", color: "#a855f7", letterSpacing: "2.5px", fontWeight: "800" }}>
                VAPOURS
              </span>
            </div>
          </div>

          {/* Header Search Bar (VapeStation style with Purple Dark Glass) */}
          <div className="header-search-bar hide-for-medium" style={{
            display: "flex",
            alignItems: "center",
            background: "rgba(18, 12, 32, 0.75)",
            border: "1px solid var(--border-glass)",
            borderRadius: "14px",
            padding: "8px 16px",
            maxWidth: "480px",
            flex: 1,
            boxShadow: "0 4px 20px rgba(0,0,0,0.3)"
          }}>
            {/* Custom Search Category Dropdown */}
            <div className="search-category-dropdown-wrapper" style={{ position: "relative" }}>
              <button
                onClick={() => setSearchDropdownOpen(!searchDropdownOpen)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--foreground)",
                  fontSize: "12px",
                  fontWeight: "700",
                  cursor: "pointer",
                  outline: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  padding: "4px 8px",
                  marginRight: "4px"
                }}
              >
                <span>{categoryLabels[selectedCategory]}</span>
                <ChevronDown size={12} style={{ transform: searchDropdownOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
              </button>
              
              {searchDropdownOpen && (
                <>
                  <div 
                    onClick={() => setSearchDropdownOpen(false)} 
                    style={{
                      position: "fixed",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      zIndex: 998
                    }} 
                  />
                  <div 
                    className="search-category-dropdown animate-slide-down" 
                    style={{
                      position: "absolute",
                      top: "calc(100% + 12px)",
                      left: 0,
                      background: "rgba(18, 12, 32, 0.95)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid var(--border-glass)",
                      borderRadius: "12px",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                      zIndex: 999,
                      minWidth: "140px",
                      padding: "6px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "2px"
                    }}
                  >
                    {Object.entries(categoryLabels).map(([key, label]) => (
                      <button
                        key={key}
                        onClick={() => {
                          setSelectedCategory(key as any);
                          setCurrentView("shop");
                          setSearchDropdownOpen(false);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        style={{
                          background: selectedCategory === key ? "rgba(168, 85, 247, 0.2)" : "transparent",
                          border: "none",
                          color: selectedCategory === key ? "#c084fc" : "var(--foreground-muted)",
                          fontSize: "12px",
                          fontWeight: selectedCategory === key ? "700" : "500",
                          padding: "8px 12px",
                          borderRadius: "8px",
                          textAlign: "left",
                          cursor: "pointer",
                          width: "100%",
                          transition: "all 0.2s"
                        }}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
            <div style={{ width: "1px", height: "18px", background: "var(--border-glass)", marginRight: "12px" }} />
            <input
              type="text"
              placeholder="Search e-liquids, pods, coils..."
              onChange={(e) => {
                setGlobalSearchQuery(e.target.value);
                if (currentView !== "shop") {
                  setCurrentView("shop");
                }
              }}
              value={globalSearchQuery}
              style={{
                background: "transparent",
                border: "none",
                color: "var(--foreground)",
                fontSize: "13px",
                outline: "none",
                width: "100%"
              }}
            />
          </div>

          {/* Actions */}
          <div className="nav-actions hide-for-medium" style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
            <button 
              onClick={() => setIsCartOpen(true)} 
              className="cart-toggle-btn"
              aria-label="Toggle Shopping Cart"
              style={{
                position: "relative",
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                border: "1px solid var(--border-glass)",
                background: "rgba(18, 12, 32, 0.75)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                transition: "all 0.3s ease",
                color: "var(--foreground)",
                boxShadow: "0 0 15px rgba(168, 85, 247, 0.15)"
              }}
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="cart-count-badge" style={{
                  position: "absolute",
                  top: "-4px",
                  right: "-4px",
                  background: activeColor,
                  color: "#fff",
                  fontSize: "10px",
                  fontWeight: "700",
                  borderRadius: "50%",
                  width: "18px",
                  height: "18px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: `0 2px 10px ${activeColor}40`
                }}>
                  {cartCount}
                </span>
              )}
            </button>
            <button onClick={() => { setCurrentView("shop"); setSelectedCategory("all"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="btn btn-secondary btn-glow btn-shop-now" style={{ padding: "10px 22px", fontSize: "13px", fontWeight: "700", background: "linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(59, 130, 246, 0.2))", borderColor: "rgba(168, 85, 247, 0.4)" }}>
              Shop Now
            </button>
          </div>

          {/* Mobile Cart & hamburger menu toggle button */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }} className="show-for-medium-flex">
            <button 
              onClick={() => setIsCartOpen(true)} 
              aria-label="Toggle Shopping Cart"
              style={{
                position: "relative",
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                border: "1px solid var(--border-glass)",
                background: "rgba(18, 12, 32, 0.75)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                transition: "all 0.3s ease",
                color: "var(--foreground)"
              }}
            >
              <ShoppingBag size={16} />
              {cartCount > 0 && (
                <span className="cart-count-badge" style={{
                  position: "absolute",
                  top: "-4px",
                  right: "-4px",
                  background: activeColor,
                  color: "#fff",
                  fontSize: "9px",
                  fontWeight: "700",
                  borderRadius: "50%",
                  width: "16px",
                  height: "16px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: `0 2px 10px ${activeColor}40`
                }}>
                  {cartCount}
                </span>
              )}
            </button>
            <div className="mobile-toggle-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </div>
          </div>
        </div>

        {/* Row 2: Sub-Navigation Bar (Desktop only) */}
        <div className="navbar-bottom-row hide-for-medium" style={{
          width: "100%",
          borderTop: "1px solid var(--border-glass)",
          height: "46px",
          display: "flex",
          alignItems: "center"
        }}>
          <div className="max-width-container" style={{ width: "100%", display: "flex", alignItems: "center" }}>
            <nav className="nav-links" style={{ gap: "28px", height: "100%" }}>
              <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView("home"); setSelectedCategory("all"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className={`nav-link ${currentView === "home" ? "active" : ""}`} style={{ padding: "12px 0" }}>
                Home
              </a>
              
              {/* Hover Shop Dropdown menu */}
              <div className="nav-dropdown-wrapper" style={{ padding: "12px 0" }}>
                <a 
                  href="#" 
                  onClick={(e) => { 
                    e.preventDefault(); 
                    setCurrentView("shop"); 
                    setSelectedCategory("all"); 
                    window.scrollTo({ top: 0, behavior: "smooth" }); 
                  }} 
                  className={`nav-link ${currentView === "shop" ? "active" : ""}`}
                  style={{ display: "flex", alignItems: "center", gap: "4px" }}
                >
                  <span>Shop Catalog</span>
                  <ChevronDown size={12} className="dropdown-arrow-icon" />
                </a>
                <div className="nav-dropdown-menu" style={{ marginTop: "12px" }}>
                  <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView("shop"); setSelectedCategory("juice"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="dropdown-item">
                    E-Juices
                  </a>
                  <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView("shop"); setSelectedCategory("pod"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="dropdown-item">
                    Pods
                  </a>
                  <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView("shop"); setSelectedCategory("device"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="dropdown-item">
                    Vape Devices
                  </a>
                  <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView("shop"); setSelectedCategory("coil"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="dropdown-item">
                    Coils
                  </a>
                </div>
              </div>

              <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView("about"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className={`nav-link ${currentView === "about" ? "active" : ""}`} style={{ padding: "12px 0" }}>
                About Us
              </a>
              <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView("faqs"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className={`nav-link ${currentView === "faqs" ? "active" : ""}`} style={{ padding: "12px 0" }}>
                FAQs & Guide
              </a>
              <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView("contact"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className={`nav-link ${currentView === "contact" ? "active" : ""}`} style={{ padding: "12px 0" }}>
                Contact
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Nav Overlay Menu */}
      {mobileMenuOpen && (
        <div className="mobile-nav-overlay animate-fade-in" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-nav-menu animate-slide-down" onClick={(e) => e.stopPropagation()}>
            <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView("home"); setSelectedCategory("all"); setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }} className={`mobile-nav-item ${currentView === "home" ? "active" : ""}`}>
              Home
            </a>
            
            <div className="mobile-nav-section-title">Shop Categories</div>
            <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView("shop"); setSelectedCategory("juice"); setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }} className={`mobile-nav-item sub-item ${currentView === "shop" && selectedCategory === "juice" ? "active" : ""}`}>
              E-Juices
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView("shop"); setSelectedCategory("pod"); setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }} className={`mobile-nav-item sub-item ${currentView === "shop" && selectedCategory === "pod" ? "active" : ""}`}>
              Pods
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView("shop"); setSelectedCategory("device"); setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }} className={`mobile-nav-item sub-item ${currentView === "shop" && selectedCategory === "device" ? "active" : ""}`}>
              Vape Devices
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView("shop"); setSelectedCategory("coil"); setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }} className={`mobile-nav-item sub-item ${currentView === "shop" && selectedCategory === "coil" ? "active" : ""}`}>
              Coils
            </a>
            
            <div className="mobile-nav-divider" />
            
            <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView("about"); setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }} className={`mobile-nav-item ${currentView === "about" ? "active" : ""}`}>
              About
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView("faqs"); setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }} className={`mobile-nav-item ${currentView === "faqs" ? "active" : ""}`}>
              FAQs & Guide
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView("contact"); setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }} className={`mobile-nav-item ${currentView === "contact" ? "active" : ""}`}>
              Contact
            </a>
          </div>
        </div>
      )}

      <main className="main-content">
        {currentView === "home" && (
          <>
            {/* Hero Section */}
            <section id="hero-section" className="max-width-container hero-section" style={{ position: "relative", paddingTop: "40px" }}>
              <div className="hero-info reveal-left">
                <div className="hero-tag" style={{ border: "1px solid rgba(168, 85, 247, 0.4)", background: "rgba(168, 85, 247, 0.12)", color: "#c084fc" }}>
                  <span className="hero-tag-glow" style={{ backgroundColor: "#a855f7" }} />
                  <Sparkles size={13} style={{ color: "#c084fc" }} />
                  <span style={{ letterSpacing: "1.5px", fontWeight: "800" }}>A NEW EXPERIENCE. A WHOLE NEW UNIVERSE.</span>
                </div>
                
                <h1 className="hero-title" style={{ fontSize: "clamp(38px, 5.2vw, 64px)", lineHeight: "1.12", fontWeight: "900", margin: "14px 0 16px 0", letterSpacing: "-0.5px" }}>
                  <span className="purple-gradient-text title-block">AYAN UNIVERSE</span>
                  <span className="purple-blue-text title-block">VAPOURS</span>
                </h1>
                
                <p className="hero-desc" style={{ color: "#d4d4d8", fontSize: "16px", maxWidth: "520px", lineHeight: "1.6" }}>
                  Premium vapes, pods &amp; e-liquids crafted for performance, flavour &amp; satisfaction.
                </p>
                
                <div className="hero-cta" style={{ display: "flex", gap: "14px", marginTop: "28px", flexWrap: "wrap" }}>
                  <button 
                    onClick={() => { setCurrentView("shop"); setSelectedCategory("all"); window.scrollTo({ top: 0, behavior: "smooth" }); }} 
                    className="btn btn-primary btn-glow"
                    style={{
                      background: "linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)",
                      color: "#fff",
                      border: "none",
                      padding: "14px 30px",
                      borderRadius: "30px",
                      fontWeight: "800",
                      fontSize: "14px",
                      letterSpacing: "1px",
                      boxShadow: "0 0 30px rgba(168, 85, 247, 0.5)",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px"
                    }}
                  >
                    <span>EXPLORE NOW</span>
                    <ChevronRight size={18} />
                  </button>
                  <button
                    onClick={() => {
                      const specSec = document.getElementById("specs-section");
                      specSec?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="btn btn-secondary"
                    style={{
                      borderRadius: "30px",
                      padding: "14px 26px",
                      fontWeight: "700",
                      fontSize: "14px",
                      background: "rgba(18, 12, 32, 0.75)",
                      border: "1px solid rgba(168, 85, 247, 0.35)",
                      color: "#ffffff"
                    }}
                  >
                    Learn Technology
                  </button>
                </div>
              </div>

              {/* Interactive 3D floating Hero Pod Image (Clean & Crisp) */}
              <div className="reveal-right reveal-delay-2" style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
                <HeroImage />
              </div>
            </section>

            {/* 4 Core Pillars Grid (Matching Official Reference Poster) */}
            <section className="max-width-container pillars-section reveal-on-scroll">
              <div className="pillars-grid">
                <div className="pillar-card">
                  <div className="pillar-icon-circle">
                    <Globe size={26} />
                  </div>
                  <h3 className="pillar-title">WIDE RANGE</h3>
                  <p style={{ fontSize: "12px", color: "var(--foreground-muted)", marginTop: "6px" }}>Authentic Devices &amp; E-Liquids</p>
                </div>

                <div className="pillar-card">
                  <div className="pillar-icon-circle">
                    <ShieldCheck size={26} />
                  </div>
                  <h3 className="pillar-title">BEST QUALITY</h3>
                  <p style={{ fontSize: "12px", color: "var(--foreground-muted)", marginTop: "6px" }}>100% Sealed Genuine Stock</p>
                </div>

                <div className="pillar-card">
                  <div className="pillar-icon-circle">
                    <TrendingUp size={26} />
                  </div>
                  <h3 className="pillar-title">BEST PRICES</h3>
                  <p style={{ fontSize: "12px", color: "var(--foreground-muted)", marginTop: "6px" }}>Direct Wholesale Deals</p>
                </div>

                <div className="pillar-card">
                  <div className="pillar-icon-circle">
                    <Sparkles size={26} />
                  </div>
                  <h3 className="pillar-title">MADE FOR YOU</h3>
                  <p style={{ fontSize: "12px", color: "var(--foreground-muted)", marginTop: "6px" }}>Next-Gen Vapour Tech</p>
                </div>
              </div>

              {/* Official Promo Banner Box matching reference poster */}
              <div className="official-promo-box">
                <div className="promo-item">
                  <div className="promo-icon-wrap">
                    <ShoppingBag size={22} />
                  </div>
                  <div className="promo-info">
                    <span>SHOP NOW</span>
                    <strong>@ayanuniversevapours</strong>
                  </div>
                </div>

                <div style={{ width: "1px", height: "35px", background: "rgba(168, 85, 247, 0.3)" }} className="hide-for-medium" />

                <div className="promo-item">
                  <div className="promo-icon-wrap" style={{ borderColor: "rgba(59, 130, 246, 0.5)", background: "rgba(59, 130, 246, 0.15)", color: "#60a5fa" }}>
                    <Globe size={22} />
                  </div>
                  <div className="promo-info">
                    <span>OFFICIAL STORE</span>
                    <strong style={{ color: "#a855f7" }}>A WHOLE NEW UNIVERSE</strong>
                  </div>
                </div>
              </div>
            </section>

            {/* Specs Section */}
            <section id="specs-section" className="max-width-container features-section">
              <div className="specs-bg-image" />
              <div className="section-header reveal-on-scroll">
                <span className="section-subtitle">Engineering Quality</span>
                <h2 className="section-title">Built To Perform</h2>
              </div>

              <div className="features-grid">
                <div className="feature-card reveal-on-scroll reveal-delay-1" style={{ '--accent-color': activeColor } as React.CSSProperties}>
                  <div className="feature-icon-wrapper">
                    <Cpu size={24} />
                  </div>
                  <h3>Mesh Coil Technology</h3>
                  <p>
                    Advanced honeycomb grid structure ensures instant heating, rich flavor distribution, and no dry
                    burn hits.
                  </p>
                </div>

                <div className="feature-card reveal-on-scroll reveal-delay-2" style={{ '--accent-color': activeColor } as React.CSSProperties}>
                  <div className="feature-icon-wrapper">
                    <Battery size={24} />
                  </div>
                  <h3>650mAh Fast Charge</h3>
                  <p>
                    A high-density cell paired with intelligent standby modes. Fully charges in under 35 minutes via
                    USB Type-C.
                  </p>
                </div>

                <div className="feature-card reveal-on-scroll reveal-delay-3" style={{ '--accent-color': activeColor } as React.CSSProperties}>
                  <div className="feature-icon-wrapper">
                    <Flame size={24} />
                  </div>
                  <h3>3ml Liquid Tank</h3>
                  <p>
                    Optimized liquid-level transparency lets you easily inspect remaining capacity. Engineered for leakproof, rich flavor delivery.
                  </p>
                </div>

                <div className="feature-card reveal-on-scroll reveal-delay-4" style={{ '--accent-color': activeColor } as React.CSSProperties}>
                  <div className="feature-icon-wrapper">
                    <Wind size={24} />
                  </div>
                  <h3>Dual Airflow Control</h3>
                  <p>
                    Adjust settings dynamically. Shift between tight mouth-to-lung draws or massive clouds with a simple slider.
                  </p>
                </div>
              </div>
            </section>

            {/* Videos Showcase Gallery */}
            <section className="max-width-container store-section reveal-on-scroll" style={{ borderTop: "1px solid var(--border-glass)", paddingTop: "80px" }}>
              <div className="section-header">
                <span className="section-subtitle" style={{ color: activeColor }}>Vibe Gallery</span>
                <h2 className="section-title">Brand Commercials</h2>
              </div>
              
              <div className="videos-grid">
                <div className="video-card">
                  <video
                    src="/videos/WhatsApp Video 2026-08-21 at 5.19.00 PM.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls
                  />
                  <div className="video-card-overlay">
                    <span>Tokyo Super Cool Promo</span>
                  </div>
                </div>
                <div className="video-card">
                  <video
                    src="/videos/WhatsApp Video 2026-08-21 at 5.19.24 PM.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls
                  />
                  <div className="video-card-overlay">
                    <span>Tactical Vape Aesthetics</span>
                  </div>
                </div>
                <div className="video-card">
                  <video
                    src="/videos/WhatsApp Video 2026-08-21 at 5.19.24 PM (1).mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls
                  />
                  <div className="video-card-overlay">
                    <span>Vapor Showcase Commercial</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Featured Selection */}
            <section className="max-width-container store-section">
              <div className="section-header reveal-on-scroll">
                <span className="section-subtitle">Featured Selection</span>
                <h2 className="section-title">Best Sellers</h2>
              </div>

              <div className="products-grid">
                {DEMO_PRODUCTS.slice(0, 4).map((prod) => (
                  <ProductCard key={prod.id} product={prod} onHover={setActiveColor} onClick={setSelectedProduct} onCheckout={setCheckoutProduct} />
                ))}
              </div>

              <div style={{ display: "flex", justifyContent: "center", marginTop: "40px" }} className="reveal-on-scroll">
                <button
                  onClick={() => { setCurrentView("shop"); setSelectedCategory("all"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className="btn btn-secondary btn-glow"
                  style={{ padding: "12px 30px", fontWeight: "700" }}
                >
                  Explore Full Marketplace
                </button>
              </div>
            </section>

            {/* Customer Reviews & Trust Showcase */}
            <section className="max-width-container reviews-section reveal-on-scroll">
              <div className="section-header" style={{ textAlign: "center" }}>
                <span className="section-subtitle" style={{ color: activeColor, textTransform: "uppercase", fontSize: "12px", letterSpacing: "2px", fontWeight: "700" }}>
                  🌟 Real Customer Feedback
                </span>
                <h2 className="section-title">What Pakistan Vapers Say About Us</h2>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(245, 158, 11, 0.1)", border: "1px solid rgba(245, 158, 11, 0.3)", padding: "6px 16px", borderRadius: "30px", marginTop: "12px" }}>
                  <div style={{ display: "flex", color: "#f59e0b" }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="#f59e0b" />
                    ))}
                  </div>
                  <strong style={{ fontSize: "13px", color: "var(--foreground)" }}>4.9/5 Rating</strong>
                  <span style={{ fontSize: "12px", color: "var(--foreground-muted)" }}>• 1,850+ Verified Reviews</span>
                </div>
              </div>

              <div className="reviews-grid">
                {[
                  {
                    name: "Bilal Tariq",
                    city: "Karachi, Clifton",
                    review: "Ordered the Tokyo Super Cool flavor and Carbon Black Pod. Got same-day delivery within 4 hours in Karachi! 100% original sealed pack. Highly recommended store!",
                    rating: 5,
                    item: "Tokyo Iced Watermelon"
                  },
                  {
                    name: "Zainab Malik",
                    city: "Lahore, DHA",
                    review: "The WhatsApp ordering experience is super smooth and fast. The pod flavor hit is super crisp and battery easily lasts all day. Best vape store in Pakistan.",
                    rating: 5,
                    item: "Cyber Violet Device"
                  },
                  {
                    name: "Hamza Sheikh",
                    city: "Islamabad, F-7",
                    review: "Authentic mesh coils and genuine e-juices. Delivery was quick and packaging was totally leakproof with fragile tags. Will definitely order again!",
                    rating: 5,
                    item: "OXVA Xlim Mesh Coils"
                  }
                ].map((item, idx) => (
                  <div key={idx} className="review-card">
                    <div>
                      <div className="review-card-header">
                        <div className="review-stars">
                          {[...Array(item.rating)].map((_, i) => (
                            <Star key={i} size={15} fill="#f59e0b" />
                          ))}
                        </div>
                        <span className="verified-buyer-badge">
                          <CheckCircle2 size={12} />
                          <span>Verified Buyer</span>
                        </span>
                      </div>
                      <p className="review-text">"{item.review}"</p>
                    </div>

                    <div className="review-author-info">
                      <div className="author-avatar-circle">
                        {item.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="author-name">{item.name}</h4>
                        <span className="author-location">{item.city} • Purchased: <em>{item.item}</em></span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Trust Badges Bar */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "16px",
                marginTop: "40px",
                padding: "22px 28px",
                background: "rgba(18, 12, 32, 0.85)",
                borderRadius: "16px",
                border: "1px solid rgba(168, 85, 247, 0.25)",
                backdropFilter: "blur(16px)",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
                textAlign: "center"
              }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "rgba(16, 185, 129, 0.15)", border: "1px solid rgba(16, 185, 129, 0.3)", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <ShieldCheck size={22} style={{ color: "#34d399" }} />
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <strong style={{ fontSize: "13px", display: "block", color: "#ffffff", fontWeight: "800" }}>100% Genuine</strong>
                    <span style={{ fontSize: "11px", color: "#a1a1aa" }}>Factory Sealed Products</span>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "rgba(14, 165, 233, 0.15)", border: "1px solid rgba(14, 165, 233, 0.3)", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Truck size={22} style={{ color: "#38bdf8" }} />
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <strong style={{ fontSize: "13px", display: "block", color: "#ffffff", fontWeight: "800" }}>Same-Day Dispatch</strong>
                    <span style={{ fontSize: "11px", color: "#a1a1aa" }}>Express Karachi Delivery</span>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "rgba(37, 211, 102, 0.15)", border: "1px solid rgba(37, 211, 102, 0.3)", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <MessageCircle size={22} style={{ color: "#25D366" }} />
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <strong style={{ fontSize: "13px", display: "block", color: "#ffffff", fontWeight: "800" }}>Instant WhatsApp</strong>
                    <span style={{ fontSize: "11px", color: "#a1a1aa" }}>Quick Order &amp; Inquiries</span>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {currentView === "shop" && (
          <section className="max-width-container">
            <ShopView
              products={DEMO_PRODUCTS}
              activeCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              onProductClick={setSelectedProduct}
              onHoverColor={setActiveColor}
              onCheckout={setCheckoutProduct}
              searchQuery={globalSearchQuery}
              onSearchQueryChange={setGlobalSearchQuery}
            />
          </section>
        )}

        {currentView === "about" && (
          <section className="max-width-container">
            <AboutView activeColor={activeColor} />
          </section>
        )}

        {currentView === "faqs" && (
          <section className="max-width-container">
            <FAQsView />
          </section>
        )}

        {currentView === "contact" && (
          <section className="max-width-container">
            <ContactView />
          </section>
        )}
      </main>

      {/* Brands Infinite Ticker Carousel */}
      <section className="brands-slider-section">
        <div className="max-width-container" style={{ textAlign: "center", marginBottom: "30px" }}>
          <span className="section-subtitle" style={{ color: activeColor, textTransform: "uppercase", fontSize: "12px", letterSpacing: "2px", fontWeight: "700" }}>Authorized Partner</span>
          <h2 style={{ fontSize: "26px", fontWeight: "900", fontFamily: "var(--font-display)", color: "var(--foreground)", marginTop: "8px" }}>Featured Premium Brands</h2>
        </div>
        
        <div className="brands-ticker-container">
          <div className="brands-ticker-track">
            {[
              "Tokyo E-Juices", "OXVA", "Vaporesso", "Uwell", "VGOD", "SMOK", "Voopoo", "Lost Vape", "Geekvape", "Pod Salt",
              "Tokyo E-Juices", "OXVA", "Vaporesso", "Uwell", "VGOD", "SMOK", "Voopoo", "Lost Vape", "Geekvape", "Pod Salt"
            ].map((brand, idx) => (
              <div key={idx} className="brand-ticker-item">
                <span>{brand}</span>
                <span className="brand-dot" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer & Age Warning banner */}
      <footer className="footer">
        <div className="max-width-container">
          <div className="footer-inner">
            <div className="footer-brand">
              <div className="logo" style={{ marginBottom: "12px", display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }} onClick={() => { setCurrentView("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
                <img
                  src="/images/logo.jpeg"
                  alt="Ayan Universe Logo"
                  style={{ width: "34px", height: "34px", borderRadius: "50%", objectFit: "cover", border: "1.5px solid #a855f7", boxShadow: "0 0 12px rgba(168, 85, 247, 0.4)" }}
                />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span className="logo-text-gradient" style={{ fontSize: "15px", fontWeight: "900", letterSpacing: "0.5px" }}>AYAN UNIVERSE</span>
                  <span style={{ fontSize: "8.5px", color: "#a855f7", letterSpacing: "2px", fontWeight: "800" }}>VAPOURS</span>
                </div>
              </div>
              <p>Sleek design, engineering excellence, and next-level interactive experiences.</p>
              <div className="footer-socials" style={{ display: "flex", gap: "16px", marginTop: "8px" }}>
                <a href="#" className="nav-link">
                  <Instagram size={20} />
                </a>
                <a href="#" className="nav-link">
                  <Twitter size={20} />
                </a>
                <a href="#" className="nav-link">
                  <Globe size={20} />
                </a>
              </div>
            </div>

            <div className="footer-column">
              <h4>Shop Categories</h4>
              <ul>
                <li>
                  <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView("shop"); setSelectedCategory("device"); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Vape Devices</a>
                </li>
                <li>
                  <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView("shop"); setSelectedCategory("juice"); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Tokyo E-Juices</a>
                </li>
                <li>
                  <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView("shop"); setSelectedCategory("coil"); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Coils</a>
                </li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Support</h4>
              <ul>
                <li>
                  <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView("contact"); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Contact Us</a>
                </li>
                <li>
                  <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView("faqs"); window.scrollTo({ top: 0, behavior: "smooth" }); }}>FAQs Desk</a>
                </li>
                <li>
                  <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView("about"); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Store Locator</a>
                </li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Legal</h4>
              <ul>
                <li>
                  <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView("faqs"); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Privacy Policy</a>
                </li>
                <li>
                  <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView("faqs"); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Terms of Use</a>
                </li>
                <li>
                  <a href="#" onClick={(e) => { e.preventDefault(); window.location.reload(); }}>Age Verification Gate</a>
                </li>
              </ul>
            </div>
          </div>



          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Ayan Universe. All rights reserved.</span>
          </div>
        </div>
      </footer>

      {/* Visual Overlay components */}
      <AgeVerification />
      <CartDrawer />
      {selectedProduct && (
        <ProductDetailsView
          product={selectedProduct}
          allProducts={DEMO_PRODUCTS}
          onClose={() => setSelectedProduct(null)}
          onProductClick={setSelectedProduct}
          onCheckout={(prod) => {
            setSelectedProduct(null);
            setCheckoutProduct(prod);
          }}
        />
      )}
      {checkoutProduct && (
        <CheckoutModal
          product={checkoutProduct}
          onClose={() => setCheckoutProduct(null)}
        />
      )}

      {/* Floating WhatsApp VIP Support & Instant Order Pulse Widget */}
      <a
        href="https://wa.me/923000000000?text=Hi%20Ayan%20Universe%2C%20I%20want%20to%20place%20an%20order%20or%20inquire%20about%20your%20products."
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp-widget"
        aria-label="Instant WhatsApp Order Support"
      >
        <div className="whatsapp-tooltip-bubble hide-for-medium">
          <span className="whatsapp-online-dot" />
          <span>Need Help? Order on WhatsApp!</span>
        </div>
        <div className="whatsapp-pulse-btn">
          <span className="whatsapp-pulse-ring" />
          <MessageCircle size={28} />
        </div>
      </a>
    </div>
  );
}

export default function Home() {
  return (
    <AyanUniverseStore />
  );
}
