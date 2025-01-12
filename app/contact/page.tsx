import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader } from "@/components/page-header";
import { Mail, Phone, MapPin } from 'lucide-react';

function ContactForm() {
  const [state, handleSubmit] = useForm("xbllqvaj");
  
  if (state.succeeded) {
    return <p className="text-green-600">Thank you! Your message has been sent.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <Input id="name" type="text" name="name" placeholder="Your name" />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <Input id="email" type="email" name="email" placeholder="your@email.com" />
        <ValidationError prefix="Email" field="email" errors={state.errors} />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
        <Textarea id="message" name="message" placeholder="Your message" className="min-h-[150px]" />
        <ValidationError prefix="Message" field="message" errors={state.errors} />
      </div>
      <Button type="submit" disabled={state.submitting} className="w-full">
        Send Message
      </Button>
    </form>
  );
}

export default function ContactPage() {
  return (
    <>
      <PageHeader 
        title="Contact Us" 
        description="Get in touch with our team for support, feedback, or inquiries."
      />
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
              <ContactForm />
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="w-6 h-6 mr-4 text-red-600" />
                  <span>support@ytsummarizer.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-6 h-6 mr-4 text-red-600" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-6 h-6 mr-4 text-red-600" />
                  <span>123 AI Street, Tech City, TC 12345</span>
                </div>
              </div>
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Office Hours</h3>
                <p className="text-gray-600">Monday - Friday: 9am - 5pm EST</p>
                <p className="text-gray-600">Saturday - Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
