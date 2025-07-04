<template>
  <div>
    <!-- Hero Section -->
    <section class="relative overflow-hidden">
      <!-- Background Image -->
      <div class="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/906494/pexels-photo-906494.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
          alt="Modern European logistics trucks on highway"
          class="w-full h-full object-cover"
        />
        <!-- Green overlay with gradient -->
        <div class="absolute inset-0 bg-gradient-to-br from-success-800/85 via-success-700/80 to-success-900/90"></div>
        <!-- Additional subtle pattern overlay for texture -->
        <div class="absolute inset-0 bg-black/10"></div>
      </div>
      
      <div class="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl font-bold tracking-tight text-white sm:text-6xl drop-shadow-lg">
            <span class="block">Seamless Logistics</span>
            <span class="block text-accent-300">Across Europe</span>
          </h1>
          <p class="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-100 drop-shadow-md">
            Connecting East and West with reliable road transportation and secure warehousing. 
            From Poland to every corner of Europe, we deliver excellence.
          </p>
          <div class="mt-10 flex items-center justify-center gap-x-6">
            <NuxtLink
              to="/quote"
              class="rounded-md bg-accent-600 px-6 py-3 text-base font-semibold text-white shadow-lg hover:bg-accent-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-600 transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
            >
              Get Quote
            </NuxtLink>
            <a
              href="#services"
              class="text-base font-semibold leading-6 text-white hover:text-accent-300 transition-colors drop-shadow-md"
            >
              Learn more <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
      
      <!-- Floating elements with enhanced styling -->
      <div class="absolute top-1/4 left-10 animate-bounce">
        <div class="glass-effect rounded-lg p-4 shadow-lg">
          <TruckIcon class="h-8 w-8 text-white drop-shadow-sm" />
        </div>
      </div>
      <div class="absolute bottom-1/4 right-10 animate-bounce" style="animation-delay: 1s;">
        <div class="glass-effect rounded-lg p-4 shadow-lg">
          <BuildingStorefrontIcon class="h-8 w-8 text-white drop-shadow-sm" />
        </div>
      </div>
    </section>

    <!-- Services Overview -->
    <section id="services" class="py-24 bg-gray-50 dark:bg-gray-800">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Our Services
          </h2>
          <p class="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Comprehensive logistics solutions tailored to your business needs
          </p>
        </div>
        
        <div class="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="service in services"
            :key="service.name"
            class="group relative card p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <div class="flex items-center justify-center w-16 h-16 bg-success-100 dark:bg-success-900 rounded-lg mb-6 group-hover:bg-success-200 dark:group-hover:bg-success-800 transition-colors">
              <component :is="getIconComponent(service.icon)" class="w-8 h-8 text-success-600 dark:text-success-400" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {{ service.name }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300 mb-6">
              {{ service.description }}
            </p>
            <ul class="space-y-2">
              <li
                v-for="feature in service.features"
                :key="feature"
                class="flex items-center text-sm text-gray-500 dark:text-gray-400"
              >
                <CheckIcon class="w-4 h-4 text-success-500 mr-2 flex-shrink-0" />
                {{ feature }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Us -->
    <section id="about" class="py-24 bg-white dark:bg-gray-900">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Why Choose Deliveroo
          </h2>
          <p class="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Years of experience connecting Eastern and Western Europe
          </p>
        </div>
        
        <div class="mt-20 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div class="space-y-8">
            <div
              v-for="feature in features"
              :key="feature.name"
              class="flex items-start space-x-4"
            >
              <div class="flex-shrink-0">
                <div class="flex items-center justify-center w-12 h-12 bg-success-100 dark:bg-success-900 rounded-lg">
                  <component :is="getIconComponent(feature.icon)" class="w-6 h-6 text-success-600 dark:text-success-400" />
                </div>
              </div>
              <div>
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                  {{ feature.name }}
                </h3>
                <p class="mt-2 text-gray-600 dark:text-gray-300">
                  {{ feature.description }}
                </p>
              </div>
            </div>
          </div>
          
          <div class="relative">
            <img
              src="https://images.pexels.com/photos/906494/pexels-photo-906494.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Modern logistics facility"
              class="rounded-lg shadow-xl"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="relative py-24 overflow-hidden">
      <!-- Background Image -->
      <div class="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
          alt="Professional logistics team and operations"
          class="w-full h-full object-cover"
        />
        <!-- White overlay with gradient -->
        <div class="absolute inset-0 bg-gradient-to-br from-white/90 via-white/85 to-white/95"></div>
        <!-- Additional subtle overlay for better text readability -->
        <div class="absolute inset-0 bg-gray-50/30"></div>
      </div>
      
      <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl drop-shadow-sm">
            Ready to Streamline Your Logistics?
          </h2>
          <p class="mt-4 text-lg text-gray-700 drop-shadow-sm">
            Get started with a free quote today and experience the difference
          </p>
          <div class="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink
              to="/quote"
              class="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-success-600 hover:bg-success-700 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5 duration-200"
            >
              Request Quote
            </NuxtLink>
            <NuxtLink
              to="/login"
              class="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-md hover:shadow-lg"
            >
              Sign In
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Success Stories -->
    <section id="success-stories" class="py-24 bg-white dark:bg-gray-900">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Success Stories
          </h2>
          <p class="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Real results from businesses that trust us with their logistics
          </p>
        </div>
        
        <div class="mt-20 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div
            v-for="story in successStories"
            :key="story.id"
            class="card p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <div class="flex items-center mb-6">
              <img
                :src="story.logo"
                :alt="story.company"
                class="h-12 w-12 rounded-lg object-cover mr-4"
              />
              <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                  {{ story.company }}
                </h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  {{ story.industry }}
                </p>
              </div>
            </div>
            
            <blockquote class="text-gray-600 dark:text-gray-300 mb-6 italic">
              "{{ story.testimonial }}"
            </blockquote>
            
            <div class="grid grid-cols-2 gap-4 mb-6">
              <div class="text-center">
                <div class="text-2xl font-bold text-success-600 dark:text-success-400">
                  {{ story.metrics.improvement }}
                </div>
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  Cost Reduction
                </div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-success-600 dark:text-success-400">
                  {{ story.metrics.delivery }}
                </div>
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  On-Time Delivery
                </div>
              </div>
            </div>
            
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <img
                  :src="story.contact.avatar"
                  :alt="story.contact.name"
                  class="h-8 w-8 rounded-full mr-3"
                />
                <div>
                  <div class="text-sm font-medium text-gray-900 dark:text-white">
                    {{ story.contact.name }}
                  </div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">
                    {{ story.contact.position }}
                  </div>
                </div>
              </div>
              <NuxtLink
                :to="story.caseStudyLink"
                class="text-success-600 hover:text-success-500 dark:text-success-400 text-sm font-medium"
              >
                Read Case Study →
              </NuxtLink>
            </div>
          </div>
        </div>
        
        <div class="mt-12 text-center">
          <NuxtLink
            to="/case-studies"
            class="inline-flex items-center px-6 py-3 border border-success-600 text-base font-medium rounded-md text-success-600 bg-white hover:bg-success-50 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
          >
            View All Case Studies
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Statistics -->
    <section class="relative py-24 overflow-hidden" ref="statsSection">
      <!-- Background Image -->
      <div class="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/1427107/pexels-photo-1427107.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
          alt="European logistics trucks and transportation network"
          class="w-full h-full object-cover"
        />
        <!-- Dark overlay with gradient for better text contrast -->
        <div class="absolute inset-0 bg-gradient-to-br from-success-900/90 via-success-800/85 to-success-950/95"></div>
        <!-- Additional overlay for enhanced readability -->
        <div class="absolute inset-0 bg-black/20"></div>
      </div>
      
      <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-3xl font-bold text-white mb-12 drop-shadow-lg">
            Trusted by Businesses Across Europe
          </h2>
        </div>
        
        <div class="grid grid-cols-2 gap-8 lg:grid-cols-4">
          <div
            v-for="stat in stats"
            :key="stat.name"
            class="text-center"
          >
            <div class="text-4xl font-bold text-accent-400 mb-2 drop-shadow-lg">
              {{ animatedStats[stat.name] || '0' }}{{ stat.suffix || '' }}
            </div>
            <div class="text-lg text-gray-300 drop-shadow-md">
              {{ stat.name }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="py-24 bg-gray-50 dark:bg-gray-800">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Contact Us for More Information
          </h2>
          <p class="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Ready to optimize your logistics? Get in touch with our experts today
          </p>
        </div>
        
        <div class="mt-20 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <!-- Contact Information -->
          <div class="space-y-8">
            <div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Get in Touch
              </h3>
              <div class="space-y-6">
                <div class="flex items-start">
                  <div class="flex-shrink-0">
                    <PhoneIcon class="w-6 h-6 text-success-600 dark:text-success-400 mt-1" />
                  </div>
                  <div class="ml-4">
                    <h4 class="text-lg font-medium text-gray-900 dark:text-white">
                      Phone
                    </h4>
                    <p class="text-gray-600 dark:text-gray-300">
                      +48 123 456 789
                    </p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                      Monday - Friday, 8:00 AM - 6:00 PM CET
                    </p>
                  </div>
                </div>
                
                <div class="flex items-start">
                  <div class="flex-shrink-0">
                    <EnvelopeIcon class="w-6 h-6 text-success-600 dark:text-success-400 mt-1" />
                  </div>
                  <div class="ml-4">
                    <h4 class="text-lg font-medium text-gray-900 dark:text-white">
                      Email
                    </h4>
                    <p class="text-gray-600 dark:text-gray-300">
                      contact@deliveroo.pl
                    </p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                      We respond within 2 hours during business hours
                    </p>
                  </div>
                </div>
                
                <div class="flex items-start">
                  <div class="flex-shrink-0">
                    <MapPinIcon class="w-6 h-6 text-success-600 dark:text-success-400 mt-1" />
                  </div>
                  <div class="ml-4">
                    <h4 class="text-lg font-medium text-gray-900 dark:text-white">
                      Headquarters
                    </h4>
                    <p class="text-gray-600 dark:text-gray-300">
                      ul. Logistyczna 123<br>
                      00-001 Warsaw, Poland
                    </p>
                  </div>
                </div>
                
                <div class="flex items-start">
                  <div class="flex-shrink-0">
                    <ClockIcon class="w-6 h-6 text-success-600 dark:text-success-400 mt-1" />
                  </div>
                  <div class="ml-4">
                    <h4 class="text-lg font-medium text-gray-900 dark:text-white">
                      24/7 Emergency Support
                    </h4>
                    <p class="text-gray-600 dark:text-gray-300">
                      +48 987 654 321
                    </p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                      For urgent shipment issues
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Quick Actions -->
            <div class="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-sm">
              <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h4>
              <div class="space-y-3">
                <NuxtLink
                  to="/quote"
                  class="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                >
                  <span class="text-gray-900 dark:text-white">Request a Quote</span>
                  <ArrowRightIcon class="w-5 h-5 text-gray-400" />
                </NuxtLink>
                <NuxtLink
                  to="/login"
                  class="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                >
                  <span class="text-gray-900 dark:text-white">Access Customer Portal</span>
                  <ArrowRightIcon class="w-5 h-5 text-gray-400" />
                </NuxtLink>
                <a
                  href="tel:+48123456789"
                  class="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                >
                  <span class="text-gray-900 dark:text-white">Call Now</span>
                  <PhoneIcon class="w-5 h-5 text-gray-400" />
                </a>
              </div>
            </div>
          </div>
          
          <!-- Contact Form -->
          <div class="card p-8">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Send us a Message
            </h3>
            
            <form @submit.prevent="handleContactSubmit" class="space-y-6">
              <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    First Name *
                  </label>
                  <input
                    v-model="contactForm.firstName"
                    type="text"
                    required
                    class="input"
                    placeholder="Enter your first name"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Last Name *
                  </label>
                  <input
                    v-model="contactForm.lastName"
                    type="text"
                    required
                    class="input"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email Address *
                </label>
                <input
                  v-model="contactForm.email"
                  type="email"
                  required
                  class="input"
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Company Name
                </label>
                <input
                  v-model="contactForm.company"
                  type="text"
                  class="input"
                  placeholder="Enter your company name"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Subject *
                </label>
                <select
                  v-model="contactForm.subject"
                  required
                  class="input"
                >
                  <option value="">Select a subject</option>
                  <option value="quote">Request a Quote</option>
                  <option value="partnership">Partnership Opportunities</option>
                  <option value="support">Customer Support</option>
                  <option value="general">General Inquiry</option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Message *
                </label>
                <textarea
                  v-model="contactForm.message"
                  rows="4"
                  required
                  class="input"
                  placeholder="Tell us about your logistics needs..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                :disabled="contactLoading"
                class="w-full btn-primary"
              >
                <span v-if="!contactLoading">Send Message</span>
                <span v-else class="flex items-center justify-center">
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  TruckIcon,
  BuildingStorefrontIcon,
  CheckIcon,
  GlobeEuropeAfricaIcon,
  ClockIcon,
  ShieldCheckIcon,
  CpuChipIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ArrowRightIcon
} from '@heroicons/vue/24/outline'

const contactLoading = ref(false)
const statsSection = ref(null)
const animatedStats = ref({})
const hasAnimated = ref(false)

const contactForm = reactive({
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  subject: '',
  message: ''
})

// Inlined mock data
const services = [
  {
    name: 'Road Transportation',
    description: 'Europe-wide freight delivery with real-time tracking and guaranteed delivery times.',
    icon: 'TruckIcon',
    features: [
      'Full & partial loads',
      'Express delivery',
      'Temperature controlled',
      'Hazardous materials'
    ]
  },
  {
    name: 'Warehousing Solutions',
    description: 'Secure storage facilities with advanced inventory management systems.',
    icon: 'BuildingStorefrontIcon',
    features: [
      'Climate controlled',
      'Inventory management',
      'Pick & pack services',
      'Cross-docking'
    ]
  },
  {
    name: 'Customs Clearance',
    description: 'Simplified cross-border procedures and documentation handling.',
    icon: 'ShieldCheckIcon',
    features: [
      'EU compliance',
      'Documentation support',
      'Fast processing',
      'Expert guidance'
    ]
  },
  {
    name: 'Technology Platform',
    description: 'Advanced tracking and management systems for complete visibility.',
    icon: 'CpuChipIcon',
    features: [
      'Real-time tracking',
      'Digital documentation',
      'API integration',
      'Mobile access'
    ]
  }
]

const features = [
  {
    name: 'European Coverage',
    description: 'Extensive network covering all major European routes with dedicated hubs in key locations.',
    icon: 'GlobeEuropeAfricaIcon'
  },
  {
    name: 'Reliability & Speed',
    description: '99%+ on-time delivery rate with express options for urgent shipments.',
    icon: 'ClockIcon'
  },
  {
    name: 'Advanced Technology',
    description: 'State-of-the-art tracking systems and digital platforms for complete transparency.',
    icon: 'CpuChipIcon'
  },
  {
    name: 'Trusted Partner',
    description: 'Years of experience with industry-leading safety standards and compliance.',
    icon: 'ShieldCheckIcon'
  }
]

const successStories = [
  {
    id: 1,
    company: 'TechCorp Manufacturing',
    industry: 'Electronics Manufacturing',
    logo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    testimonial: 'Deliveroo transformed our supply chain efficiency. Their real-time tracking and reliable delivery schedules helped us reduce inventory costs by 30% while improving customer satisfaction.',
    metrics: {
      improvement: '30%',
      delivery: '99.2%'
    },
    contact: {
      name: 'Anna Kowalski',
      position: 'Supply Chain Director',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    caseStudyLink: '/case-studies/techcorp'
  },
  {
    id: 2,
    company: 'AutoParts Europe',
    industry: 'Automotive Parts',
    logo: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    testimonial: 'The cross-border logistics expertise of Deliveroo enabled us to expand into 5 new European markets. Their customs clearance service is exceptional.',
    metrics: {
      improvement: '25%',
      delivery: '98.8%'
    },
    contact: {
      name: 'Marcus Weber',
      position: 'Logistics Manager',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    caseStudyLink: '/case-studies/autoparts'
  },
  {
    id: 3,
    company: 'FreshFood Distribution',
    industry: 'Food & Beverage',
    logo: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    testimonial: 'Temperature-controlled transportation and warehousing solutions from Deliveroo helped us maintain product quality while expanding our distribution network across Central Europe.',
    metrics: {
      improvement: '40%',
      delivery: '99.5%'
    },
    contact: {
      name: 'Sofia Novak',
      position: 'Operations Director',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    caseStudyLink: '/case-studies/freshfood'
  }
]

const stats = [
  { name: 'Countries Served', value: 25, suffix: '+' },
  { name: 'Deliveries Completed', value: 100000, suffix: '+' },
  { name: 'Satisfied Customers', value: 1000, suffix: '+' },
  { name: 'Warehouse Capacity', value: 50000, suffix: ' m²' }
]

// Helper function to get icon component from string name
const getIconComponent = (iconName: string) => {
  const iconMap = {
    'TruckIcon': TruckIcon,
    'BuildingStorefrontIcon': BuildingStorefrontIcon,
    'ShieldCheckIcon': ShieldCheckIcon,
    'CpuChipIcon': CpuChipIcon,
    'GlobeEuropeAfricaIcon': GlobeEuropeAfricaIcon,
    'ClockIcon': ClockIcon
  }
  return iconMap[iconName as keyof typeof iconMap] || TruckIcon
}

// Animation function for counting numbers
const animateNumber = (target: number, key: string, duration: number = 2000) => {
  const start = 0
  const increment = target / (duration / 16) // 60fps
  let current = start
  
  const timer = setInterval(() => {
    current += increment
    if (current >= target) {
      current = target
      clearInterval(timer)
    }
    
    // Format the number based on its size
    if (target >= 1000) {
      animatedStats.value[key] = Math.floor(current).toLocaleString()
    } else {
      animatedStats.value[key] = Math.floor(current).toString()
    }
  }, 16)
}

// Intersection Observer to trigger animation when stats section is visible
const observeStatsSection = () => {
  if (!process.client || !statsSection.value) return
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated.value) {
          hasAnimated.value = true
          
          // Start animations for each stat with slight delays
          stats.forEach((stat, index) => {
            setTimeout(() => {
              animateNumber(stat.value, stat.name, 2000)
            }, index * 200)
          })
        }
      })
    },
    {
      threshold: 0.5 // Trigger when 50% of the section is visible
    }
  )
  
  observer.observe(statsSection.value)
}

const handleContactSubmit = async () => {
  contactLoading.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Reset form
    Object.keys(contactForm).forEach(key => {
      contactForm[key] = ''
    })
    
    // Show success message (you could add a toast notification here)
    alert('Thank you for your message! We will get back to you within 2 business hours.')
  } catch (error) {
    console.error('Contact form submission failed:', error)
    alert('There was an error sending your message. Please try again or contact us directly.')
  } finally {
    contactLoading.value = false
  }
}

onMounted(() => {
  // Initialize stats with 0
  stats.forEach(stat => {
    animatedStats.value[stat.name] = '0'
  })
  
  // Set up intersection observer
  nextTick(() => {
    observeStatsSection()
  })
})

definePageMeta({
  layout: 'default'
})
</script>