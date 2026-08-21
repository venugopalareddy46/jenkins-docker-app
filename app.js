const express=require("express");
const path=require("path");
const nodemailer=require("nodemailer");
const app=express();
const PORT=process.env.PORT||3002;
const RECEIVER_EMAIL=process.env.RECEIVER_EMAIL||"venugopalareddy46@gmail.com";
app.use(express.json({limit:"100kb"})); app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
app.get("/health",(req,res)=>res.json({status:"UP",application:"Jenkins Node.js CI/CD App",timestamp:new Date().toISOString()}));
app.post("/api/contact",async(req,res)=>{
  const {name,email,subject,message}=req.body;
  if(!name||!email||!subject||!message)return res.status(400).json({message:"All fields are required."});
  if(!process.env.SMTP_HOST||!process.env.SMTP_USER||!process.env.SMTP_PASS)
    return res.status(503).json({message:"Email service is not configured. Add SMTP_HOST, SMTP_USER and SMTP_PASS."});
  try{
    const transporter=nodemailer.createTransport({
      host:process.env.SMTP_HOST,port:Number(process.env.SMTP_PORT||587),
      secure:String(process.env.SMTP_SECURE||"false")==="true",
      auth:{user:process.env.SMTP_USER,pass:process.env.SMTP_PASS}
    });
    await transporter.sendMail({
      from:`"Website Contact" <${process.env.SMTP_USER}>`,to:RECEIVER_EMAIL,replyTo:email,
      subject:`[Website] ${subject}`,
      text:`New message from Jenkins Node.js website\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`
    });
    res.json({message:"Your message was sent successfully."});
  }catch(error){console.error("Email error:",error.message);res.status(500).json({message:"Email could not be sent. Check SMTP configuration."});}
});
app.listen(PORT,"0.0.0.0",()=>console.log(`Jenkins Node.js CI/CD App running on port ${PORT}`));
