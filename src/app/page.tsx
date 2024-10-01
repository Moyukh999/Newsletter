"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Papa from "papaparse";
import { useRouter } from "next/navigation";
import { CopilotTextarea } from "@copilotkit/react-textarea";
import "@copilotkit/react-textarea/styles.css";

const NewsletterForm = () => {
  const [template, setTemplate] = useState<string | null>(null);
  const [subject, setSubject] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [csvData, setCsvData] = useState<any[]>([]);
  const [isSending, setIsSending] = useState<boolean>(false);
  const router = useRouter();

  const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (result) => {
          // The CSV file contains `Name` and `Email` columns
          setCsvData(result.data);
          console.log(result.data);
        },
      });
    }
  };

  const handleSubmit = async () => {
    setIsSending(true);
    const emailData = {
      template,
      subject,
      content,
      recipients: csvData,
    };

    try {
      const response = await fetch('/api/sendemail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      
      
    } catch (error) {
      console.error('Error:', error);
      alert('Error sending emails');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.h1
        className="text-5xl font-extrabold text-white mb-12"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        Newsletter Generator
      </motion.h1>

      <motion.div
        className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-700">Choose a Template</label>
          <motion.select
            className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition text-gray-800"
            value={template ?? ""}
            onChange={(e) => setTemplate(e.target.value)}
            whileFocus={{ scale: 1.05 }}
          >
            <option value="" disabled>
              Select Template
            </option>
            <option value="template1.html">Template 1</option>
            <option value="template2.html">Template 2</option>
          </motion.select>
        </div>

        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-700">Subject</label>
          <motion.input
            className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition text-gray-800"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            whileFocus={{ scale: 1.05 }}
          />
        </div>

        <div className="mb-6">
      <label className="block text-lg font-semibold text-gray-700">Content</label>
      <CopilotTextarea
        className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition text-gray-800"
        value={content}
        onValueChange={(value: string) => setContent(value)} // Update state when content changes
        placeholder="Enter the email body content here..."
        autosuggestionsConfig={{
          textareaPurpose: "the body of an email message", // Purpose of this textarea
          chatApiConfigs: {
            suggestionsApiConfig: {
              maxTokens: 20,  // Limit suggestions to 20 tokens
              stop: [".", "?", "!"], // Stop at common sentence enders
            },
          },
        }}
        
      />
    </div>

        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-700">Upload CSV (Name, Email)</label>
          <motion.input
            className="mt-2 w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600 transition"
            type="file"
            accept=".csv"
            onChange={handleCSVUpload}
            whileFocus={{ scale: 1.05 }}
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: "#6366f1" }}
          whileTap={{ scale: 0.95 }}
          className="bg-indigo-600 text-white py-3 px-6 rounded-lg shadow-md w-full font-semibold tracking-wide mt-6"
          onClick={handleSubmit}
        >
          Submit
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default NewsletterForm;
