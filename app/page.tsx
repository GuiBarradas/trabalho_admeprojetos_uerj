"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowRight,
  BookOpen,
  Users,
  ShieldAlert,
  Target,
  Lightbulb,
  Menu,
  X,
  ArrowUpRight,
  CheckCircle2,
  BarChart3,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useInView } from "react-intersection-observer"
import { AnimatedCounter } from "@/components/animated-counter"
import { GradientCard } from "@/components/gradient-card"
import { FloatingElements } from "@/components/floating-elements"
import { CultureChart } from "@/components/culture-chart"

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("introducao")
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]")
      const scrollPosition = window.scrollY + 100

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop
        const sectionHeight = (section as HTMLElement).offsetHeight
        const sectionId = section.getAttribute("id") || ""

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const staggerChildrenVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const navItems = [
    { href: "#introducao", label: "Introdução" },
    { href: "#influencia", label: "Influência" },
    { href: "#lideranca", label: "Liderança" },
    { href: "#motivacao", label: "Motivação" },
    { href: "#riscos", label: "Riscos" },
    { href: "#estudos-caso", label: "Estudos de Caso" },
    { href: "#estrategias", label: "Estratégias" },
    { href: "#conclusao", label: "Conclusão" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 overflow-hidden">
      <header ref={headerRef} className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-semibold">
            <div className="relative">
              <BookOpen className="h-5 w-5 text-emerald-600" />
              <div className="absolute -top-1 -right-1 h-2 w-2 bg-emerald-500 rounded-full animate-pulse"></div>
            </div>
            <span>ADM e Controle de Projetos</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors relative",
                  activeSection === item.href.substring(1)
                    ? "text-emerald-600"
                    : "text-slate-700 hover:text-emerald-600",
                )}
                onClick={() => setActiveSection(item.href.substring(1))}
              >
                {item.label}
                {activeSection === item.href.substring(1) && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-emerald-500"
                  />
                )}
              </Link>
            ))}
          </nav>
          <div className="hidden md:block">
            <Button
              className="bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 transition-all duration-300 shadow-md hover:shadow-lg"
              asChild
            >
              <a href="/cultura-organizacional.pdf" download>
                Baixar Apresentação
              </a>
            </Button>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden fixed inset-x-0 top-16 z-40 bg-white border-b shadow-lg"
        >
          <div className="container py-4">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium p-2 rounded-md transition-colors",
                    activeSection === item.href.substring(1)
                      ? "bg-emerald-50 text-emerald-600"
                      : "text-slate-700 hover:bg-slate-50",
                  )}
                  onClick={() => {
                    setActiveSection(item.href.substring(1))
                    setMobileMenuOpen(false)
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-4 pt-4 border-t">
              <Button className="w-full bg-gradient-to-r from-emerald-600 to-teal-500" asChild>
                <a href="/cultura-organizacional.pdf" download>
                  Baixar Apresentação
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      <section className="relative py-20 md:py-32 overflow-hidden">
        <FloatingElements />
        <div className="absolute inset-0 bg-[url('/abstract-pattern.png')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 to-white"></div>
        <div className="container relative">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerChildrenVariants}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div variants={fadeInUpVariants} className="mb-4">
              <span className="inline-block px-3 py-1 text-xs font-semibold text-emerald-800 bg-emerald-100 rounded-full">
                Trabalho Acadêmico • Tecnologia em Análise e Desenvolvimento de Sistemas
              </span>
            </motion.div>
            <motion.h1 variants={fadeInUpVariants} className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Compreendendo a{" "}
              <span className="relative">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                  Cultura Organizacional
                </span>
                <span className="absolute -bottom-2 left-0 right-0 h-3 bg-emerald-200 opacity-50 -z-10 transform -rotate-1"></span>
              </span>
            </motion.h1>
            <motion.p variants={fadeInUpVariants} className="text-xl md:text-2xl text-slate-600 mb-8">
              O alicerce invisível que sustenta o comportamento coletivo e impacta diretamente a gestão de projetos
            </motion.p>
            <motion.div variants={fadeInUpVariants} className="mt-12 text-sm text-slate-500">
              <p>Trabalho apresentado por: Alan, Victor e Guilherme</p>
              <p>Professor: Alcebiades Lobo</p>
              <p>Data: 19/05/2025</p>
            </motion.div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-100 to-transparent"></div>
      </section>

      <SectionWrapper id="introducao" className="py-16 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6">
                <span className="relative inline-block">
                  O que é Cultura Organizacional?
                  <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-400"></span>
                </span>
              </h2>
              <p className="text-lg text-slate-600 mb-4">
                A cultura organizacional é o alicerce invisível, mas essencial, que sustenta o comportamento coletivo de
                uma organização.
              </p>
              <p className="text-lg text-slate-600 mb-6">
                Trata-se de um conjunto de valores, crenças, práticas, normas e símbolos que orientam as ações e
                decisões internas.
              </p>
              <div className="p-4 border-l-4 border-emerald-500 bg-emerald-50 rounded-r-lg">
                <blockquote className="italic text-slate-700">
                  "A cultura organizacional é para as empresas o que a personalidade é para os indivíduos: um conjunto
                  oculto, mas unificador, de atributos que fornece significado, direção e mobilização."
                </blockquote>
                <p className="text-right text-sm text-slate-500 mt-2">
                  — Edgar Schein, "Organizational Culture and Leadership", 2017
                </p>
              </div>
            </motion.div>
            <div>
              <GradientCard className="p-8 rounded-xl">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerChildrenVariants}
                  className="space-y-6"
                >
                  <motion.div variants={fadeInUpVariants} className="flex items-start gap-4">
                    <div className="bg-emerald-100 p-3 rounded-full">
                      <Lightbulb className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Valores</h3>
                      <p className="text-slate-600">Princípios fundamentais que guiam as decisões e comportamentos</p>
                    </div>
                  </motion.div>
                  <motion.div variants={fadeInUpVariants} className="flex items-start gap-4">
                    <div className="bg-emerald-100 p-3 rounded-full">
                      <Users className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Práticas</h3>
                      <p className="text-slate-600">Ações e rotinas que refletem e reforçam a cultura</p>
                    </div>
                  </motion.div>
                  <motion.div variants={fadeInUpVariants} className="flex items-start gap-4">
                    <div className="bg-emerald-100 p-3 rounded-full">
                      <Target className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Símbolos</h3>
                      <p className="text-slate-600">
                        Representações visuais e comportamentais dos valores da organização
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              </GradientCard>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <section className="py-12 bg-gradient-to-r from-emerald-600 to-teal-500 text-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <StatCounter
              value={92}
              label="Executivos que acreditam que cultura aumenta valor da empresa"
              suffix="%"
              source="Deloitte, 2019"
            />
            <StatCounter
              value={4.2}
              label="Vezes mais chances de crescimento com cultura forte"
              suffix="x"
              decimals={1}
              source="McKinsey, 2021"
            />
            <StatCounter
              value={70}
              label="Projetos que falham devido a fatores culturais"
              suffix="%"
              source="PMI, 2022"
            />
            <StatCounter
              value={33}
              label="Aumento na produtividade com cultura engajada"
              suffix="%"
              source="Gallup, 2023"
            />
          </div>
        </div>
      </section>

      <SectionWrapper id="influencia" className="py-16 bg-slate-50">
        <div className="container">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-bold mb-4"
            >
              A Influência da Cultura na Metodologia de Projetos
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-1 w-24 bg-gradient-to-r from-emerald-500 to-teal-400 mx-auto"
            ></motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-500"
            >
              <div className="h-2 bg-gradient-to-r from-emerald-400 to-emerald-600"></div>
              <div className="p-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="mr-2">Culturas Colaborativas</span>
                  <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Users className="h-4 w-4 text-emerald-600" />
                  </div>
                </h3>
                <p className="text-slate-600 mb-6">
                  Organizações com culturas colaborativas tendem a adotar metodologias mais flexíveis, como as
                  abordagens ágeis, promovendo inovação e adaptabilidade. Segundo o BCG (2023), 88% dessas empresas
                  superam seus concorrentes em crescimento de mercado.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-emerald-50 transform transition-transform duration-300 group-hover:translate-x-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-slate-700">Comunicação aberta e frequente</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-emerald-50 transform transition-transform duration-300 group-hover:translate-x-2 delay-75">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-slate-700">Tomada de decisão descentralizada</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-emerald-50 transform transition-transform duration-300 group-hover:translate-x-2 delay-150">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-slate-700">Adaptação rápida a mudanças</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-500"
            >
              <div className="h-2 bg-gradient-to-r from-slate-400 to-slate-600"></div>
              <div className="p-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="mr-2">Culturas Hierárquicas</span>
                  <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center">
                    <BarChart3 className="h-4 w-4 text-slate-600" />
                  </div>
                </h3>
                <p className="text-slate-600 mb-6">
                  Empresas com culturas mais hierárquicas frequentemente preferem metodologias tradicionais. Pesquisas
                  do MIT Sloan (2022) mostram que estas organizações tomam decisões 60% mais lentamente, mas podem ter
                  maior consistência em processos padronizados.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 transform transition-transform duration-300 group-hover:translate-x-2">
                    <CheckCircle2 className="h-5 w-5 text-slate-500 flex-shrink-0" />
                    <span className="text-slate-700">Processos bem definidos e documentados</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 transform transition-transform duration-300 group-hover:translate-x-2 delay-75">
                    <CheckCircle2 className="h-5 w-5 text-slate-500 flex-shrink-0" />
                    <span className="text-slate-700">Aprovações em múltiplos níveis</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 transform transition-transform duration-300 group-hover:translate-x-2 delay-150">
                    <CheckCircle2 className="h-5 w-5 text-slate-500 flex-shrink-0" />
                    <span className="text-slate-700">Planejamento detalhado e antecipado</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="mt-16">
            <CultureChart />
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper id="lideranca" className="py-16 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Liderança e Sensibilidade Cultural em Gestão de Projetos</h2>
              <div className="h-1 w-24 bg-gradient-to-r from-emerald-500 to-teal-400 mx-auto"></div>
            </motion.div>

            <div className="relative">
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                whileInView={{ opacity: 1, height: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-400 to-teal-500"
              ></motion.div>

              <div className="pl-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <p className="text-lg text-slate-600 mb-6">
                    O gerente de projetos, nesse contexto, precisa ser mais do que um executor de cronogramas. Ele
                    precisa ser um <span className="font-semibold text-emerald-700">leitor atento da cultura</span>.
                  </p>
                  <p className="text-lg text-slate-600 mb-6">
                    Sua habilidade em perceber padrões de comportamento, identificar resistências e adaptar estratégias
                    conforme o ambiente pode ser o diferencial entre o sucesso e o fracasso. Segundo o PMI (2022), 70%
                    dos projetos que falham são atribuídos a fatores relacionados à cultura organizacional.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="mt-8"
                >
                  <GradientCard className="p-6 rounded-lg border-l-4 border-emerald-500">
                    <h3 className="text-xl font-semibold mb-6">Competências do Líder Culturalmente Sensível</h3>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="group">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                            <span className="font-semibold text-emerald-600">01</span>
                          </div>
                          <span className="text-slate-700 font-medium">Escuta ativa</span>
                        </div>
                        <p className="text-sm text-slate-600 pl-13">
                          Capacidade de ouvir atentamente e compreender as nuances culturais
                        </p>
                      </div>
                      <div className="group">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                            <span className="font-semibold text-emerald-600">02</span>
                          </div>
                          <span className="text-slate-700 font-medium">Empatia organizacional</span>
                        </div>
                        <p className="text-sm text-slate-600 pl-13">
                          Compreensão profunda dos valores e motivações da equipe
                        </p>
                      </div>
                      <div className="group">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                            <span className="font-semibold text-emerald-600">03</span>
                          </div>
                          <span className="text-slate-700 font-medium">Adaptabilidade</span>
                        </div>
                        <p className="text-sm text-slate-600 pl-13">
                          Flexibilidade para ajustar abordagens conforme o contexto cultural
                        </p>
                      </div>
                      <div className="group">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                            <span className="font-semibold text-emerald-600">04</span>
                          </div>
                          <span className="text-slate-700 font-medium">Comunicação contextual</span>
                        </div>
                        <p className="text-sm text-slate-600 pl-13">
                          Habilidade de comunicar considerando aspectos culturais
                        </p>
                      </div>
                    </div>
                  </GradientCard>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper id="motivacao" className="py-16 bg-slate-50 overflow-hidden">
        <div className="container relative">
          <div className="absolute -right-64 top-0 w-96 h-96 bg-gradient-to-br from-emerald-300/20 to-teal-300/20 rounded-full blur-3xl"></div>
          <div className="absolute -left-64 bottom-0 w-96 h-96 bg-gradient-to-tr from-emerald-300/20 to-teal-300/20 rounded-full blur-3xl"></div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 relative z-10"
          >
            <h2 className="text-3xl font-bold mb-4">Impacto Cultural na Motivação e no Engajamento da Equipe</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-emerald-500 to-teal-400 mx-auto"></div>
          </motion.div>

          <div className="max-w-4xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-xl shadow-xl"
            >
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Quando a cultura organizacional é sólida, transparente e bem compreendida, ela atua como uma
                <span className="relative inline-block mx-1">
                  <span className="relative z-10">força propulsora</span>
                  <span className="absolute bottom-0 left-0 right-0 h-2 bg-emerald-200 -z-10"></span>
                </span>
                . De acordo com a Gallup (2023), organizações com culturas altamente engajadas apresentam 33% maior
                produtividade, pois os colaboradores sentem-se parte de algo maior e desenvolvem um senso de propósito.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-lg text-center group hover:shadow-md transition-all duration-300"
                >
                  <div className="h-16 w-16 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-4 transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <Target className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Propósito</h3>
                  <p className="text-slate-600">Conexão com objetivos maiores da organização</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-lg text-center group hover:shadow-md transition-all duration-300"
                >
                  <div className="h-16 w-16 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-4 transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <Users className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Pertencimento</h3>
                  <p className="text-slate-600">Sentimento de fazer parte de uma comunidade</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-lg text-center group hover:shadow-md transition-all duration-300"
                >
                  <div className="h-16 w-16 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-4 transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <Lightbulb className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Autonomia</h3>
                  <p className="text-slate-600">Liberdade para tomar decisões alinhadas aos valores</p>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-8 p-4 border border-emerald-200 rounded-lg bg-emerald-50"
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl text-emerald-500 font-serif">"</div>
                  <div>
                    <p className="italic text-slate-700">
                      Empresas com culturas fortes têm 72% menor rotatividade de funcionários e demonstram maior
                      capacidade de reter talentos essenciais para o sucesso de projetos.
                    </p>
                    <p className="text-right text-sm text-slate-500 mt-2">
                      — Columbia University, "The Impact of Corporate Culture on Employee Turnover", 2020
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper id="riscos" className="py-16 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6">
                <span className="relative inline-block">
                  Riscos e Cultura Organizacional
                  <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-400"></span>
                </span>
              </h2>
              <p className="text-lg text-slate-600 mb-6">
                Outro aspecto relevante é a influência da cultura na gestão de riscos. Em ambientes onde há abertura e
                confiança, os riscos são discutidos abertamente, com ações preventivas pensadas em equipe.
              </p>
              <p className="text-lg text-slate-600 mb-8">
                Isso reduz o impacto de problemas futuros e fortalece a capacidade da organização de reagir rapidamente.
              </p>

              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex-shrink-0 h-12 w-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center">
                  <ArrowUpRight className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-slate-900">Impacto Positivo</h4>
                  <p className="text-sm text-slate-600">
                    Organizações com culturas abertas relatam 59% menos incidentes críticos em projetos
                    <span className="block text-xs text-slate-500 mt-1">Fonte: Harvard Business Review, 2022</span>
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white p-8 rounded-xl shadow-xl">
                <div className="flex items-center gap-4 mb-6">
                  <ShieldAlert className="h-10 w-10 text-emerald-400" />
                  <h3 className="text-2xl font-semibold">Cultura de Gestão de Riscos</h3>
                </div>
                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="p-4 bg-slate-700/50 rounded-lg border-l-4 border-emerald-500 hover:bg-slate-700 transition-colors duration-300"
                  >
                    <h4 className="font-medium mb-2">Cultura de Abertura</h4>
                    <p className="text-slate-300 text-sm">
                      Problemas são discutidos sem medo de represálias ou julgamentos
                    </p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    className="p-4 bg-slate-700/50 rounded-lg border-l-4 border-teal-500 hover:bg-slate-700 transition-colors duration-300"
                  >
                    <h4 className="font-medium mb-2">Cultura de Aprendizado</h4>
                    <p className="text-slate-300 text-sm">
                      Erros são vistos como oportunidades valiosas de melhoria e crescimento
                    </p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    className="p-4 bg-slate-700/50 rounded-lg border-l-4 border-cyan-500 hover:bg-slate-700 transition-colors duration-300"
                  >
                    <h4 className="font-medium mb-2">Cultura de Prevenção</h4>
                    <p className="text-slate-300 text-sm">
                      Antecipação de problemas é valorizada e ativamente incentivada
                    </p>
                  </motion.div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-700">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Eficácia na mitigação de riscos</span>
                    <span className="text-emerald-400 font-medium">78%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-700 rounded-full mt-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "78%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.6 }}
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                    ></motion.div>
                  </div>
                  <div className="text-right text-xs text-slate-400 mt-1">Fonte: PwC, Global Culture Survey, 2021</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper id="estudos-caso" className="py-16 bg-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Estudos de Caso e Exemplos Práticos</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-emerald-500 to-teal-400 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="h-2 bg-emerald-500"></div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                  <h3 className="text-xl font-semibold">Google – Inovação como DNA</h3>
                </div>
                <p className="text-slate-600 mb-4">
                  A cultura adhocrática do Google transforma a gestão de projetos em um campo de experimentação. Com a
                  política "20% do tempo", que permite que funcionários dediquem parte da jornada a projetos pessoais,
                  nasceram iniciativas como Gmail e Google Maps. Aqui, o fracasso não é punido – é visto como passo
                  necessário para inovação.
                </p>
                <div className="text-xs text-slate-500 italic">
                  Fonte: Harvard Business Review, "How Google Works", 2021
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="h-2 bg-emerald-500"></div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                  <h3 className="text-xl font-semibold">Toyota – Excelência com Kaizen</h3>
                </div>
                <p className="text-slate-600 mb-4">
                  Na Toyota, projetos não são apenas entregues – são continuamente aprimorados. A cultura que mistura
                  hierarquia com melhoria contínua resultou em sistemas como o Toyota Production System, onde até o
                  operário da linha tem voz para sugerir melhorias. O segredo? Padronização que não engessa a
                  criatividade.
                </p>
                <div className="text-xs text-slate-500 italic">
                  Fonte: MIT Sloan Management Review, "The Toyota Way", 2020
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="h-2 bg-red-500"></div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <X className="h-6 w-6 text-red-500" />
                  <h3 className="text-xl font-semibold">NHS – O Custo do Desalinhamento</h3>
                </div>
                <p className="text-slate-600 mb-4">
                  O ambicioso projeto de prontuários eletrônicos do serviço de saúde britânico consumiu £10 bilhões
                  antes de ser abandonado. O erro crucial? Ignorar que hospitais locais valorizavam autonomia acima de
                  padronização. Um caso clássico onde a tecnologia era viável, mas a cultura não estava preparada.
                </p>
                <div className="text-xs text-slate-500 italic">
                  Fonte: British Journal of Healthcare Management, "NHS Digital Transformation", 2019
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="h-2 bg-emerald-500"></div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                  <h3 className="text-xl font-semibold">Embraer – Transformação Cultural</h3>
                </div>
                <p className="text-slate-600 mb-4">
                  A brasileira Embraer mostrou que até em setores tradicionais a cultura pode evoluir. Ao adotar gestão
                  de projetos ágil em engenharia aeronáutica, provou que é possível manter rigor técnico enquanto
                  incentiva inovação – desde que a mudança cultural seja gradual e bem liderada.
                </p>
                <div className="text-xs text-slate-500 italic">
                  Fonte: Project Management Journal, "Agile in Aerospace", 2022
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 p-6 bg-slate-50 rounded-xl border border-slate-200"
          >
            <p className="text-lg text-slate-700">
              Estes casos provam que metodologias e cronogramas são importantes, mas é a cultura que determina se as
              melhores práticas vão virar rotina ou apenas PowerPoint esquecido. Grandes empresas não impõem modelos –
              cultivam ecossistemas onde projetos florescem naturalmente.
            </p>
          </motion.div>
        </div>
      </SectionWrapper>

      <SectionWrapper id="estrategias" className="py-16 bg-slate-50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">
              Estratégias para Alinhar Cultura Organizacional e Gestão de Projetos
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-emerald-500 to-teal-400 mx-auto"></div>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-xl shadow-xl mb-10"
            >
              <p className="text-lg text-slate-600 mb-6">
                Alinhar a cultura organizacional à gestão de projetos é uma tarefa estratégica que requer sensibilidade,
                planejamento e ações estruturadas. Esse alinhamento é fundamental para garantir que os projetos não
                apenas alcancem seus objetivos técnicos e financeiros, mas também estejam em harmonia com os valores,
                comportamentos e expectativas da organização.
              </p>
              <p className="text-lg text-slate-600 mb-6">
                Projetos que entram em choque com a cultura vigente frequentemente enfrentam resistência, atrasos e
                falhas de implementação. Por isso, a adoção de estratégias específicas que promovam esse alinhamento
                torna-se essencial para o sucesso organizacional.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl shadow-md"
              >
                <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-emerald-600 font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Diagnose da Cultura Organizacional</h3>
                <p className="text-slate-600">
                  Antes de iniciar qualquer projeto, é importante compreender profundamente a cultura da organização.
                  Ferramentas como o modelo de Cameron & Quinn, entrevistas e questionários podem mapear valores
                  predominantes e padrões de comportamento.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl shadow-md"
              >
                <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-emerald-600 font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Capacitação da Liderança</h3>
                <p className="text-slate-600">
                  Líderes e gerentes de projeto devem estar preparados para atuar como "agentes de integração cultural",
                  capazes de mediar as exigências técnicas dos projetos com os valores culturais da organização.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl shadow-md"
              >
                <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-emerald-600 font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Comunicação Clara e Transparente</h3>
                <p className="text-slate-600">
                  Ao compartilhar informações relevantes sobre os objetivos, impactos e benefícios dos projetos, os
                  gestores fortalecem a confiança entre as partes envolvidas e reduzem incertezas.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl shadow-md"
              >
                <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-emerald-600 font-bold text-xl">4</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Engajamento dos Stakeholders</h3>
                <p className="text-slate-600">
                  Envolver os diferentes públicos afetados pelo projeto desde o início do planejamento é uma forma
                  eficaz de aumentar o comprometimento e reduzir resistências.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl shadow-md"
              >
                <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-emerald-600 font-bold text-xl">5</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Metodologias Compatíveis</h3>
                <p className="text-slate-600">
                  Metodologias ágeis podem ser mais bem-sucedidas em culturas flexíveis e inovadoras, enquanto modelos
                  tradicionais podem se adequar melhor a organizações mais formais e estruturadas.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl shadow-md"
              >
                <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-emerald-600 font-bold text-xl">6</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Reforço de Aprendizados Culturais</h3>
                <p className="text-slate-600">
                  Criar espaços de feedback, compartilhar boas práticas e reconhecer atitudes alinhadas à cultura
                  organizacional contribui para consolidar comportamentos desejáveis.
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-10 p-6 bg-white rounded-xl shadow-md border-l-4 border-emerald-500"
            >
              <p className="text-lg text-slate-700">
                Em síntese, o alinhamento entre cultura organizacional e gestão de projetos não ocorre de forma
                automática, exigindo estratégias conscientes e ações coordenadas. Quando bem conduzido, esse processo
                não só potencializa os resultados dos projetos, como também fortalece a identidade organizacional e a
                capacidade da empresa de se adaptar e evoluir em um ambiente cada vez mais desafiador.
              </p>
            </motion.div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper id="conclusao" className="py-16 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildrenVariants}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.h2 variants={fadeInUpVariants} className="text-3xl font-bold mb-8">
              O Papel Central da Cultura na Gestão de Projetos
            </motion.h2>

            <motion.p variants={fadeInUpVariants} className="text-lg text-slate-600 mb-6">
              Portanto, ao se analisar o impacto da cultura organizacional na gestão de projetos, percebe-se que não se
              trata apenas de um pano de fundo simbólico, mas de um elemento estruturante. Pesquisas da McKinsey (2021)
              demonstram que empresas com culturas fortes têm 4.2 vezes maior probabilidade de apresentar crescimento
              sustentável.
            </motion.p>
            <motion.p variants={fadeInUpVariants} className="text-lg text-slate-600 mb-8">
              Projetos bem-sucedidos não nascem apenas de cronogramas bem desenhados ou de ferramentas modernas, mas da
              capacidade da organização de articular pessoas em torno de um propósito comum — e isso é, essencialmente,
              uma manifestação cultural que, segundo a Deloitte (2019), é reconhecida por 92% dos executivos como fator
              crítico para o valor da empresa.
            </motion.p>
            <motion.div variants={fadeInUpVariants}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 transition-all duration-300 shadow-md hover:shadow-lg"
                asChild
              >
                <a href="/cultura-organizacional.pdf" download>
                  Baixar Apresentação Completa
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </SectionWrapper>

      <section className="py-16 bg-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-8 text-center">Referências Bibliográficas</h2>
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-700">
                  <span className="font-medium">Deloitte. (2019).</span> Core beliefs and culture: Chairman's survey
                  findings. Deloitte Insights.
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-700">
                  <span className="font-medium">McKinsey & Company. (2021).</span> Culture for a digital age. McKinsey
                  Quarterly.
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-700">
                  <span className="font-medium">Project Management Institute. (2022).</span> Pulse of the Profession:
                  The Power of Culture. PMI Global Survey.
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-700">
                  <span className="font-medium">Gallup. (2023).</span> State of the Global Workplace: Employee
                  Engagement Insights for Business Leaders Worldwide.
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-700">
                  <span className="font-medium">Harvard Business Review. (2022).</span> The Leader's Guide to Corporate
                  Culture. Harvard Business Publishing.
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-700">
                  <span className="font-medium">PwC. (2021).</span> Global Culture Survey: The link between culture and
                  competitive advantage. PricewaterhouseCoopers.
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-700">
                  <span className="font-medium">Columbia University. (2020).</span> The Impact of Corporate Culture on
                  Employee Turnover. Columbia Business School Research Paper.
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-700">
                  <span className="font-medium">Boston Consulting Group. (2023).</span> The Most Innovative Companies:
                  Innovation's New World Order. BCG Henderson Institute.
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-700">
                  <span className="font-medium">MIT Sloan Management Review. (2022).</span> The Culture Factor: How
                  Culture Shapes the Digital Transformation. MIT Press.
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-700">
                  <span className="font-medium">Schein, E. H. (2017).</span> Organizational Culture and Leadership (5th
                  ed.). Jossey-Bass.
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-700">
                  <span className="font-medium">CAMERON, Kim S.; QUINN, Robert E. (2011).</span> Diagnosing and Changing
                  Organizational Culture: Based on the Competing Values Framework. 3. ed. San Francisco: Jossey-Bass.
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-700">
                  <span className="font-medium">CHIAVENATO, Idalberto. (2014).</span> Introdução à Teoria Geral da
                  Administração. 9. ed. Rio de Janeiro: Elsevier.
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-700">
                  <span className="font-medium">KERZNER, Harold. (2017).</span> Gestão de Projetos: As melhores
                  práticas. 3. ed. Porto Alegre: Bookman.
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-700">
                  <span className="font-medium">MAXIMIANO, Antônio César Amaru. (2021).</span> Teoria Geral da
                  Administração: Da revolução urbana à revolução digital. 9. ed. São Paulo: Atlas.
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-700">
                  <span className="font-medium">PMI – Project Management Institute. (2021).</span> Um Guia do
                  Conhecimento em Gerenciamento de Projetos (Guia PMBOK®). 7. ed. Philadelphia: PMI.
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-700">
                  <span className="font-medium">VALERIANO, Dalton Lopes. (1998).</span> Gerência em Projetos: Pesquisa,
                  desenvolvimento e engenharia. 2. ed. São Paulo: Makron Books.
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-700">
                  <span className="font-medium">VERGARA, Sylvia Constant. (2010).</span> Gestão de Pessoas. 3. ed. São
                  Paulo: Atlas.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-12">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 font-semibold mb-4">
                <div className="relative">
                  <BookOpen className="h-5 w-5 text-emerald-400" />
                  <div className="absolute -top-1 -right-1 h-2 w-2 bg-emerald-500 rounded-full animate-pulse"></div>
                </div>
                <span>ADM e Controle de Projetos</span>
              </div>
              <p className="text-slate-400">
                Trabalho acadêmico sobre Cultura Organizacional e sua influência na gestão de projetos.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Autores</h3>
              <ul className="space-y-2 text-slate-400">
                <li className="flex items-center gap-2 group">
                  <div className="h-1 w-1 bg-emerald-500 rounded-full group-hover:w-2 transition-all duration-300"></div>
                  <span className="group-hover:text-emerald-400 transition-colors duration-300">Alan</span>
                </li>
                <li className="flex items-center gap-2 group">
                  <div className="h-1 w-1 bg-emerald-500 rounded-full group-hover:w-2 transition-all duration-300"></div>
                  <span className="group-hover:text-emerald-400 transition-colors duration-300">Guilherme</span>
                </li>
                <li className="flex items-center gap-2 group">
                  <div className="h-1 w-1 bg-emerald-500 rounded-full group-hover:w-2 transition-all duration-300"></div>
                  <span className="group-hover:text-emerald-400 transition-colors duration-300">Victor</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Informações</h3>
              <ul className="space-y-2 text-slate-400">
                <li className="flex items-center gap-2">
                  <div className="h-1 w-1 bg-emerald-500 rounded-full"></div>
                  <span>Professor: Alcebiades Lobo</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1 w-1 bg-emerald-500 rounded-full"></div>
                  <span>Disciplina: Administração e Controle de Projetos</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1 w-1 bg-emerald-500 rounded-full"></div>
                  <span>Data: 19/05/2025</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-500 text-sm">
            <p>© 2025 - Guilherme Martins Barradas - Intuitos acadêmicos</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function SectionWrapper({ id, className, children }: { id: string; className?: string; children: React.ReactNode }) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <section id={id} ref={ref} className={className}>
      <div className={cn("transition-opacity duration-1000", inView ? "opacity-100" : "opacity-0")}>{children}</div>
    </section>
  )
}

// Atualizar a função StatCounter para incluir a fonte

function StatCounter({
  value,
  label,
  suffix = "",
  decimals = 0,
  source,
}: { value: number; label: string; suffix?: string; decimals?: number; source?: string }) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center"
    >
      <div className="text-3xl md:text-4xl font-bold mb-2 flex items-end">
        {inView ? <AnimatedCounter value={value} decimals={decimals} source={source} /> : 0}
        <span>{suffix}</span>
      </div>
      <p className="text-sm text-emerald-100 text-center">{label}</p>
    </motion.div>
  )
}
