"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Code,
  Users,
  MessageSquare,
  Briefcase,
  Search,
  CheckCircle,
  Globe,
  Zap,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/navbar";
import HeroAnimation from "@/components/hero-animation";
import FeatureCard from "@/components/feature-card";
import TestimonialCarousel from "@/components/testimonial-carousel";
import StatsCounter from "@/components/stats-counter";
import Footer from "@/components/footer";
import { cn } from "@/lib/utils";
import router from "next/router";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const features = [
    {
      title: "Rich Developer Profiles",
      description:
        "Create verified profiles showcasing your skills, projects, and expertise to stand out in the crowd.",
      icon: <Code className="h-10 w-10 text-teal-500" />,
      color: "bg-teal-50",
    },
    {
      title: "Talent Discovery",
      description:
        "Teams and startups can easily find the perfect talent for their projects or job openings.",
      icon: <Search className="h-10 w-10 text-purple-500" />,
      color: "bg-purple-50",
    },
    {
      title: "Real-time Messaging",
      description:
        "Connect and communicate with potential collaborators or employers through our secure messaging system.",
      icon: <MessageSquare className="h-10 w-10 text-amber-500" />,
      color: "bg-amber-50",
    },
    {
      title: "Portfolio Showcase",
      description:
        "Display your best work and set your service rates to attract the right opportunities.",
      icon: <Briefcase className="h-10 w-10 text-rose-500" />,
      color: "bg-rose-50",
    },
    {
      title: "Networking Opportunities",
      description:
        "Build meaningful professional connections with developers and teams around the world.",
      icon: <Users className="h-10 w-10 text-emerald-500" />,
      color: "bg-emerald-50",
    },
    {
      title: "Verified Skills",
      description:
        "Get your skills verified to increase trust and credibility with potential employers.",
      icon: <CheckCircle className="h-10 w-10 text-cyan-500" />,
      color: "bg-cyan-50",
    },
  ];

  const stats = [
    { value: 10000, label: "Developers", prefix: "+", suffix: "" },
    { value: 5000, label: "Companies", prefix: "+", suffix: "" },
    { value: 25000, label: "Connections Made", prefix: "", suffix: "" },
    { value: 95, label: "Success Rate", prefix: "", suffix: "%" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navbar />

      <div className="container mx-auto w-full">
        {/* Hero Section */}
        <section className="relative pt-20 pb-32 overflow-hidden">
          <div className="container px-4 mx-auto">
            <div className="flex flex-col lg:flex-row items-center">
              <motion.div
                className="w-full lg:w-1/2 mb-12 lg:mb-0 pr-0 lg:pr-10"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.h1
                  className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-purple-600"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Connect. Collaborate. Create.
                </motion.h1>
                <motion.p
                  className="text-xl text-slate-700 mb-8 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  DevLink Hub is where exceptional developers showcase their
                  skills, connect with innovative teams, and build their
                  professional network. Your next opportunity is just a
                  connection away.
                </motion.p>
                <motion.div
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  {/* <Button
                    size="lg"
                    className="bg-gradient-to-r from-teal-500 to-teal-700 hover:from-teal-600 hover:to-teal-800 text-white"
                    onClick={() => {
                      router.push("/auth");
                    }}
                  >
                    Create Your Profile <ArrowRight className="ml-2 h-4 w-4" />
                  </Button> */}
                  {/* <Button size="lg" variant="outline" className="border-teal-500 text-teal-700 hover:bg-teal-50">
                  Discover Talent
                </Button> */}
                </motion.div>
              </motion.div>
              <motion.div
                className="w-full lg:w-1/2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <HeroAnimation />
              </motion.div>
            </div>
          </div>

          {/* Floating elements */}
          <motion.div
            className="absolute top-20 right-10 hidden lg:block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.8, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <div className="w-20 h-20 rounded-full bg-purple-100 opacity-50"></div>
          </motion.div>
          <motion.div
            className="absolute bottom-20 left-10 hidden lg:block"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 0.8, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <div className="w-32 h-32 rounded-full bg-teal-100 opacity-50"></div>
          </motion.div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <StatsCounter
                  key={index}
                  value={stat.value}
                  label={stat.label}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  delay={index * 0.2}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Powerful Features for Developers & Teams
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                DevLink Hub provides all the tools you need to showcase your
                talent and find the perfect match for your next project.
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {features.map((feature, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <FeatureCard
                    title={feature.title}
                    description={feature.description}
                    icon={feature.icon}
                    color={feature.color}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-24 bg-slate-50">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                How DevLink Hub Works
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                A simple process to connect developers with opportunities and
                teams with talent.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Connection line */}
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-teal-200 transform -translate-y-1/2 z-0"></div>

              {[
                {
                  step: "1",
                  title: "Create Your Profile",
                  description:
                    "Build a comprehensive profile showcasing your skills, experience, and portfolio.",
                  icon: <Users className="h-8 w-8 text-white" />,
                  delay: 0.2,
                },
                {
                  step: "2",
                  title: "Connect & Discover",
                  description:
                    "Find developers or teams that match your requirements and connect with them.",
                  icon: <Search className="h-8 w-8 text-white" />,
                  delay: 0.4,
                },
                {
                  step: "3",
                  title: "Collaborate & Grow",
                  description:
                    "Start collaborating on projects, get hired, or find the perfect talent for your team.",
                  icon: <Zap className="h-8 w-8 text-white" />,
                  delay: 0.6,
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="relative z-10"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: item.delay }}
                >
                  <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-8">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-teal-500 to-teal-700 flex items-center justify-center mb-6">
                          {item.icon}
                        </div>
                        <h3 className="text-2xl font-bold mb-2">
                          {item.title}
                        </h3>
                        <p className="text-slate-600">{item.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Target Users Section */}
        {/* <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {[
              {
                title: "For Developers",
                description: "Showcase your skills, connect with teams, and find your next opportunity.",
                features: [
                  "Create a verified professional profile",
                  "Showcase your portfolio and projects",
                  "Set your service rates and availability",
                  "Connect with startups and hiring teams",
                  "Build your professional network",
                ],
                image: "/placeholder.svg?key=xn4pi",
                color: "from-teal-500 to-teal-700",
                delay: 0.2,
              },
              {
                title: "For Teams & Recruiters",
                description: "Find the perfect talent for your projects or job openings.",
                features: [
                  "Browse verified developer profiles",
                  "Filter by skills, experience, and availability",
                  "View portfolios and service rates",
                  "Connect directly with developers",
                  "Build your team with confidence",
                ],
                image: "/diverse-office-team.png",
                color: "from-purple-500 to-purple-700",
                delay: 0.4,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: item.delay }}
                className="flex flex-col"
              >
                <div className="mb-8">
                  <h3
                    className={cn("text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r", item.color)}
                  >
                    {item.title}
                  </h3>
                  <p className="text-xl text-slate-600 mb-6">{item.description}</p>
                  <ul className="space-y-3">
                    {item.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: item.delay + i * 0.1 }}
                        className="flex items-start"
                      >
                        <CheckCircle className="h-6 w-6 text-teal-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <motion.div
                  className="rounded-lg overflow-hidden shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-auto object-cover" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

        {/* Testimonials Section */}
        <section className="py-24 bg-slate-50">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What Our Users Say
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Hear from developers and teams who have found success on DevLink
                Hub.
              </p>
            </motion.div>

            <TestimonialCarousel />
          </div>
        </section>

        {/* Global Network Section */}
        <section className="py-24 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Join Our Global Developer Network
                </h2>
                <p className="text-xl mb-8 text-slate-300 leading-relaxed">
                  DevLink Hub connects developers and teams from over 150
                  countries, creating a truly global talent marketplace. Whether
                  you're looking for remote work or local opportunities, our
                  platform helps you find the perfect match.
                </p>
                <div className="flex flex-wrap gap-4 mb-8">
                  {[
                    "Remote Work",
                    "Freelance",
                    "Full-time",
                    "Contract",
                    "Project-based",
                  ].map((tag, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.1 * i }}
                      className="px-4 py-2 bg-slate-700 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-teal-500 to-teal-700 hover:from-teal-600 hover:to-teal-800 text-white"
                >
                  Join Our Network <Globe className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <img
                  src="/placeholder.svg?key=ccn71"
                  alt="Global Developer Network"
                  className="rounded-lg shadow-2xl"
                />
                <motion.div
                  className="absolute -bottom-6 -right-6 bg-teal-500 text-white p-6 rounded-lg shadow-xl"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="text-4xl font-bold mb-1">150+</div>
                  <div className="text-sm">Countries</div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Shield className="h-16 w-16 mx-auto mb-6 text-teal-500" />
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Secure & Verified Connections
              </h2>
              <p className="text-lg text-slate-600">
                DevLink Hub uses advanced verification processes to ensure all
                profiles are authentic and trustworthy. Your data is protected
                with enterprise-grade security, and all communications are
                encrypted.
              </p>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        {/* <section className="py-24 bg-gradient-to-r from-teal-500 to-teal-700 text-white">
          <div className="container mx-auto px-4">
            <motion.div
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Ready to Connect with the Best?
              </h2>
              <p className="text-xl mb-10 text-teal-50">
                Join thousands of developers and teams already building their
                network on DevLink Hub.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-teal-700 hover:bg-teal-50"
                >
                  Create Your Profile
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-teal-600"
                >
                  Discover Talent
                </Button>
              </div>
            </motion.div>
          </div>
        </section> */}

        <Footer />
      </div>
    </div>
  );
}
