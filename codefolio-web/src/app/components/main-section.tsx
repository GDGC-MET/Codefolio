import React from 'react';
import HeroSection from "@/app/components/hero-section";
import AboutSection from "@/app/components/about-section";
import ProjectSection from "@/app/components/project-section";
import SkillsSection from "@/app/components/skills-section";

const MainSection = () => {
    return (
        <>
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ProjectSection />
        </>
    );
};

export default MainSection;