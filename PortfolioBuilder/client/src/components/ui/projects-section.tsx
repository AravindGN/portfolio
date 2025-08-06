import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Github } from "lucide-react";

const projects = [
  {
    title: "CMDB Project",
    description: "Led comprehensive full-stack development of a Configuration Management Database system. Implemented responsive frontend using Bootstrap, HTML, CSS, and jQuery, while building robust backend architecture with Java and Spring Boot for scalability and efficiency.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    technologies: ["Java", "Spring Boot", "Bootstrap", "jQuery"],
    accentColor: "accent"
  },
  {
    title: "Lokshaba & Nptel Project",
    description: "Designed and developed dynamic frontend features using modern technologies including Next.js and Tailwind CSS to enhance user experience. Focused on creating responsive, performant web applications with emphasis on user interface design and interaction patterns.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    technologies: ["Next.js", "Tailwind CSS", "React", "JavaScript"],
    accentColor: "emerald-400"
  }
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-muted-foreground text-lg">Showcase of my recent work and contributions</p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="glassmorphism border-border hover-lift h-full">
                <CardContent className="p-0">
                  <div className="relative mb-6 overflow-hidden rounded-t-lg">
                    <img 
                      src={project.image} 
                      alt={`${project.title} preview`}
                      className="w-full h-48 object-cover transition-transform hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent"></div>
                  </div>
                  
                  <div className="p-8 pt-0">
                    <h3 className={`text-2xl font-bold mb-4 ${
                      project.accentColor === 'accent' ? 'text-accent' : 'text-emerald-400'
                    }`}>
                      {project.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className={`${
                            project.accentColor === 'accent' 
                              ? 'bg-accent/20 text-accent' 
                              : 'bg-emerald-400/20 text-emerald-400'
                          } border-none`}
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex space-x-4">
                      <Button 
                        className={`${
                          project.accentColor === 'accent'
                            ? 'bg-accent hover:bg-accent/90'
                            : 'bg-emerald-400 hover:bg-emerald-500'
                        } text-white font-medium transition-colors`}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                      <Button 
                        variant="outline"
                        className={`border-${project.accentColor} text-${project.accentColor} hover:bg-${project.accentColor} hover:text-white transition-all`}
                      >
                        <Github className="mr-2 h-4 w-4" />
                        GitHub
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
