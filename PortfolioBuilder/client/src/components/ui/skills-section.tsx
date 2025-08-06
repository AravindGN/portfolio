import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Server, Settings, Monitor, HardDrive, Download } from "lucide-react";

const skillCategories = [
  {
    title: "Frontend Development",
    icon: Code,
    color: "text-accent",
    bgColor: "bg-accent/20",
    skills: ["React", "Next.js", "HTML/CSS", "jQuery", "Bootstrap", "Tailwind CSS"]
  },
  {
    title: "Backend Development",
    icon: Server,
    color: "text-emerald-400",
    bgColor: "bg-emerald-400/20",
    skills: ["Java", "Spring Boot", "Python", "Kafka", "WebSocket"]
  },
  {
    title: "DevOps & Modern Tools",
    icon: Settings,
    color: "text-purple-400",
    bgColor: "bg-purple-400/20",
    skills: ["Docker", "Cloud Run", "AI/ML (Whisper)", "Git"]
  }
];

const hobbies = [
  {
    title: "Hardware Assembly",
    icon: Monitor,
    description: "Building and configuring computer systems"
  },
  {
    title: "OS Installation",
    icon: HardDrive,
    description: "Setting up and optimizing operating systems"
  },
  {
    title: "Software Installation",
    icon: Download,
    description: "Configuring development environments"
  }
];

export default function SkillsSection() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-4">Technical Skills</h2>
          <p className="text-muted-foreground text-lg">Technologies and tools I work with</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="glassmorphism border-border hover-lift h-full">
                  <CardContent className="p-8">
                    <div className={`${category.bgColor} p-3 rounded-lg w-fit mb-4`}>
                      <IconComponent className={`h-6 w-6 ${category.color}`} />
                    </div>
                    <h3 className="text-xl font-semibold mb-4">{category.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className={`${category.bgColor} ${category.color} border-none`}
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold text-center mb-8">Technical Hobbies & Interests</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {hobbies.map((hobby, index) => {
              const IconComponent = hobby.icon;
              return (
                <motion.div
                  key={hobby.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-secondary/50 border-border text-center hover-lift">
                    <CardContent className="p-6">
                      <IconComponent className="h-8 w-8 text-accent mx-auto mb-3" />
                      <h4 className="font-semibold mb-2">{hobby.title}</h4>
                      <p className="text-muted-foreground text-sm">{hobby.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
