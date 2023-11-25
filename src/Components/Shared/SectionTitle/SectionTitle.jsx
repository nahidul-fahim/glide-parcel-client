import { useInView } from "framer-motion";
import { useRef } from "react";


const SectionTitle = ({ firstPart, secondPart }) => {


    const animate = useRef(null);
    const isInView = useInView(animate);

    const bg = "https://i.ibb.co/dQvP6K8/sectionbg.png";

    return (
        <div className="text-center relative flex justify-center items-center w-full container">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-third z-10"
                ref={animate}
                style={{
                    transform: isInView ? "none" : "translateY(-50px)",
                    opacity: isInView ? "1" : "0",
                    transition: "all .7s"
                }}
            >{firstPart} <br /> <span className="text-main">{secondPart}</span></h2>
            <img src={bg} alt="" className="absolute top-[-30px] right-0 md:right-[70px] lg:right-[220px] w-[200px] md:w-[250px] lg:w-[350px]"
                ref={animate}
                style={{
                    transform: isInView ? "none" : "translateX(-200px)",
                    opacity: isInView ? "1" : "0",
                    transition: "all 1.5s"
                }}
            />
        </div>
    );
};

export default SectionTitle;