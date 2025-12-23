import Image from 'next/image'
import Link from 'next/link'
import { leadership, coreTeam, values } from '@/data/team'
import { Sparkles, Shield, Users, Heart, Linkedin, Github, Home } from 'lucide-react'

const iconMap = {
  Sparkles,
  Shield,
  Users,
  Heart,
}

export const metadata = {
  title: 'Meet the Minds Behind VirtuXYZ',
  description: 'Our leaders, builders, and operators shaping the future of AI-powered real estate.',
}

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0B0E14] via-[#0D1117] to-[#050816] text-white">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pt-24 pb-16 sm:pb-20">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_10%_0%,rgba(63,255,167,0.12),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(255,159,71,0.14),transparent_45%)] opacity-80" />
        <div className="max-w-6xl mx-auto relative space-y-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-white/70">
            <Link href="/" className="hover:text-white flex items-center gap-1">
              <Home className="w-4 h-4" />
              Home
            </Link>
            <span aria-hidden="true">›</span>
            <span aria-current="page" className="text-white">
              Team
            </span>
          </nav>

          <div className="space-y-4">
            <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-cyan-200">
              Our People
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              Meet the Minds Behind VirtuXYZ
            </h1>
            <p className="text-base sm:text-lg text-white/80 max-w-3xl">
              A distributed team of designers, engineers, and strategists working together to
              build trusted, AI-guided real estate experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="px-6 pb-16">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 border border-white/15">
              <Sparkles className="w-5 h-5 text-cyan-200" />
            </span>
            <div>
              <h2 className="text-2xl font-semibold">Leadership</h2>
              <p className="text-sm text-white/70">
                Guiding the product, technology, and partnerships that power VirtuXYZ.
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {leadership.map((person) => (
              <article
                key={person.name}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5/10 bg-gradient-to-b from-white/10/5 to-white/5/0 p-5 backdrop-blur-xl shadow-[0_22px_65px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center gap-4">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border border-white/20 bg-white/10 sm:h-24 sm:w-24">
                    <Image
                      src={person.photo}
                      alt={person.name}
                      fill
                      sizes="(min-width: 640px) 96px, 80px"
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{person.name}</h3>
                    <p className="text-sm text-cyan-200">{person.role}</p>
                    {person.impact && (
                      <p className="mt-1 text-xs text-white/65">{person.impact}</p>
                    )}
                  </div>
                </div>

                <div className="mt-4 flex gap-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  {person.linkedin && (
                    <Link
                      href={person.linkedin}
                      aria-label={`${person.name} on LinkedIn`}
                      className="inline-flex items-center justify-center rounded-full bg-white/10 p-2 hover:bg-white/20"
                    >
                      <Linkedin className="w-4 h-4" />
                    </Link>
                  )}
                  {person.github && (
                    <Link
                      href={person.github}
                      aria-label={`${person.name} on GitHub`}
                      className="inline-flex items-center justify-center rounded-full bg-white/10 p-2 hover:bg-white/20"
                    >
                      <Github className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Core Team */}
      <section className="px-6 pb-16">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 border border-white/15">
              <Users className="w-5 h-5 text-cyan-200" />
            </span>
            <div>
              <h2 className="text-2xl font-semibold">Core Team</h2>
              <p className="text-sm text-white/70">
                The builders, operators, and storytellers moving VirtuXYZ forward every day.
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 2xl:grid-cols-3">
            {coreTeam.map((person) => (
              <article
                key={person.name}
                className="group rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-lg shadow-[0_18px_50px_rgba(0,0,0,0.4)] transition-transform duration-300 hover:scale-[1.03] hover:border-cyan-200/60 sm:rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-white/15 bg-white/10 sm:h-20 sm:w-20 sm:rounded-xl">
                    <Image
                      src={person.photo}
                      alt={person.name}
                      fill
                      sizes="(min-width: 640px) 80px, 64px"
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold">{person.name}</h3>
                    <p className="text-sm text-cyan-200">{person.role}</p>
                    {person.dept && (
                      <span className="mt-1 inline-flex rounded-full border border-white/15 bg-white/10 px-2 py-0.5 text-[11px] text-white/85">
                        {person.dept}
                      </span>
                    )}
                    {person.impact && (
                      <p className="mt-2 text-xs text-white/70 leading-relaxed">{person.impact}</p>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Values strip */}
      <section className="px-6 pb-16">
        <div className="max-w-6xl mx-auto rounded-2xl border border-white/10 bg-white/5 px-6 py-8 backdrop-blur-lg">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => {
              const Icon =
                iconMap[value.icon as keyof typeof iconMap] ?? Sparkles
              return (
                <div key={value.title} className="flex items-start gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 border border-white/15">
                    <Icon className="w-5 h-5 text-cyan-200" />
                  </span>
                  <div>
                    <h3 className="font-semibold">{value.title}</h3>
                    <p className="text-sm text-white/75">{value.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="px-6 pb-20">
        <div className="max-w-4xl mx-auto text-center space-y-4 rounded-2xl border border-white/10 bg-white/5 px-8 py-10 backdrop-blur-lg shadow-[0_24px_70px_rgba(0,0,0,0.5)]">
          <h3 className="text-2xl font-semibold">Want to build with us?</h3>
          <p className="text-sm sm:text-base text-white/75 max-w-2xl mx-auto">
            Join a team that is redefining how people discover, evaluate, and experience
            property using AI.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link href="/careers" className="btn-cyber px-8 py-3 text-sm font-semibold">
              Join Our Team
            </Link>
            <Link
              href="/contact"
              className="text-sm text-cyan-200 hover:text-white transition-colors"
            >
              Talk to us
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}


