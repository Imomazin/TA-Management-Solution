"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  GraduationCap,
  Users,
  Calendar,
  BarChart3,
  CheckCircle,
  Clock,
  FileText,
  TrendingUp,
  Github
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ThemeToggle } from '@/components/ui/theme-toggle'

const features = [
  {
    icon: Users,
    title: 'TA Management',
    description: 'Efficiently manage teaching assistants, track availability, and assign roles.',
  },
  {
    icon: Calendar,
    title: 'Scheduling',
    description: 'Automated scheduling with conflict detection and capacity planning.',
  },
  {
    icon: Clock,
    title: 'Time Tracking',
    description: 'Track TA hours, submit timesheets, and manage approvals seamlessly.',
  },
  {
    icon: FileText,
    title: 'Applications',
    description: 'Streamlined application process with committee reviews and approvals.',
  },
  {
    icon: BarChart3,
    title: 'Analytics',
    description: 'Comprehensive reports and insights on TA utilization and performance.',
  },
  {
    icon: TrendingUp,
    title: 'Optimization',
    description: 'AI-powered recommendations for optimal TA assignment and workload distribution.',
  },
]

const steps = [
  {
    number: '01',
    title: 'Create Account',
    description: 'Sign up and set up your department or institution profile.',
  },
  {
    number: '02',
    title: 'Add Courses & TAs',
    description: 'Import your courses and invite teaching assistants to join.',
  },
  {
    number: '03',
    title: 'Assign & Schedule',
    description: 'Use our smart scheduling to assign TAs based on availability and needs.',
  },
  {
    number: '04',
    title: 'Track & Manage',
    description: 'Monitor hours, approve timesheets, and generate reports effortlessly.',
  },
]

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6" />
            <span className="font-bold text-xl">TA Management</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="#features">
              <Button variant="ghost">Features</Button>
            </Link>
            <Link href="#how-it-works">
              <Button variant="ghost">How it Works</Button>
            </Link>
            <ThemeToggle />
            <Link href="/login">
              <Button>Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main id="main-content" className="flex-1">
        {/* Hero Section */}
        <section className="container py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center space-y-8"
          >
            <div className="space-y-4 max-w-3xl">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                Simplify TA Management
                <span className="block text-primary mt-2">Empower Your Team</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground text-lg md:text-xl">
                A comprehensive platform to manage teaching assistants, track hours, streamline applications,
                and optimize scheduling for academic institutions.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/login">
                <Button size="lg" className="text-base">
                  Try Dashboard
                  <TrendingUp className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline" className="text-base">
                  Learn More
                </Button>
              </Link>
            </div>

            {/* Placeholder for screenshot */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-12 w-full max-w-5xl"
            >
              <div className="rounded-lg border bg-card shadow-2xl">
                <div className="aspect-video w-full rounded-t-lg bg-muted flex items-center justify-center">
                  <BarChart3 className="h-24 w-24 text-muted-foreground" />
                </div>
                <div className="p-4 border-t flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                  <div className="ml-4 text-sm text-muted-foreground">Dashboard Preview</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section id="features" className="container py-24 bg-muted/50">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Everything You Need
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground text-lg">
              Powerful features designed to streamline TA management and enhance productivity.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="container py-24">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              How It Works
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground text-lg">
              Get started in four simple steps
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="space-y-4">
                  <div className="text-6xl font-bold text-primary/20">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-border -z-10" />
                )}
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link href="/login">
              <Button size="lg">
                Get Started Now
                <CheckCircle className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="h-5 w-5" />
                <span className="font-semibold">TA Management</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Streamlining academic TA management for universities worldwide.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#features" className="hover:text-foreground">Features</Link></li>
                <li><Link href="#" className="hover:text-foreground">Pricing</Link></li>
                <li><Link href="#" className="hover:text-foreground">Demo</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground">Documentation</Link></li>
                <li><Link href="#" className="hover:text-foreground">API Reference</Link></li>
                <li><Link href="#" className="hover:text-foreground">Support</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="https://github.com/Imomazin/TA-Management-Solution" className="hover:text-foreground flex items-center gap-2">
                    <Github className="h-4 w-4" />
                    GitHub
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} TA Management System. Built with Next.js 15.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
