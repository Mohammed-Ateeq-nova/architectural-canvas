import { useRef, MouseEvent } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export interface ProjectData {
    id: string;
    title: string;
    category: string;
    image: string;
    color: string;
}

export const ProjectCard = ({ project }: { project: ProjectData }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    // Mouse tracking springs
    const x = useSpring(0, { stiffness: 150, damping: 15, mass: 0.5 });
    const y = useSpring(0, { stiffness: 150, damping: 15, mass: 0.5 });

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();

        // Calculate cursor position relative to card center
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        // Magnetic pull max 8px shift
        x.set(distanceX * 0.05);
        y.set(distanceY * 0.05);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const handleNavigate = () => {
        navigate(`/projects/${project.id}`);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleNavigate}
            layoutId={`project-card-${project.id}`}
            style={{ x, y }}
            className="w-[320px] md:w-[480px] h-[500px] md:h-[600px] shrink-0 glass rounded-3xl overflow-hidden cursor-none group relative border border-white/5 bg-white/5"
        >
            {/* Thumbnail */}
            <div className="relative h-[60%] w-full overflow-hidden">
                <motion.img
                    layoutId={`project-img-${project.id}`}
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                {/* Gradient Overlay */}
                <div
                    className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-15"
                    style={{ background: `linear-gradient(to bottom, transparent, ${project.color})` }}
                />
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 flex flex-col justify-between h-[40%] bg-white/[0.02]">
                <div>
                    <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium block mb-2">
                        {project.category}
                    </span>

                    <div className="relative overflow-hidden inline-block">
                        <motion.h3
                            layoutId={`project-title-${project.id}`}
                            className="text-2xl md:text-3xl font-display font-medium text-starlight"
                        >
                            {project.title}
                        </motion.h3>

                        {/* Title Reveal Clip Path cover */}
                        <div
                            className="absolute inset-0 transition-transform duration-500 ease-out origin-left transform scale-x-100 group-hover:scale-x-0"
                            style={{ backgroundColor: project.color }}
                        />
                    </div>
                </div>

                {/* CTA Arrow */}
                <div className="flex justify-end mt-4 overflow-hidden">
                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center transition-all duration-500 group-hover:border-transparent group-hover:bg-white/10 group-hover:translate-x-0 -translate-x-full opacity-0 group-hover:opacity-100">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-starlight">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
