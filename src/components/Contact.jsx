import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { styles } from "../style";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("access_key", "5241882e-4c7c-4350-a081-f3503b8632fa");
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("message", form.message);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setLoading(false);
        alert("Thank you. I'll get back to you as soon as possible");
        setForm({
          name: "",
          email: "",
          message: "",
        });
      } else {
        setLoading(false);
        console.error("Error:", data);
        alert(`Error: ${data.message || "Something went wrong. Please try again"}`);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
      alert("Ahh, something went wrong. Please try again");
    }
  };

  return (
    <div className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden px-4 sm:px-0`}>
             <motion.div
             variants={slideIn("left","tween",0.2,1)}
             className="flex-[0.75] bg-black-100 p-6 sm:p-8 rounded-2xl">
                <p className={styles.sectionSubText}>Get in touch</p>
                <h3 className={styles.sectionHeadText}>Contact</h3>
                  <form ref={formRef}
                  onSubmit={handleSubmit}
                  className="mt-8 sm:mt-12 flex flex-col gap-6 sm:gap-8" >

                    <label className="flex flex-col">
                      <span className="text-white font-medium mb-3 sm:mb-4 text-[14px] sm:text-[16px]">Your Name</span>
                      <input type="text" name="name" value={form.name}
                      onChange={handleChange} placeholder="What's your good name?" 
                      className="bg-tertiary py-3 sm:py-4 px-4 sm:px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium text-[14px] sm:text-[16px]"
                      required/>
                    </label>

                     <label className="flex flex-col">
                      <span className="text-white font-medium mb-3 sm:mb-4 text-[14px] sm:text-[16px]">Your email</span>
                      <input type="email" name="email" value={form.email}
                      onChange={handleChange} placeholder="What's your web address?" 
                      className="bg-tertiary py-3 sm:py-4 px-4 sm:px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium text-[14px] sm:text-[16px]"
                      required/>
                    </label>

                     <label className="flex flex-col">
                      <span className="text-white font-medium mb-3 sm:mb-4 text-[14px] sm:text-[16px]">Your Message</span>
                      <textarea 
                      name="message" rows={7}
                       id="" value={form.message}
                       onChange={handleChange} placeholder="what you want to say?"
                       className="bg-tertiary py-3 sm:py-4 px-4 sm:px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium text-[14px] sm:text-[16px]"
                       required></textarea>
                    </label>

                       <button type="submit"
                       className="bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary text-[14px] sm:text-[16px]">
                           {loading ? "Sending...": "Send"}
                       </button>

                  </form>
             </motion.div>


             <motion.div variants={slideIn("right","tween",0.2,1)}
             className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]">
              <EarthCanvas/>

             </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact,"contact");
