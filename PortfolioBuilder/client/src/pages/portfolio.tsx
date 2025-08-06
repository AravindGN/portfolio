import { useEffect } from "react";
import Navigation from "@/components/ui/navigation";
import HeroSection from "@/components/ui/hero-section";
import AboutSection from "@/components/ui/about-section";
import SkillsSection from "@/components/ui/skills-section";
import ProjectsSection from "@/components/ui/projects-section";
import ExperienceSection from "@/components/ui/experience-section";
import ContactSection from "@/components/ui/contact-section";

export default function Portfolio() {
  useEffect(() => {
    document.title = "Aravind G.N - Software Developer Portfolio";
    
    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Professional portfolio of Aravind G.N, a Software Developer with 2+ years of experience in full-stack development, specializing in Java, Spring Boot, React, Next.js, and modern cloud technologies.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Professional portfolio of Aravind G.N, a Software Developer with 2+ years of experience in full-stack development, specializing in Java, Spring Boot, React, Next.js, and modern cloud technologies.';
      document.head.appendChild(meta);
    }

    // Add Open Graph tags
    const ogTags = [
      { property: 'og:title', content: 'Aravind G.N - Software Developer Portfolio' },
      { property: 'og:description', content: 'Professional portfolio showcasing 2+ years of software development experience in modern technologies.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630' }
    ];

    ogTags.forEach(tag => {
      const existingTag = document.querySelector(`meta[property="${tag.property}"]`);
      if (existingTag) {
        existingTag.setAttribute('content', tag.content);
      } else {
        const meta = document.createElement('meta');
        meta.setAttribute('property', tag.property);
        meta.setAttribute('content', tag.content);
        document.head.appendChild(meta);
      }
    });
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
      
      {/* Footer */}
      <footer className="py-8 bg-background border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-muted-foreground">
              © 2024 Aravind G.N. All rights reserved. Built with passion for clean code and modern technology.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
