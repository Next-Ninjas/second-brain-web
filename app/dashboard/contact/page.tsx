"use client";

import React, { useState, useEffect, useRef, JSX } from "react";
import { Loader2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

interface FormData {
    email: string;
    message: string;
    
    category: string;
}

interface Turnstile {
    render: (
        container: HTMLElement | null,
        options: {
            sitekey: string;
            callback: (token: string) => void;
            "error-callback": () => void;
        }
    ) => void;
    reset: () => void;
}


declare global {
    interface Window {
        turnstile?: Turnstile;
    }
}

const ContactPage: React.FC = () => {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [formData, setFormData] = useState<FormData>({
        email: "",
        message: "",
        
        category: "general",
    });
 
    const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
    const turnstileRef = useRef<HTMLDivElement>(null);

    // Load Cloudflare Turnstile script and render widget
   useEffect(() => {
  const script = document.createElement("script");
  script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
  script.async = true;
  script.defer = true;
  document.body.appendChild(script);

  script.onload = () => {
    if (window.turnstile && turnstileRef.current) {
      window.turnstile.render(turnstileRef.current, {
        sitekey: process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY || "",
        callback: (token: string) => {
          setTurnstileToken(token);
        },
        "error-callback": () => {
          toast.error("Turnstile verification failed. Please try again.");
        },
      });
    }
  };

  return () => {
    document.body.removeChild(script);

    // ✅ Only reset if widget is still mounted
    if (window.turnstile && turnstileRef.current?.firstChild) {
      window.turnstile.reset();
    }
  };
}, []);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!turnstileToken) {
            toast.error("Please complete the human verification.");
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
                    "cf-turnstile-response": turnstileToken,
                }),
            });

            if (response.ok) {
                setFormData({ email: "", message: "", category: "general" });
                setTurnstileToken(null);
                if (window.turnstile) window.turnstile.reset();
                toast.success("Message sent successfully!");
            } else {
                throw new Error(`Failed to submit form: ${response.status}`);
            }
        } catch (error: unknown) {
            console.error("Form submission error:", error);
            toast.error("Failed to send message. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    

    const handleCategorySelect = (category: string) => {
        setFormData((prev) => ({ ...prev, category }));
    };

    
    return (
        <div className="max-w-xl mx-auto px-6 py-12 relative  dark:text-gray-100">
            <Toaster />
            <h1 className="text-4xl font-bold mb-2 font-peachi text-left">Contact Us</h1>
            <p className="dark:text-neutral-300 text-left mb-2">
                 We’d love to hear from you. Whether it’s feedback, support, or a feature request — reach out and our team will respond promptly.
            </p>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label htmlFor="email" className="block dark:text-white">
                        Your email address <span className="text-gray-400">(required)</span>
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="you@example.com"
                        className="w-full p-4 rounded  dark:bg-neutral-800 border border-gray-300 dark:border-neutral-600  dark:text-white focus:outline-none focus:border-[#38A662]"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="message" className="block  dark:text-white">
                        Your message <span className="text-gray-400">(required)</span>
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full p-4 rounded dark:bg-neutral-800 border border-gray-300 dark:border-neutral-600 text-gray-800 dark:text-white focus:outline-none focus:border-[#38A662]"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   

                    <div className="space-y-2">
                        <label className="block dark:text-white">Category</label>
                        <div className="flex space-x-2">
                            <button
                                type="button"
                                className={`p-3 rounded  dark:bg-neutral-800 border ${formData.category === "general"
                                    ? "border-[#38A662]"
                                    : "border-gray-300 dark:border-neutral-600"
                                    }  dark:text-white px-4`}
                                onClick={() => handleCategorySelect("general")}
                            >
                                general
                            </button>
                            <button
                                type="button"
                                className={`p-3 rounded dark:bg-neutral-800 border ${formData.category === "help"
                                    ? "border-[#38A662]"
                                    : "border-gray-300 dark:border-neutral-600"
                                    }  dark:text-white px-4`}
                                onClick={() => handleCategorySelect("help")}
                            >
                                help
                            </button>
                        </div>
                    </div>
                </div>

                {/* <div className="space-y-2">
                    <label className="block text-gray-700 dark:text-white">Verification</label>
                    <div ref={turnstileRef} className="cf-turnstile"></div>
                </div> */}

                <button
                    type="submit"
                    disabled={isSubmitting || !turnstileToken}
                    className="cursor-pointer transition-all bg-[#38A662] text-white px-6 py-2 rounded-[4px] border-[#2D8A4D] w-full border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px] "
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-5 h-5 mr-2 inline animate-spin" />
                            Sending...
                        </>
                    ) : (
                        "Send message"
                    )}
                </button>
            </form>

            {/* <p className="mt-4 text-gray-700 dark:text-white">
                You can also contact me at{" "}
                <a href="https://github.com/orgs/Next-Ninjas/repositories" className="text-[#38A662]">
                   github
                </a>
            </p> */}
<p className="mt-4 text-gray-700 dark:text-white">
                You can also reach out to the NeuroNote team at{" "}
                <a
                    href="https://github.com/orgs/Next-Ninjas/repositories"
                    className="text-[#38A662]"
                >
                    github
                </a>
            </p>

            <footer className="mt-8 text-sm text-muted-foreground text-center text-gray-500 dark:text-gray-400">
                Made with ❤️ by the NeuroNote Team
            </footer>
           
        </div>
    );
};

export default ContactPage;