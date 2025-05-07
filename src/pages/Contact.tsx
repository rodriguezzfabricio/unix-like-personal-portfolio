import React, { useState } from 'react'
import { motion } from 'framer-motion'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitResult(null)
    
    try {
      // Here you would normally send the data to your backend/API
      // For demonstration, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Simulate a successful response
      setSubmitResult({
        success: true,
        message: 'Message sent successfully! I will get back to you soon.'
      })
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        message: ''
      })
    } catch (error) {
      setSubmitResult({
        success: false,
        message: 'Failed to send message. Please try again later.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      className="max-w-4xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-terminal-green mb-4">Contact</h2>
        <p className="text-gray-400">
          Get in touch with me. Fill out the form below or use one of the contact methods.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          className="bg-terminal-darkGray p-6 rounded-lg border border-terminal-gray"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <h3 className="text-xl font-semibold text-terminal-green mb-4">Contact Form</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-300 mb-2">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-terminal-black border border-terminal-gray text-white p-2 rounded-md focus:border-terminal-green focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-terminal-black border border-terminal-gray text-white p-2 rounded-md focus:border-terminal-green focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-300 mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full bg-terminal-black border border-terminal-gray text-white p-2 rounded-md focus:border-terminal-green focus:outline-none resize-none"
              ></textarea>
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2 rounded-md ${
                isSubmitting 
                  ? 'bg-terminal-darkGray text-gray-500 cursor-not-allowed' 
                  : 'bg-terminal-green text-terminal-black hover:bg-opacity-90'
              } transition-colors duration-200`}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
            
            {submitResult && (
              <div className={`mt-4 p-3 rounded-md ${
                submitResult.success 
                  ? 'bg-green-900/30 text-green-300 border border-green-800' 
                  : 'bg-red-900/30 text-red-300 border border-red-800'
              }`}>
                {submitResult.message}
              </div>
            )}
          </form>
        </motion.div>
        
        <motion.div
          className="bg-terminal-darkGray p-6 rounded-lg border border-terminal-gray"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold text-terminal-green mb-4">Other Ways to Reach Me</h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-white mb-2">Email</h4>
              <a href="mailto:contact@fabricio-portfolio.com" className="text-terminal-green hover:underline">
                contact@fabricio-portfolio.com
              </a>
            </div>
            
            <div>
              <h4 className="text-white mb-2">LinkedIn</h4>
              <a href="https://linkedin.com/in/fabricio" target="_blank" rel="noopener noreferrer" className="text-terminal-green hover:underline">
                linkedin.com/in/fabricio
              </a>
            </div>
            
            <div>
              <h4 className="text-white mb-2">GitHub</h4>
              <a href="https://github.com/fabricio" target="_blank" rel="noopener noreferrer" className="text-terminal-green hover:underline">
                github.com/fabricio
              </a>
            </div>
            
            <div>
              <h4 className="text-white mb-2">Location</h4>
              <p className="text-gray-300">San Francisco, CA</p>
            </div>
            
            <div className="pt-4 border-t border-terminal-gray">
              <p className="text-gray-400">
                Prefer the command line? Try typing <span className="text-terminal-green">contact</span> in 
                the terminal below to access contact information.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Contact 