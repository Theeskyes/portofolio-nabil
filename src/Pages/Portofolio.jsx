import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardProject from "../components/CardProject";
import TechStackIcon from "../components/TechStackIcon";
import AOS from "aos";
import "aos/dist/aos.css";
import { Code, Award, Boxes, X, Download, Eye } from "lucide-react";

const projects = [
  {
    id: 1,
    Img: "https://img.youtube.com/vi/vgJq6qONv-4/hqdefault.jpg",
    Title: "Sejarah Penculikan di Rengasdengklok",
    Description: "Project sejarah tentang peristiwa penculikan di Rengasdengklok.",
    Link: "https://youtu.be/vgJq6qONv-4?si=0N6hB5yP1FBlekd0",
    Github: "Private",
    TechStack: [],
    Features: [],
  },
  {
    id: 2,
    Img: "https://img.youtube.com/vi/6hqtq05A9Ac/hqdefault.jpg",
    Title: "Matematika Peluang Kombinasi",
    Description: "Project matematika tentang peluang kombinasi.",
    Link: "https://youtu.be/6hqtq05A9Ac?si=LO4uJ331D9NZvGRp",
    Github: "Private",
    TechStack: [],
    Features: [],
  },
  {
    id: 3,
    Img: "https://img.youtube.com/vi/ZnRdT0wYIoI/hqdefault.jpg",
    Title: "Hak dan Kewajiban Sebagai Warga Sekolah",
    Description: "Project Pendidikan Pancasila tentang hak dan kewajiban sebagai warga sekolah.",
    Link: "https://youtu.be/ZnRdT0wYIoI?si=Qupzbke3JfE1mMVl",
    Github: "Private",
    TechStack: [],
    Features: [],
  },
  {
    id: 4,
    Img: "https://img.youtube.com/vi/f7uKq_xRda4/hqdefault.jpg",
    Title: "Last Result Sejarah Nyanyi",
    Description: "Project sejarah dengan format lagu.",
    Link: "https://youtu.be/f7uKq_xRda4?si=QW5yfcotohyyFrDr",
    Github: "Private",
    TechStack: [],
    Features: [],
  },
  {
    id: 5,
    Img: "https://img.youtube.com/vi/-lQmptVMiIQ/hqdefault.jpg",
    Title: "Drama BK Tentang Bullying",
    Description: "Tugas drama Bimbingan Konseling tentang isu bullying.",
    Link: "https://youtu.be/-lQmptVMiIQ?si=6iKmlLNdfK_qCWiS",
    Github: "Private",
    TechStack: [],
    Features: [],
  },
];

const certificates = [
  {
    id: 1,
    title: "Sertifikat Pelatihan Fundamental",
    subtitle: "Associate Computer Network Technician - DTA Komdigi, 4-8 April 2026",
    pages: [
      "https://tuwtizpvlztsrvspzjrp.supabase.co/storage/v1/object/public/certificate-images/Document%20from%20Esa%20Kenzie%20Galaksi%20Putra%20(1)-1.png",
      "https://tuwtizpvlztsrvspzjrp.supabase.co/storage/v1/object/public/certificate-images/Document%20from%20Esa%20Kenzie%20Galaksi%20Putra%20(1)-2.png",
    ],
  },
  {
    id: 2,
    title: "Sertifikat Pelatihan Intermediate",
    subtitle: "Associate Computer Network Technician - DTA Komdigi, 30 Maret - 18 April 2026",
    pages: [
      "https://tuwtizpvlztsrvspzjrp.supabase.co/storage/v1/object/public/certificate-images/Document%20from%20Esa%20Kenzie%20Galaksi%20Putra%20(2)-1.png",
      "https://tuwtizpvlztsrvspzjrp.supabase.co/storage/v1/object/public/certificate-images/Document%20from%20Esa%20Kenzie%20Galaksi%20Putra%20(2)-2.png",
    ],
  },
  {
    id: 3,
    title: "Certificate of Appreciation",
    subtitle: "Guest Lecture 2026: IoT & Digital Transformation - President University, 16 April 2026",
    pages: [
      "https://tuwtizpvlztsrvspzjrp.supabase.co/storage/v1/object/public/certificate-images/Document%20from%20Esa%20Kenzie%20Galaksi%20Putra-1.png",
    ],
  },
];

