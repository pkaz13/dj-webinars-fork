<template>
  <footer class="bg-gray-800 dark:bg-gray-950">
    <div class="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
      <div class="xl:grid xl:grid-cols-3 xl:gap-8">
        <div class="space-y-8 xl:col-span-1">
          <AppLogo class="h-10 w-auto text-white" />
          <p class="text-base text-gray-300">
            Connecting Europe through reliable logistics solutions. From Poland to every corner of Europe.
          </p>
          <div class="flex space-x-6">
            <a href="#" class="text-gray-400 hover:text-gray-300">
              <span class="sr-only">Facebook</span>
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" />
              </svg>
            </a>
            <a href="#" class="text-gray-400 hover:text-gray-300">
              <span class="sr-only">LinkedIn</span>
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clip-rule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
        
        <div class="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
          <div class="md:grid md:grid-cols-2 md:gap-8">
            <div>
              <h3 class="text-base font-medium text-white">Services</h3>
              <ul role="list" class="mt-4 space-y-4">
                <li><a href="#" class="text-base text-gray-300 hover:text-white">Road Transportation</a></li>
                <li><a href="#" class="text-base text-gray-300 hover:text-white">Warehousing</a></li>
                <li><a href="#" class="text-base text-gray-300 hover:text-white">Customs Clearance</a></li>
                <li><a href="#" class="text-base text-gray-300 hover:text-white">Express Delivery</a></li>
              </ul>
            </div>
            <div class="mt-12 md:mt-0">
              <h3 class="text-base font-medium text-white">Company</h3>
              <ul role="list" class="mt-4 space-y-4">
                <li><a href="#" class="text-base text-gray-300 hover:text-white">About Us</a></li>
                <li><a href="#" class="text-base text-gray-300 hover:text-white">Careers</a></li>
                <li><a href="#" class="text-base text-gray-300 hover:text-white">News</a></li>
                <li><a href="#" class="text-base text-gray-300 hover:text-white">Contact</a></li>
              </ul>
            </div>
          </div>
          <div class="md:grid md:grid-cols-2 md:gap-8">
            <div>
              <h3 class="text-base font-medium text-white">Legal</h3>
              <ul role="list" class="mt-4 space-y-4">
                <li><a href="#" class="text-base text-gray-300 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" class="text-base text-gray-300 hover:text-white">Terms of Service</a></li>
                <li><a href="#" class="text-base text-gray-300 hover:text-white">Cookie Policy</a></li>
              </ul>
            </div>
            <div class="mt-12 md:mt-0">
              <h3 class="text-base font-medium text-white">Contact Info</h3>
              <ul role="list" class="mt-4 space-y-4">
                <li class="text-base text-gray-300">+48 123 456 789</li>
                <li class="text-base text-gray-300">contact@deliveroo.pl</li>
                <li class="text-base text-gray-300">Warsaw, Poland</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div class="mt-12 border-t border-gray-700 pt-8">
        <p class="text-base text-gray-400 text-center">
          &copy; {{ new Date().getFullYear() }} Deliveroo Logistics. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Explicit import for AppLogo
import AppLogo from '~/components/layout/AppLogo.vue'
</script>