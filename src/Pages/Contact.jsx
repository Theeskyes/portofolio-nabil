import React, { useState, useEffect } from "react";
import { Share2, User, Mail, MessageSquare, Send } from "lucide-react";
import SocialLinks from "../components/SocialLinks";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => { AOS.init({ once: false }); }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    Swal.fire({ title: 'Mengirim Pesan...', html: 'Harap tunggu', allowOutsideClick: false, didOpen: () => { Swal.showLoading(); } });
    try {
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('email', formData.email);
      submitData.append('message', formData.message);
      submitData.append('_subject', 'Pesan Baru dari Website Portfolio');
      submitData.append('_captcha', 'false');
      submitData.append('_template', 'table');
      await axios.post('https://formsubmit.co/akhramnabil09@gmail.com', submitData, { headers: { 'Content-Type': 'multipart/form-data' } });
      Swal.fire({ title: 'Berhasil!', text: 'Pesan terkirim!', icon: 'success', confirmButtonColor: '#0ea5e9', timer: 2000, timerProgressBar: true });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      if (error.request && error.request.status === 0) {
        Swal.fire({ title: 'Berhasil!', text: 'Pesan terkirim!', icon: 'success', confirmButtonColor: '#0ea5e9', timer: 2000, timerProgressBar: true });
        setFormData({ name: "", email: "", message: "" });
      } else {
        Swal.fire({ title: 'Gagal!', text: 'Terjadi kesalahan.', icon: 'error', confirmButtonColor: '#0ea5e9' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

return (
  <div className="w-full bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 py-8 backdrop-blur-xl">
    <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2" data-aos="fade-down">
      <span className="inline-block w-8 h-1 bg-indigo-500 rounded-full"></span>
      Connect With Me
    </h3>

    <div className="flex flex-col gap-4">
      {/* Instagram - center, sama ukuran */}
      <div className="flex justify-center">
        <a href={primary.url} target="_blank" rel="noopener noreferrer"
          className="group relative flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-500 w-1/2"
          data-aos="fade-up" data-aos-delay="100">
          <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-r ${primary.gradient}`} />
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 opacity-20 rounded-lg transition-all duration-500 group-hover:scale-125 group-hover:opacity-30" style={{ backgroundColor: primary.color }} />
            <div className="relative p-2 rounded-lg">
              <primary.icon className="w-5 h-5 transition-all duration-500 group-hover:scale-110" style={{ color: primary.color }} />
            </div>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-bold text-gray-200 group-hover:text-white transition-colors duration-300">{primary.displayName}</span>
            <span className="text-xs text-gray-400 truncate group-hover:text-gray-300 transition-colors duration-300">{primary.subText}</span>
          </div>
          <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-white ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300" />
        </a>
      </div>

      {/* YouTube & TikTok */}
      <div className="grid grid-cols-2 gap-4">
        {others.map((link, index) => (
          <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer"
            className="group relative flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-500"
            data-aos="fade-up" data-aos-delay={200 + index * 100}>
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-r ${link.gradient}`} />
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 opacity-20 rounded-lg transition-all duration-500 group-hover:scale-125 group-hover:opacity-30" style={{ backgroundColor: link.color }} />
              <div className="relative p-2 rounded-lg">
                <link.icon className="w-5 h-5 transition-all duration-500 group-hover:scale-110" style={{ color: link.color }} />
              </div>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-bold text-gray-200 group-hover:text-white transition-colors duration-300">{link.displayName}</span>
              <span className="text-xs text-gray-400 truncate group-hover:text-gray-300 transition-colors duration-300">{link.subText}</span>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-white ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300" />
          </a>
        ))}
      </div>
    </div>
  </div>
  );
};

export default ContactPage;