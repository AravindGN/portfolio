import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-4">About Me</h2>
          <p className="text-muted-foreground text-lg">Get to know more about my background and expertise</p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative rounded-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="Modern tech office environment" 
                className="w-full h-auto rounded-xl shadow-2xl hover-lift"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent rounded-xl"></div>
            </div>
          </motion.div>
          
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold text-accent">Professional Journey</h3>
            <p className="text-muted-foreground leading-relaxed">
              I'm a passionate software developer with over 2 years of professional experience at Netphenix IT Solutions, 
              where I've worked on diverse projects ranging from CMDB systems to modern web applications using Next.js.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              My expertise spans both frontend and backend development, with hands-on experience in Java, Spring Boot, 
              React, Next.js, and modern DevOps tools like Docker and Google Cloud Run. I'm always eager to learn 
              and implement cutting-edge technologies like AI/ML models.
            </p>
            
            <Card className="glassmorphism border-border hover-lift">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <GraduationCap className="h-6 w-6 text-emerald-400 mr-3" />
                  <h4 className="text-xl font-semibold text-emerald-400">Education</h4>
                </div>
                <div className="space-y-3">
                  <div>
                    <h5 className="font-semibold">Master of Computer Applications (MCA)</h5>
                    <p className="text-muted-foreground">MS University, NMCC Marthandam | 76% (2016-2018)</p>
                  </div>
                  <div>
                    <h5 className="font-semibold">Bachelor of Science in Computer Science</h5>
                    <p className="text-muted-foreground">MS University, NMCC Marthandam | 68% (2013-2016)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
