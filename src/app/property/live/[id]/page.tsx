/**
 * Live Property Details Page
 * Displays full property information from Zyla API
 */

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  Bed,
  Bath,
  Square,
  MapPin,
  Heart,
  Share2,
  Phone,
  Mail,
  CheckCircle,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Calendar,
  Building2,
  Home as HomeIcon,
} from 'lucide-react';
import { usePropertyDetails, formatPrice, formatArea } from '@/hooks/useProperties';

export default function LivePropertyDetailsPage({ params }: { params: { id: string } }) {
  const { data: property, isLoading, error } = usePropertyDetails(params.id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const nextImage = () => {
    if (property && property.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
    }
  };

  const prevImage = () => {
    if (property && property.images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-8">
            <div className="h-96 bg-cyber-blue/10 rounded-2xl" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <div className="h-8 bg-cyber-blue/10 rounded w-3/4" />
                <div className="h-4 bg-cyber-blue/10 rounded w-1/2" />
                <div className="h-32 bg-cyber-blue/10 rounded" />
              </div>
              <div className="space-y-4">
                <div className="h-64 bg-cyber-blue/10 rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen py-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">Property Not Found</h2>
          <p className="text-secondary mb-6">The property you're looking for doesn't exist or has been removed.</p>
          <Link href="/properties" className="btn-primary">
            Back to Properties
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/properties"
          className="inline-flex items-center gap-2 text-secondary hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Properties</span>
        </Link>

        {/* Image Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden mb-8 glass"
        >
          {property.images.length > 0 ? (
            <>
              <Image
                src={property.images[currentImageIndex]}
                alt={property.title}
                fill
                className="object-cover"
                priority
              />

              {/* Gallery Controls */}
              <div className="absolute inset-0 flex items-center justify-between p-4">
                <button
                  onClick={prevImage}
                  className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={nextImage}
                  className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </div>

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full bg-black/70 backdrop-blur-sm text-white text-sm">
                {currentImageIndex + 1} / {property.images.length}
              </div>

              {/* Expand Button */}
              <button
                onClick={() => setShowGallery(true)}
                className="absolute top-4 right-4 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                <Maximize2 className="w-6 h-6 text-white" />
              </button>

              {/* Verified Badge */}
              {property.isVerified && (
                <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-green-500/90 backdrop-blur-sm text-white text-sm font-medium flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Verified Property
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-cyber-blue/20 to-cyber-purple/20 flex items-center justify-center">
              <HomeIcon className="w-32 h-32 text-cyber-blue/50" />
            </div>
          )}
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Property Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title and Price */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">{property.title}</h1>
                  <div className="flex items-center text-secondary mb-4">
                    <MapPin className="w-5 h-5 mr-2 text-cyber-blue" />
                    <span>{property.location.fullLocation}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="w-12 h-12 rounded-full glass-hover flex items-center justify-center"
                  >
                    <Heart className={`w-6 h-6 ${isFavorite ? 'fill-current text-red-500' : 'text-secondary'}`} />
                  </button>
                  <button className="w-12 h-12 rounded-full glass-hover flex items-center justify-center">
                    <Share2 className="w-6 h-6 text-secondary" />
                  </button>
                </div>
              </div>

              <div className="flex items-baseline gap-4 mb-6">
                <p className="text-4xl font-bold text-accent">
                  {formatPrice(property.price, property.currency, property.rentFrequency)}
                </p>
                <span className="px-3 py-1 rounded-full bg-cyber-blue/20 text-cyber-blue text-sm font-medium">
                  {property.listingType === 'for-sale' ? 'For Sale' : 'For Rent'}
                </span>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="card-cyber p-4 text-center">
                  <Bed className="w-8 h-8 text-cyber-blue mx-auto mb-2" />
                  <p className="text-2xl font-bold text-primary">{property.bedrooms}</p>
                  <p className="text-sm text-secondary">Bedrooms</p>
                </div>
                <div className="card-cyber p-4 text-center">
                  <Bath className="w-8 h-8 text-cyber-blue mx-auto mb-2" />
                  <p className="text-2xl font-bold text-primary">{property.bathrooms}</p>
                  <p className="text-sm text-secondary">Bathrooms</p>
                </div>
                <div className="card-cyber p-4 text-center">
                  <Square className="w-8 h-8 text-cyber-blue mx-auto mb-2" />
                  <p className="text-2xl font-bold text-primary">{formatArea(property.area, property.areaUnit)}</p>
                  <p className="text-sm text-secondary">Area</p>
                </div>
                <div className="card-cyber p-4 text-center">
                  <Building2 className="w-8 h-8 text-cyber-blue mx-auto mb-2" />
                  <p className="text-2xl font-bold text-primary">{property.propertyType}</p>
                  <p className="text-sm text-secondary">Type</p>
                </div>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="card-cyber p-6"
            >
              <h2 className="text-2xl font-bold text-primary mb-4">Description</h2>
              <p className="text-secondary leading-relaxed whitespace-pre-line">{property.description}</p>
            </motion.div>

            {/* Amenities */}
            {property.amenities.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="card-cyber p-6"
              >
                <h2 className="text-2xl font-bold text-primary mb-4">Amenities & Features</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {property.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-cyber-blue flex-shrink-0" />
                      <span className="text-secondary text-sm">
                        {typeof amenity === 'string' ? amenity : amenity.text}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Property Details */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="card-cyber p-6"
            >
              <h2 className="text-2xl font-bold text-primary mb-4">Property Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-tertiary text-sm mb-1">Reference Number</p>
                  <p className="text-primary font-semibold">{property.referenceNumber}</p>
                </div>
                <div>
                  <p className="text-tertiary text-sm mb-1">Permit Number</p>
                  <p className="text-primary font-semibold">{property.permitNumber || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-tertiary text-sm mb-1">Furnishing</p>
                  <p className="text-primary font-semibold capitalize">{property.furnished}</p>
                </div>
                <div>
                  <p className="text-tertiary text-sm mb-1">Completion Status</p>
                  <p className="text-primary font-semibold capitalize">{property.completionStatus}</p>
                </div>
                <div>
                  <p className="text-tertiary text-sm mb-1">Listed On</p>
                  <p className="text-primary font-semibold">
                    {new Date(property.datePosted).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-tertiary text-sm mb-1">Last Updated</p>
                  <p className="text-primary font-semibold">
                    {new Date(property.dateUpdated).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Contact & Agency */}
          <div className="space-y-6">
            {/* View in 3D Button */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Link href={`/tours/${property.externalID}`} className="btn-primary w-full text-center block">
                🏠 View in 3D
              </Link>
            </motion.div>

            {/* Agency Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="card-cyber p-6"
            >
              <h3 className="text-xl font-bold text-primary mb-4">Listed By</h3>
              
              {/* Agency */}
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-cyber-blue/20">
                {property.agency.logo && (
                  <div className="relative w-16 h-16 rounded-full overflow-hidden bg-white/10">
                    <Image src={property.agency.logo} alt={property.agency.name} fill className="object-contain p-2" />
                  </div>
                )}
                <div>
                  <p className="font-bold text-primary">{property.agency.name}</p>
                  <p className="text-sm text-tertiary">Agency</p>
                </div>
              </div>

              {/* Agent */}
              <div className="flex items-center gap-4 mb-6">
                {property.agent.logo && (
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white/10">
                    <Image src={property.agent.logo} alt={property.agent.name} fill className="object-contain p-1" />
                  </div>
                )}
                <div>
                  <p className="font-semibold text-primary">{property.agent.name}</p>
                  <p className="text-sm text-tertiary">Agent</p>
                </div>
              </div>

              {/* Contact Buttons */}
              <div className="space-y-3">
                <button className="w-full btn-cyber flex items-center justify-center gap-2">
                  <Phone className="w-5 h-5" />
                  <span>Call Agent</span>
                </button>
                <button className="w-full btn-cyber flex items-center justify-center gap-2">
                  <Mail className="w-5 h-5" />
                  <span>Email Agent</span>
                </button>
              </div>
            </motion.div>

            {/* Similar Properties */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="card-cyber p-6"
            >
              <h3 className="text-xl font-bold text-primary mb-4">Similar Properties</h3>
              <Link
                href={`/properties?location=${property.location.city}&category=${property.category[0]}`}
                className="btn-cyber w-full text-center block"
              >
                View Similar
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Full Screen Gallery Modal */}
      <AnimatePresence>
        {showGallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setShowGallery(false)}
          >
            <button
              onClick={() => setShowGallery(false)}
              className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors z-10"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <div className="relative w-full max-w-6xl h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
              {property.images.length > 0 && (
                <>
                  <Image
                    src={property.images[currentImageIndex]}
                    alt={property.title}
                    fill
                    className="object-contain"
                  />

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                    className="absolute left-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    className="absolute right-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <ChevronRight className="w-6 h-6 text-white" />
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