const techStacks = [
  { icon: "html.svg", language: "HTML" },
  { icon: "css.svg", language: "CSS" },
  { icon: "javascript.svg", language: "JavaScript" },
  { icon: "tailwind.svg", language: "Tailwind CSS" },
  { icon: "reactjs.svg", language: "ReactJS" },
  { icon: "vite.svg", language: "Vite" },
  { icon: "nodejs.svg", language: "Node JS" },
  { icon: "bootstrap.svg", language: "Bootstrap" },
  { icon: "firebase.svg", language: "Firebase" },
  { icon: "MUI.svg", language: "Material UI" },
  { icon: "vercel.svg", language: "Vercel" },
  { icon: "SweetAlert.svg", language: "SweetAlert2" },
];

const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="px-3 py-1.5 text-slate-300 hover:text-white text-sm font-medium transition-all duration-300 ease-in-out flex items-center gap-2 bg-white/5 hover:bg-white/10 rounded-md border border-white/10 hover:border-white/20 backdrop-blur-sm group relative overflow-hidden"
  >
    <span className="relative z-10 flex items-center gap-2">
      {isShowingMore ? "See Less" : "See More"}
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        className={`transition-transform duration-300 ${isShowingMore ? "group-hover:-translate-y-0.5" : "group-hover:translate-y-0.5"}`}>
        <polyline points={isShowingMore ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
      </svg>
    </span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500/50 transition-all duration-300 group-hover:w-full"></span>
  </button>
);

function TabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`full-width-tabpanel-${index}`} aria-labelledby={`full-width-tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ p: { xs: 1, sm: 3 } }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const CertificateCard = ({ certificate, onOpen }) => {
  return (
    <div
      className="group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-lg shadow-2xl cursor-pointer transition-all duration-300 hover:shadow-purple-500/20 hover:border-purple-500/40 hover:-translate-y-1"
      onClick={() => onOpen(certificate)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
      <div className="relative p-4 z-10">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={certificate.pages[0]}
            alt={certificate.title}
            className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="flex items-center gap-2 text-white font-medium text-sm bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/20">
              <Eye className="w-4 h-4" />
              Preview
            </div>
          </div>
        </div>
        <div className="mt-3 space-y-1">
          <h3 className="text-sm font-semibold bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight">
            {certificate.title}
          </h3>
          <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">{certificate.subtitle}</p>
          {certificate.pages.length > 1 && (
            <p className="text-purple-400 text-xs">{certificate.pages.length} halaman</p>
          )}
        </div>
      </div>
    </div>
  );
};

const CertificateModal = ({ certificate, onClose }) => {
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (!certificate) return;
    setCurrentPage(0);
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "unset"; };
  }, [certificate]);

  const handleDownload = (url, index) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = `${certificate.title}-halaman-${index + 1}.png`;
    link.target = "_blank";
    link.click();
  };

  if (!certificate) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.9)", backdropFilter: "blur(5px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-2xl bg-slate-900 border border-white/10 shadow-2xl flex flex-col"
        style={{ maxHeight: "90vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-white/10 flex-shrink-0">
          <div>
            <h3 className="text-white font-semibold text-base">{certificate.title}</h3>
            <p className="text-gray-400 text-xs mt-0.5">{certificate.subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all border border-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {certificate.pages.length > 1 && (
          <div className="flex gap-2 px-4 pt-3 flex-shrink-0">
            {certificate.pages.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all border ${
                  currentPage === i
                    ? "bg-purple-600 border-purple-500 text-white"
                    : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                Halaman {i + 1}
              </button>
            ))}
          </div>
        )}

        <div className="overflow-y-auto flex-1 p-4">
          <img
            src={certificate.pages[currentPage]}
            alt={`${certificate.title} halaman ${currentPage + 1}`}
            className="w-full rounded-xl border border-white/10"
          />
        </div>

        <div className="p-4 border-t border-white/10 flex gap-3 flex-wrap flex-shrink-0">
          {certificate.pages.length > 1 ? (
            certificate.pages.map((url, i) => (
              <button
                key={i}
                onClick={() => handleDownload(url, i)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600/40 hover:to-purple-600/40 text-blue-300 hover:text-white border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300 text-sm font-medium"
              >
                <Download className="w-4 h-4" />
                Download Halaman {i + 1}
              </button>
            ))
          ) : (
            <button
              onClick={() => handleDownload(certificate.pages[0], 0)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600/40 hover:to-purple-600/40 text-blue-300 hover:text-white border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300 text-sm font-medium"
            >
              <Download className="w-4 h-4" />
              Download Sertifikat
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const isMobile = window.innerWidth < 768;
  const initialItems = isMobile ? 4 : 6;

  useEffect(() => {
    AOS.init({ once: false });
    localStorage.setItem("projects", JSON.stringify(projects));
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleShowMore = useCallback((type) => {
    if (type === "projects") {
      setShowAllProjects((prev) => !prev);
    } else {
      setShowAllCertificates((prev) => !prev);
    }
  }, []);

  const displayedProjects = showAllProjects ? projects : projects.slice(0, initialItems);
  const displayedCertificates = showAllCertificates ? certificates : certificates.slice(0, initialItems);

  return (
    <div className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] bg-[#030014] overflow-hidden" id="Portofolio">
      <div className="text-center pb-10" data-aos="fade-up" data-aos-duration="1000">
        <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#0ea5e9] to-[#2563eb]">
          <span style={{
            color: "#0ea5e9",
            backgroundImage: "linear-gradient(45deg, #0ea5e9 10%, #2563eb 93%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            Portfolio Showcase
          </span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
          Explore my journey through projects, certifications, and technical expertise.
          Each section represents a milestone in my continuous learning path.
        </p>
      </div>

      <Box sx={{ width: "100%" }}>
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: "transparent",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "20px",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0, left: 0, right: 0, bottom: 0,
              background: "linear-gradient(180deg, rgba(139, 92, 246, 0.03) 0%, rgba(59, 130, 246, 0.03) 100%)",
              backdropFilter: "blur(10px)",
              zIndex: 0,
            },
          }}
          className="md:px-4"
        >
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            variant="fullWidth"
            sx={{
              minHeight: "70px",
              "& .MuiTab-root": {
                fontSize: { xs: "0.9rem", md: "1rem" },
                fontWeight: "600",
                color: "#94a3b8",
                textTransform: "none",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                padding: "20px 0",
                zIndex: 1,
                margin: "8px",
                borderRadius: "12px",
                "&:hover": {
                  color: "#ffffff",
                  backgroundColor: "rgba(139, 92, 246, 0.1)",
                  transform: "translateY(-2px)",
                },
                "&.Mui-selected": {
                  color: "#fff",
                  background: "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))",
                  boxShadow: "0 4px 15px -3px rgba(139, 92, 246, 0.2)",
                },
              },
              "& .MuiTabs-indicator": { height: 0 },
              "& .MuiTabs-flexContainer": { gap: "8px" },
            }}
          >
            <Tab icon={<Code className="mb-2 w-5 h-5 transition-all duration-300" />} label="Projects" {...a11yProps(0)} />
            <Tab icon={<Award className="mb-2 w-5 h-5 transition-all duration-300" />} label="Certificates" {...a11yProps(1)} />
            <Tab icon={<Boxes className="mb-2 w-5 h-5 transition-all duration-300" />} label="Tech Stack" {...a11yProps(2)} />
          </Tabs>
        </AppBar>

        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={setValue}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {displayedProjects.map((project, index) => (
                  <div
                    key={project.id}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                  >
                    <CardProject
                      Img={project.Img}
                      Title={project.Title}
                      Description={project.Description}
                      Link={project.Link}
                      id={project.id}
                    />
                  </div>
                ))}
              </div>
            </div>
            {projects.length > initialItems && (
              <div className="mt-6 w-full flex justify-start">
                <ToggleButton onClick={() => toggleShowMore("projects")} isShowingMore={showAllProjects} />
              </div>
            )}
          </TabPanel>

          <TabPanel value={value} index={1} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 md:gap-5 gap-4">
                {displayedCertificates.map((certificate, index) => (
                  <div
                    key={certificate.id}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                  >
                    <CertificateCard
                      certificate={certificate}
                      onOpen={setSelectedCertificate}
                    />
                  </div>
                ))}
              </div>
            </div>
            {certificates.length > initialItems && (
              <div className="mt-6 w-full flex justify-start">
                <ToggleButton onClick={() => toggleShowMore("certificates")} isShowingMore={showAllCertificates} />
              </div>
            )}
            <CertificateModal
              certificate={selectedCertificate}
              onClose={() => setSelectedCertificate(null)}
            />
          </TabPanel>

          <TabPanel value={value} index={2} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden pb-[5%]">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-8 gap-5">
                {techStacks.map((stack, index) => (
                  <div
                    key={index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                  >
                    <TechStackIcon TechStackIcon={stack.icon} Language={stack.language} />
                  </div>
                ))}
              </div>
            </div>
          </TabPanel>
        </SwipeableViews>
      </Box>
    </div>
  );
}