import { notFound } from 'next/navigation'
import Image from 'next/image'

import { prisma } from '@/lib/prisma'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default async function AgentProfilePage({
  params,
}: {
  params: { slug: string }
}) {
  const agent = await prisma.agentProfile.findUnique({
    where: { slug: params.slug },
    include: { user: true },
  })

  if (!agent || agent.status !== 'APPROVED') {
    notFound()
  }

  return (
    <main className="relative min-h-screen">
      <Navbar />

      <div className="pt-28 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card-cyber max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="w-28 h-28 rounded-2xl overflow-hidden border border-white/10 bg-black/30">
                <Image
                  src={agent.profilePhotoUrl}
                  alt={agent.user.name ?? 'Agent profile photo'}
                  width={112}
                  height={112}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  {agent.user.name ?? `${agent.firstName} ${agent.lastName}`}
                </h1>
                <p className="text-gray-300 mt-2">{agent.companyName}</p>

                <div className="mt-6 space-y-2 text-gray-300">
                  <div>
                    <span className="text-gray-400">Email:</span> {agent.user.email}
                  </div>
                  <div>
                    <span className="text-gray-400">Phone:</span> {agent.phoneNumber}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
