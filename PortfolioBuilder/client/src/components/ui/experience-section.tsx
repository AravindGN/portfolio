import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, GraduationCap } from "lucide-react";

const experiences = [
  {
    title: "Software Developer",
    company: "Netphenix IT Solutions",
    period: "June 2022 – Present",
    type: "Current",
    icon: Briefcase,
    color: "accent",
    responsibilities: [
      "Frontend development for the CMDB project using Bootstrap, HTML, CSS, jQuery",
      "Backend development for the CMDB project using Java and Spring Boot",
      "Collaborated on frontend-only Lokshaba and Nptel project using Next.js",
      "Gained expertise in modern tools like Docker, Cloud Run, and AI models like Whisper"
    ]
  },
  {
    title: "Data Entry & Manual Testing Intern",
    company: "L2 India",
    period: "January 2020 – April 2020",
    type: "Internship",
    icon: GraduationCap,
    color: "emerald-400",
    responsibilities: [
      "Conducted manual testing for the StudentCare app, identifying and reporting bugs",
      "Performed accurate and timely data entry tasks"
    ]
  }
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-4">Work Experience</h2>
          <p className="text-muted-foreground text-lg">My professional journey and key contributions</p>
        </motion.div>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-accent hidden lg:block"></div>
          
          <div className="space-y-12">
            {experiences.map((experience, index) => {
              const IconComponent = experience.icon;
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={experience.title}
                  initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`relative flex items-center ${
                    isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div className={`flex-1 ${isEven ? 'lg:pr-8' : 'lg:pl-8'}`}>
                    <Card className="glassmorphism border-border hover-lift">
                      <CardContent className="p-6">
                        <div className={`flex items-center mb-3 ${
                          isEven ? 'justify-start' : 'lg:justify-end'
                        }`}>
                          <Badge 
                            className={`${
                              experience.color === 'accent' 
                                ? 'bg-accent text-accent-foreground' 
                                : 'bg-emerald-400 text-white'
                            }`}
                          >
                            {experience.type}
                          </Badge>
                        </div>
                        
                        <h3 className={`text-xl font-bold mb-2 ${
                          experience.color === 'accent' ? 'text-accent' : 'text-emerald-400'
                        } ${isEven ? 'text-left' : 'lg:text-right'}`}>
                          {experience.title}
                        </h3>
                        
                        <h4 className={`text-lg font-semibold mb-2 ${
                          isEven ? 'text-left' : 'lg:text-right'
                        }`}>
                          {experience.company}
                        </h4>
                        
                        <p className={`text-muted-foreground mb-4 ${
                          isEven ? 'text-left' : 'lg:text-right'
                        }`}>
                          {experience.period}
                        </p>
                        
                        <ul className={`text-muted-foreground text-sm space-y-2 ${
                          isEven ? 'text-left' : 'lg:text-right'
                        }`}>
                          {experience.responsibilities.map((responsibility, idx) => (
                            <li key={idx} className="leading-relaxed">
                              • {responsibility}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-accent rounded-full border-4 border-background hidden lg:block z-10"></div>
                  
                  {/* Icon (visible on mobile) */}
                  <div className="lg:hidden mb-4">
                    <div className={`${
                      experience.color === 'accent' ? 'bg-accent/20' : 'bg-emerald-400/20'
                    } p-3 rounded-lg w-fit`}>
                      <IconComponent className={`h-6 w-6 ${
                        experience.color === 'accent' ? 'text-accent' : 'text-emerald-400'
                      }`} />
                    </div>
                  </div>
                  
                  <div className="flex-1 hidden lg:block"></div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
