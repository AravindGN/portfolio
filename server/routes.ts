import type { Express } from "express";
import { createServer, type Server } from "http";
import path from "path";
import fs from "fs";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      
      if (!name || !email || !subject || !message) {
        return res.status(400).json({ 
          message: "All fields are required" 
        });
      }

      // In a real application, you would:
      // 1. Save to database
      // 2. Send email notification
      // 3. Integrate with email service (SendGrid, etc.)
      
      console.log("Contact form submission:", {
        name,
        email,
        subject,
        message,
        timestamp: new Date().toISOString()
      });

      res.json({ 
        message: "Message sent successfully",
        success: true 
      });
    } catch (error) {
      console.error("Contact form error:", error);
      res.status(500).json({ 
        message: "Internal server error" 
      });
    }
  });

  // Resume download endpoint
  app.get("/api/download-resume", async (req, res) => {
    try {
      const resumePath = path.join(process.cwd(), "attached_assets", "Aravind Resume_1754481054212.pdf");
      
      if (!fs.existsSync(resumePath)) {
        return res.status(404).json({ 
          message: "Resume file not found" 
        });
      }

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="Aravind_GN_Resume.pdf"');
      
      const fileStream = fs.createReadStream(resumePath);
      fileStream.pipe(res);
    } catch (error) {
      console.error("Resume download error:", error);
      res.status(500).json({ 
        message: "Error downloading resume" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
