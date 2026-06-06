import { Send, Mail, MapPin, Linkedin, Github } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { useState, type FormEvent } from 'react';
import { useData } from '../context/DataContext';

export default function Contact() {
  const { ref, isInView } = useInView(0.1);
  const { data, addInquiry } = useData();
  const contact = data.contact;
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formName = formData.get('name') as string;
    const formEmail = formData.get('email') as string;
    const formSubject = formData.get('subject') as string;
    const formMessage = formData.get('message') as string;

    addInquiry(formName, formEmail, formSubject, formMessage);
    setSubmitted(true);
  };


  return (
    <section id="contact" ref={ref} className="section-padding">
      <div className="section-container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span
            className={`inline-block px-4 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4 opacity-0 ${
              isInView ? 'animate-fade-in-up' : ''
            }`}
          >
            Get In Touch
          </span>
          <h2
            className={`heading-lg text-dark opacity-0 ${
              isInView ? 'animate-fade-in-up stagger-1' : ''
            }`}
          >
            Let's Work Together
          </h2>
          <p
            className={`mt-4 text-dark/60 text-lg opacity-0 ${
              isInView ? 'animate-fade-in-up stagger-2' : ''
            }`}
          >
            Have a project in mind? I'd love to hear about it. Send me a
            message and I'll get back to you within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div
            className={`lg:col-span-2 space-y-6 opacity-0 ${
              isInView ? 'animate-slide-in-left stagger-2' : ''
            }`}
          >
            <div className="card p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Mail size={20} className="text-accent" />
                </div>
                <div>
                  <div className="text-sm text-dark/50">Email</div>
                  <a href={`mailto:${contact.email}`} className="font-medium text-dark hover:text-accent transition-colors">
                    {contact.email}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <MapPin size={20} className="text-accent" />
                </div>
                <div>
                  <div className="text-sm text-dark/50">Location</div>
                  <div className="font-medium text-dark">
                    {contact.location}
                  </div>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="text-sm text-dark/50 mb-3">Find me on</div>
              <div className="flex gap-3">
                <a
                  href={contact.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-[#0A66C2]/8 text-[#0A66C2] hover:bg-[#0A66C2]/15 transition-colors text-sm font-medium"
                >
                  <Linkedin size={18} /> LinkedIn
                </a>
                <a
                  href={contact.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-dark/5 text-dark hover:bg-dark/10 transition-colors text-sm font-medium"
                >
                  <Github size={18} /> GitHub
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className={`lg:col-span-3 opacity-0 ${
              isInView ? 'animate-slide-in-right stagger-2' : ''
            }`}
          >
            <div className="card p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-olive/10 flex items-center justify-center mx-auto mb-4">
                    <Send size={28} className="text-olive" />
                  </div>
                  <h3 className="heading-md text-dark mb-2">Message Sent!</h3>
                  <p className="text-dark/60">
                    Thank you for reaching out. I'll get back to you soon.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 btn-secondary text-sm"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-dark/70 mb-1.5"
                      >
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-dark/10 bg-cream/50 text-dark placeholder:text-dark/30 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-dark/70 mb-1.5"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-dark/10 bg-cream/50 text-dark placeholder:text-dark/30 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-dark/70 mb-1.5"
                    >
                      Subject
                    </label>
                    <input
                      id="subject"
                      type="text"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-dark/10 bg-cream/50 text-dark placeholder:text-dark/30 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
                      placeholder="Project inquiry"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-dark/70 mb-1.5"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border border-dark/10 bg-cream/50 text-dark placeholder:text-dark/30 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>
                  <button type="submit" className="btn-primary w-full">
                    Send Message <Send size={16} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
